/**
 * Main controller for Ghost frontend
 */

/*global require, module */

var moment      = require('moment'),
    rss         = require('../data/xml/rss'),
    _           = require('lodash'),
    Promise     = require('bluebird'),
    api         = require('../api'),
    dataProvider = require('../models'),
    config      = require('../config'),
    filters     = require('../filters'),
    template    = require('../helpers/template'),
    errors      = require('../errors'),
    passport    = require('passport'),
    routeMatch  = require('path-match')(),
    middleware = require("../middleware/middleware"),
    mail            = require('../api/mail'),

    frontendControllers,
    staticPostPermalink;

// Cache static post permalink regex
staticPostPermalink = routeMatch('/:slug/:edit?');

function getPostPage(options) {
    // Get the list of all posts the current user likes (if there is one)
    if(options.currentUser) {
        return options.currentUser.getUser().then(function(user){
            if(!user) {
                return next({});
            }

            // Load everything they like
            return dataProvider.UserPostLike.fetchAll({user_id: user.id}).then(function(likes){
                var likes_by_post_id = {};
                for(var i = 0 ; i < likes.models.length ; i++) {
                    likes_by_post_id[likes.models[i].attributes.post_id] = true;
                }
                return next(likes_by_post_id);
            });
        });

    } else {
        return next({});
    }

    function next(user_likes) {
        return api.settings.read('postsPerPage').then(function (response) {
            var postPP = response.settings[0],
                postsPerPage = parseInt(postPP.value, 10);

            // No negative posts per page, must be number
            if (!isNaN(postsPerPage) && postsPerPage > 0) {
                options.limit = postsPerPage;
            }
            options.include = 'author,tags,fields';
            return api.posts.browse(options).then(function(results){
                return dataProvider.Tag.findAll().then(function(data){
                    var tags = {};
                    for(var i in data.models) {
                        tags[data.models[i].get("name")] = (data.models[i]);
                    }

                    results.allTags = tags;
                    
                    // if the user likes posts, loop over the posts quickly and flag the ones he likes
                    for(var i = 0 ; i < results.posts.length ; i++) {
                        if(user_likes[results.posts[i].id]) {
                            results.posts[i].current_user_likes = true;
                        } else {
                            results.posts[i].current_user_likes = false;
                        }
                    }

                    return results;
                });
            }).then(function(results){
                return results;
            });
        });
    }
}

/**
 * formats variables for handlebars in multi-post contexts.
 * If extraValues are available, they are merged in the final value
 * @return {Object} containing page variables
 */
function formatPageResponse(posts, page, extraValues) {
    extraValues = extraValues || {};
    var resp = {
        posts: posts,
        allTags:page.allTags,
        pagination: page.meta.pagination,
        featuredPost: page.meta.featured
    };
    return _.extend(resp, extraValues);
}

/**
 * similar to formatPageResponse, but for single post pages
 * @return {Object} containing page variables
 */
function formatResponse(post, extraValues) {
    extraValues = extraValues || {};
    return _.extend({post: post}, extraValues);
}

function handleError(next) {
    return function (err) {
        return next(err);
    };
}

function setResponseContext(req, res, data) {
    var contexts = [],
        pageParam = req.params.page !== undefined ? parseInt(req.params.page, 10) : 1,
        tagPattern = new RegExp('^\\/' + config.routeKeywords.tag + '\\/'),
        authorPattern = new RegExp('^\\/' + config.routeKeywords.author + '\\/');

    // paged context
    if (!isNaN(pageParam) && pageParam > 1) {
        contexts.push('paged');
    }

    if (req.route.path === '/' + config.routeKeywords.page + '/:page/') {
        contexts.push('index');
    } else if (req.route.path === '/') {
        contexts.push('home');
        contexts.push('index');
    } else if (req.route.path.indexOf('/latest') === 0) {
        contexts.push('latest');
        contexts.push('index');
    } else if (req.route.path.indexOf('/popular') === 0) {
        contexts.push('popular');
        contexts.push('index');
    } else if (/\/rss\/(:page\/)?$/.test(req.route.path)) {
        contexts.push('rss');
    } else if (tagPattern.test(req.route.path)) {
        contexts.push('tag');
    } else if (authorPattern.test(req.route.path)) {
        contexts.push('author');
    } else if (data && data.post && data.post.page) {
        contexts.push('page');
    } else {
        contexts.push('post');
    }

    res.locals.context = contexts;
}

// Add Request context parameter to the data object
// to be passed down to the templates
function setReqCtx(req, data) {
    (Array.isArray(data) ? data : [data]).forEach(function (d) {
        d.secure = req.secure;
    });
}

/**
 * Returns the paths object of the active theme via way of a promise.
 * @return {Promise} The promise resolves with the value of the paths.
 */
function getActiveThemePaths() {
    return api.settings.read({
        key: 'activeTheme',
        context: {
            internal: true
        }
    }).then(function (response) {
        var activeTheme = response.settings[0],
            paths = config.paths.availableThemes[activeTheme.value];

        return paths;
    });
}


/**
 * Send an email
 **/
function sendEmail(sendTo, subject, message) {
    var payload = {
        mail: [{
            message: {
                to: sendTo,
                subject: subject,
                html: message.replace(/(?:\r\n|\r|\n)/g, '<br />'),
                text: message
            },
            options: {}
        }]
    };

    return mail.send(payload, {context: {internal: true}});
}

frontendControllers = {

    // like a post, make sure the current user hasnt already liked it...
    like_post: function(req, res, next){
        if(req.user) {
            // get the actual user (users table instance)
            req.user.getUser().then(function(user){
                // Try to load a user post like for this and see if there is one
                dataProvider.UserPostLike.forge({user_id: user.id, post_id: req.params.post_id}).fetch().then(function(like){
                    if(like) {
                        return res.json({"error": "You have already liked this post."});
                    }

                    // Look up the psot now and make sure it exists
                    return dataProvider.Post.forge({id: req.params.post_id}).fetch({withRelated: ["tags"]}).then(function(post){
                        if(!post) {
                            return res.json({"error": "Post not found."});
                        }

                        // Create the user post like
                        return dataProvider.UserPostLike.forge({user_id: user.id, post_id: req.params.post_id}).save(null, {context: {internal: true}}).then(function(){
                            post.set("like_count", post.get("like_count") + 1);
                            post.save({"like_count": post.get("like_count")}, {ignoreTags: true, context: {internal: true}}).then(function(post){
                                return res.json({"like_count": post.get("like_count")});
                            });
                        });
                    });
                });
            });
        } else {
            next();
        }
    },

    unlike_post: function(req, res, next){
        if(req.user) {
            // get the actual user (users table instance)
            req.user.getUser().then(function(user){
                // Try to load a user post like for this and see if there is one
                dataProvider.UserPostLike.forge({user_id: user.id, post_id: req.params.post_id}).fetch().then(function(like){
                    if(!like) {
                        return res.json({"error": "You haven't liked this post yet."});
                    }

                    // Look up the psot now and make sure it exists
                    return dataProvider.Post.forge({id: req.params.post_id}).fetch({withRelated: ["tags"]}).then(function(post){
                        if(!post) {
                            return res.json({"error": "Post not found."});
                        }

                        // Create the user post like
                        return dataProvider.UserPostLike.forge().where({user_id: user.id, post_id: req.params.post_id}).destroy(null, {context: {internal: true}}).then(function(){
                            post.set("like_count", post.get("like_count") - 1);
                            post.save({"like_count": post.get("like_count")}, {ignoreTags: true, context: {internal: true}}).then(function(post){
                                return res.json({"like_count": post.get("like_count")});
                            });
                        });
                    });
                });
            });
        } else {
            next();
        }
    },

    // Update the users name and bio
    user_update: function(req, res, next){
        if(req.user && (req.body.name || req.body.bio)) {
            // get the actual user (users table instance)
            req.user.getUser().then(function(user){
                user.set("name", req.body.name);
                user.set("bio", req.body.bio);
                user.set("location", req.body.location);

                user.save().then(function(){
                    return res.json({"updated": true});
                });
            });
        } else {
            next();
        }
    },

    // handle the post request from the main site to set up the access token
    signin: function(req, res, next){
        if(req.user) {
            if(!req.body) {
                req.body = {};
            }
            req.body.grant_type = "password";
            req.body.client_id = "ghost-admin";
            req.body.username = req.user.get("email");
            req.body.password = req.user.getPassword();
        }
        next();
    },

    // Handle a social callback
    social_callback: function(req, res, next) {
        if(req.user.status === "accepted") {
            res.render("signin");
        } else {
            res.redirect(req.session.lastUrl);
        }
    },

    // Handle a new SSO user.
    new_user: function(req, res, next){
        if(!req.user) {
            res.redirect(req.session.lastUrl);
        }

        dataProvider.SSOUser.forge({"email": req.body.email}).fetch().then(function(user){
            if(user) {
                // TODO: convey this error to the front end.
                throw "Email already exists.";
            }

            // Use the form submission to update the SSO User.
            req.user.set("name", req.body.name);
            req.user.set("email", req.body.email);
            req.user.set("reason", req.body.reason);
            req.user.set("status", "pending");
            req.user.set("status_date", new Date());
            req.user.save(null, {context: {internal: true}});

            var image_url = req.user ? req.user.attributes.image_url : null;

            // Join the sso user to the users table (create a new one if necessary)
            dataProvider.User.forge({"email":req.body.email}).fetch().then(function(user){
                var password = config.salt + req.user.get("social_id") + req.user.get("network");
                if(user) {
                    // update the user properties and save and return
                    user.set("name", req.user.get("name"));
                    return dataProvider.User.hashPassword(password).then(function(hashedPw) { 
                        user.set("password", hashedPw);
                        user.set("image", image_url);
                        return user.save(null, {context: {internal: true}}).then(function(user){
                            sendEmail(user.get("email"), config.notifications.access_requested.subject, config.notifications.access_requested.copy);
                        });
                    });
                }

                // Create a new user in the database
                return dataProvider.User.add({
                    "name": req.user.get("name"),
                    "password": password,
                    "email": req.user.get("email"),
                    "image": image_url
                }, {context: {internal: true}}).then(function(user){
                    return sendEmail(user.get("email"), config.notifications.access_requested.subject, config.notifications.access_requested.copy);
                });
            });
        });
        
        res.redirect(req.session.lastUrl);
    },

    // Popular sorts by the number of likes in the like_count column
    popular: function(req, res, next){
        // Parse the page number
        var pageParam = req.params.page !== undefined ? parseInt(req.params.page, 10) : 1,
            options = {
                page: pageParam,
                currentUser: req.user,
                popular: true
            };

        // No negative pages, or page 1
        if (isNaN(pageParam) || pageParam < 1 || (pageParam === 1 && req.route.path === '/page/:page/')) {
            return res.redirect(config.paths.subdir + '/');
        }
        return getPostPage(options).then(function (page) {
            // If page is greater than number of pages we have, redirect to last page
            if (pageParam > page.meta.pagination.pages) {
                return res.redirect(page.meta.pagination.pages === 1 ? config.paths.subdir + '/' : (config.paths.subdir + '/page/' + page.meta.pagination.pages + '/'));
            }

            setReqCtx(req, page.posts);

            // Render the page of posts
            filters.doFilter('prePostsRender', page.posts).then(function (posts) {
                getActiveThemePaths().then(function (paths) {
                    var view = paths.hasOwnProperty('popular.hbs') ? 'popular' : 'index';

                    setResponseContext(req, res);
                    if(req.query.ajax) {
                        res.render("partials/loop", formatPageResponse(posts, page, {ssoUser:req.user}));
                    } else {
                        res.render(view, formatPageResponse(posts, page, {ssoUser:req.user}));
                    }
                });
            });
        }).catch(handleError(next));
    },

    // Latest behaves like the old index page...
    latest: function(req, res, next){
        // Parse the page number
        var pageParam = req.params.page !== undefined ? parseInt(req.params.page, 10) : 1,
            options = {
                page: pageParam,
                currentUser: req.user
            };

        // No negative pages, or page 1
        if (isNaN(pageParam) || pageParam < 1 || (pageParam === 1 && req.route.path === '/page/:page/')) {
            return res.redirect(config.paths.subdir + '/');
        }

        return getPostPage(options).then(function (page) {
            // If page is greater than number of pages we have, redirect to last page
            if (pageParam > page.meta.pagination.pages) {
                return res.redirect(page.meta.pagination.pages === 1 ? config.paths.subdir + '/' : (config.paths.subdir + '/page/' + page.meta.pagination.pages + '/'));
            }

            setReqCtx(req, page.posts);

            // Render the page of posts
            filters.doFilter('prePostsRender', page.posts).then(function (posts) {
                getActiveThemePaths().then(function (paths) {
                    var view = paths.hasOwnProperty('latest.hbs') ? 'latest' : 'index';

                    setResponseContext(req, res);
                    if(req.query.ajax) {
                        res.render("partials/loop", formatPageResponse(posts, page, {ssoUser:req.user}));
                    } else {
                        res.render(view, formatPageResponse(posts, page, {ssoUser:req.user}));
                    }
                });
            });
        }).catch(handleError(next));
    },
    homepage: function (req, res, next) {
        // Parse the page number
        var pageParam = req.params.page !== undefined ? parseInt(req.params.page, 10) : 1,
            options = {
                page: pageParam,
                currentUser: req.user
            };

        if(config.homeTag) {
            options["tag"] = config.homeTag;
        }

        // No negative pages, or page 1
        if (isNaN(pageParam) || pageParam < 1 || (pageParam === 1 && req.route.path === '/page/:page/')) {
            return res.redirect(config.paths.subdir + '/');
        }

        return getPostPage(options).then(function (page) {
            // If page is greater than number of pages we have, redirect to last page
            if (pageParam > page.meta.pagination.pages) {
                return res.redirect(page.meta.pagination.pages === 1 ? config.paths.subdir + '/' : (config.paths.subdir + '/page/' + page.meta.pagination.pages + '/'));
            }

            setReqCtx(req, page.posts);

            // Render the page of posts
            filters.doFilter('prePostsRender', page.posts).then(function (posts) {
                getActiveThemePaths().then(function (paths) {
                    var view = paths.hasOwnProperty('home.hbs') ? 'home' : 'index';

                    // If we're on a page then we always render the index
                    // template.
                    if (pageParam > 1) {
                        view = 'index';
                    }

                    setResponseContext(req, res);
                    if(req.query.ajax) {
                        res.render("partials/loop", formatPageResponse(posts, page, {ssoUser:req.user}));
                    } else {
                        res.render(view, formatPageResponse(posts, page, {ssoUser:req.user}));
                    }
                });
            });
        }).catch(handleError(next));
    },
    tag: function (req, res, next) {
        // Parse the page number
        var pageParam = req.params.page !== undefined ? parseInt(req.params.page, 10) : 1,
            options = {
                page: pageParam,
                tag: req.params.slug,
                currentUser: req.user
            };
            
        // Get url for tag page
        function tagUrl(tag, page) {
            var url = config.paths.subdir + '/' + config.routeKeywords.tag  + '/' + tag + '/';

            if (page && page > 1) {
                url += 'page/' + page + '/';
            }

            return url;
        }

        // No negative pages, or page 1
        if (isNaN(pageParam) || pageParam < 1 || (req.params.page !== undefined && pageParam === 1)) {
            return res.redirect(tagUrl(options.tag));
        }

        return getPostPage(options).then(function (page) {
            // If page is greater than number of pages we have, redirect to last page
            if (pageParam > page.meta.pagination.pages) {
                return res.redirect(tagUrl(options.tag, page.meta.pagination.pages));
            }

            setReqCtx(req, page.posts);
            if (page.meta.filters.tags) {
                setReqCtx(req, page.meta.filters.tags[0]);
            }

            // Render the page of posts
            filters.doFilter('prePostsRender', page.posts).then(function (posts) {
                getActiveThemePaths().then(function (paths) {
                    var view = template.getThemeViewForTag(paths, options.tag),
                    // Format data for template
                        result = formatPageResponse(posts, page, {
                            tag: page.meta.filters.tags ? page.meta.filters.tags[0] : '',
                            ssoUser:req.user
                        });

                    // If the resulting tag is '' then 404.
                    if (!result.tag) {
                        return next();
                    }
                    setResponseContext(req, res);
                    if(req.query.ajax) {
                        res.render("partials/loop", result);
                    } else {
                        res.render(view, result);
                    }
                });
            });
        }).catch(handleError(next));
    },
    author: function (req, res, next) {
        // Parse the page number
        var pageParam = req.params.page !== undefined ? parseInt(req.params.page, 10) : 1,
            options = {
                page: pageParam,
                author: req.params.slug,
                currentUser: req.user
            };

        // Get url for tag page
        function authorUrl(author, page) {
            var url = config.paths.subdir + '/' + config.routeKeywords.author + '/' + author + '/';

            if (page && page > 1) {
                url += config.routeKeywords.page + '/' + page + '/';
            }

            return url;
        }

        // No negative pages, or page 1
        if (isNaN(pageParam) || pageParam < 1 || (req.params.page !== undefined && pageParam === 1)) {
            return res.redirect(authorUrl(options.author));
        }

        return getPostPage(options).then(function (page) {
            // If page is greater than number of pages we have, redirect to last page
            if (pageParam > page.meta.pagination.pages) {
                return res.redirect(authorUrl(options.author, page.meta.pagination.pages));
            }

            setReqCtx(req, page.posts);
            if (page.meta.filters.author) {
                setReqCtx(req, page.meta.filters.author);
            }

            // Render the page of posts
            filters.doFilter('prePostsRender', page.posts).then(function (posts) {
                getActiveThemePaths().then(function (paths) {
                    var view = paths.hasOwnProperty('author.hbs') ? 'author' : 'index',
                        // Format data for template
                        result = formatPageResponse(posts, page, {
                            author: page.meta.filters.author ? page.meta.filters.author : '',
                            ssoUser: req.user,
                            canEdit: false
                        });

                    // If the resulting author is '' then 404.
                    if (!result.author) {
                        return next();
                    }

                    setResponseContext(req, res);
                    if(req.user) {
                        req.user.getUser().then(function(user){
                            result.user = user;
                            result.canEdit = user.id === result.author.id;
                            if(req.query.ajax) {
                                res.render("partials/loop", result);
                            } else {
                                res.render(view, result);
                            }    
                        });
                    } else {
                        if(req.query.ajax) {
                            res.render("partials/loop", result);
                        } else {
                            res.render(view, result);
                        }
                    }
                });
            });
        }).catch(handleError(next));
    },

    single: function (req, res, next) {
        var path = req.path,
            params,
            usingStaticPermalink = false;

        api.settings.read('permalinks').then(function (response) {
            var permalink = response.settings[0],
                editFormat,
                postLookup,
                match;

            editFormat = permalink.value[permalink.value.length - 1] === '/' ? ':edit?' : '/:edit?';

            // Convert saved permalink into a path-match function
            permalink = routeMatch(permalink.value + editFormat);
            match = permalink(path);

            // Check if the path matches the permalink structure.
            //
            // If there are no matches found we then
            // need to verify it's not a static post,
            // and test against that permalink structure.
            if (match === false) {
                match = staticPostPermalink(path);
                // If there are still no matches then return.
                if (match === false) {
                    // Reject promise chain with type 'NotFound'
                    return Promise.reject(new errors.NotFoundError());
                }

                usingStaticPermalink = true;
            }

            params = match;

            // Sanitize params we're going to use to lookup the post.
            postLookup = _.pick(params, 'slug', 'id');
            // Add author, tag and fields
            postLookup.include = 'author,tags,fields,user_likes';

            // Query database to find post
            return api.posts.read(postLookup);
        }).then(function(results){
            return dataProvider.Tag.findAll().then(function(data){
                var tags = {};
                for(var i in data.models) {
                    tags[data.models[i].get("name")] = (data.models[i]);
                }

                results.allTags = tags;
                return results;
            });
        }).then(function (result) {
            var post = result.posts[0],
                slugDate = [],
                slugFormat = [];

            if (!post) {
                return next();
            }

            function render() {
                // If we're ready to render the page but the last param is 'edit' then we'll send you to the edit page.
                if (params.edit) {
                    params.edit = params.edit.toLowerCase();
                }
                if (params.edit === 'edit') {
                    return res.redirect(config.paths.subdir + '/ghost/editor/' + post.id + '/');
                } else if (params.edit !== undefined) {
                    // reject with type: 'NotFound'
                    return Promise.reject(new errors.NotFoundError());
                }

                setReqCtx(req, post);

                filters.doFilter('prePostsRender', post).then(function (post) {
                    getActiveThemePaths().then(function (paths) {
                        var view = template.getThemeViewForPost(paths, post),
                            response = formatResponse(post, {ssoUser:req.user});
                        response.allTags = result.allTags;
                        setResponseContext(req, res, response);

                        res.render(view, response);
                    });
                });
            }

            // If we've checked the path with the static permalink structure
            // then the post must be a static post.
            // If it is not then we must return.
            if (usingStaticPermalink) {
                if (post.page) {
                    return render();
                }

                return next();
            }

            // If there is an author parameter in the slug, check that the
            // post is actually written by the given author\
            if (params.author) {
                if (post.author.slug === params.author) {
                    return render();
                }
                return next();
            }

            // If there is any date based parameter in the slug
            // we will check it against the post published date
            // to verify it's correct.
            if (params.year || params.month || params.day) {
                if (params.year) {
                    slugDate.push(params.year);
                    slugFormat.push('YYYY');
                }

                if (params.month) {
                    slugDate.push(params.month);
                    slugFormat.push('MM');
                }

                if (params.day) {
                    slugDate.push(params.day);
                    slugFormat.push('DD');
                }

                slugDate = slugDate.join('/');
                slugFormat = slugFormat.join('/');

                if (slugDate === moment(post.published_at).format(slugFormat)) {
                    return render();
                }

                return next();
            }

            // Look up if the current user has liked this post or not before rendering.
            post.current_user_likes = false;
            if(req.user) {
                return req.user.getUser().then(function(user){
                    if(!user) {
                        return render();
                    }

                    return dataProvider.UserPostLike.forge({post_id: post.id, user_id: user.id}).fetch().then(function(likes){
                        if(likes) {
                            post.current_user_likes = true;
                        }
                        return render();
                    });
                });
            } else {
                return render();
            }
        }).catch(function (err) {
            // If we've thrown an error message
            // of type: 'NotFound' then we found
            // no path match.
            if (err.type === 'NotFoundError') {
                return next();
            }

            return handleError(next)(err);
        });
    },
    rss: rss
};

module.exports = frontendControllers;
