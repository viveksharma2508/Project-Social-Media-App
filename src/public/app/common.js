// const posts = require("../../routes/posts");

$(() => {
    $('#navbar').load('/Components/navbar.html',loginIfNeeded);
    $('#footer').load('/Components/footer.html');
    $('#content').load('/Components/all-posts.html');

});

function loginIfNeeded(){
    let currentuser = window.localStorage.user ? JSON.parse(window.localStorage.user):null
    if(!currentuser){
        $.post('/api/users',{},(user) =>{
            if (user) {
                console.log('logged in as', user.username)
                window.localStorage.user = JSON.stringify(user)
                currentuser = user
                console.log($('#nav-username'))
                $('#nav-username').text(currentuser.username)
            }
        })
    }
    else{
        console.log('resuming session as', currentuser.username)
        console.log($('#nav-username'))
        $('#nav-username').text(currentuser.username)
    }
} 
