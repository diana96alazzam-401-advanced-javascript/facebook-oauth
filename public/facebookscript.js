'use strict';

document.getElementById('loginbtn').addEventListener('click', loginWithFacebook, false )

function loginWithFacebook(){
    FB.login(response => {
        const accessToken = authRespose.response.accessToken;
        const userID = authRespose.response.userID

        console.log('hiiiiiiiiiiiiiiiiiiiiiiiiiiii', accessToken, userID);
        // const {authRespose:{accessToken, userID}} = response;
        fetch('/login-with-facebook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({accessToken, userID})
        }).then(res => {
            console.log(res)
        })
        FB.api('/me', function(response) {
            console.log(JSON.stringify(response));
        })
    }, {scope: 'public_profile,email'})
    return false

}
