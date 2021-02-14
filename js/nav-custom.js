$(window).bind('scroll', function () {
    if ($(window).scrollTop() > 100) {
        $('.main-nav').addClass('fixed')
    } else {
        $('.main-nav').removeClass('fixed');
    }
});

$(document).ready(function(){

    $('.nav-link').removeClass('active')
    
    $('.nav-link').on('click', function(){
        $('.nav-link').removeClass('active')
        $(this).addClass('active')
    })

    
   

    $('.nav-link').each(function(){   

        $('.nav-link').removeClass('active')

        var currentURL = window.location.href;
        var parts = currentURL.split("/");
        var currentURLlast_part = parts[parts.length-1];        

        var navValue = $(this).attr('href')
        var navValueparts = navValue.split("/");
        var navValuelast_part = navValueparts[navValueparts.length-1];       
        
        if(currentURLlast_part === navValuelast_part){
            $(this).addClass('active')            
        }
    })
    
    $('#menuTooggle').on('click', function(){
        $('.navbar-nav').toggleClass('right-zero') 
    })
    $('.menu-close').on('click', function(){
        $('.navbar-nav').toggleClass('right-zero') 
    })
})