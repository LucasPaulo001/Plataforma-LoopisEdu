var btnSignin = document.querySelector('#signin')
var btnSignup = document.querySelector('#signup')
var body = document.querySelector('body')

btnSignin.addEventListener("click", function(){
    body.className = "sign_in-js";
});

btnSignup.addEventListener("click", function(){
    body.className = "sign_up-js";
});