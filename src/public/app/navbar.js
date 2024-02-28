let navlinks = $('.navbar-nav .nav-link');

navlinks.on("click", ((ev)=>{

    let componentUrl = `/Components/${$(ev.target).attr('data-component')}.html`
    $('#content').load(componentUrl)

}))