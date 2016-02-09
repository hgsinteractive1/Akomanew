//configure paths
akomadefine(['jquery'], function($) {
	$ = $ || window.$;

	/**
	 * Make sure that the local storage session is set, if its not make an ajax request to set it.
	 **/
	if(!localStorage["ghost:session"]) {
        $.post("/auth/user/signin", {}, function(data){
            localStorage.setItem("ghost:session", JSON.stringify({
                "authenticator":"simple-auth-authenticator:oauth2-password-grant",
                "token_type":data.token_type,
                "expires_in": data.expires_in,
                "expires_at": new Date((new Date().getTime() + data.expires_in)),
                "access_token": data.access_token,
                "refresh_token":data.refresh_token
            }));
        });
    }
});