akomadefine(["jquery"],function(e){e=e||window.$,localStorage["ghost:session"]||e.post("/auth/user/signin",{},function(e){localStorage.setItem("ghost:session",JSON.stringify({authenticator:"simple-auth-authenticator:oauth2-password-grant",token_type:e.token_type,expires_in:e.expires_in,expires_at:new Date((new Date).getTime()+e.expires_in),access_token:e.access_token,refresh_token:e.refresh_token}))})});