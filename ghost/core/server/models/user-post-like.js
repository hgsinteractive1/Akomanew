var ghostBookshelf  = require('./base'),

    UserPostLike,
    UserPostLikes;

UserPostLike = ghostBookshelf.Model.extend({
    tableName: 'user_post_likes',

    users: function () {
        return this.belongsToMany('User');
    },

    posts: function () {
        return this.belongsToMany('Post');
    },
});

UserPostLikes = ghostBookshelf.Collection.extend({
    model: UserPostLike,

});

module.exports = {
    UserPostLike: ghostBookshelf.model('UserPostLike', UserPostLike),
    UserPostLikes: ghostBookshelf.collection('UserPostLikes', UserPostLikes)
};
