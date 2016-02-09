var admin       = require('../controllers/admin'),
    express     = require('express'),

    adminRoutes;

adminRoutes = function () {
    var router = express.Router();

    router.get('*', function(req, res, next){
    	// try to get the user
    	if(!req.user) {
    		// TODO: Tell the user they are not permitted to accessthis
    		res.redirect("/");
    		return ;
    	}
    	req.user.getUser().then(function(user){
            if(!user) {
                req.user.set("status", "new");
                req.user.save(null, {context: {internal: true}});
                res.redirect("/");
                return ;
            }
    		user.roles().fetch().then(function(roles){
    			var isReader = false;
    			for(var r in roles.models) {
    				if(roles.models[r].get("name") === "Reader") {
    					isReader = true;
    				}
    			}


    			if(isReader) {
    				// Unauthorized
                    // TODO: show the you do not have permissions thing here...
    				res.redirect("/");
    				return ;
    			} else {
    				next();
    			}
    		});
    	});
    }, admin.index);

    return router;
};

module.exports = adminRoutes;
