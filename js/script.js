

    window.silex = window.silex || {}
    window.silex.data = {"site":{"width":1015},"pages":[{"id":"page-home","displayName":"Home","link":{"linkType":"LinkTypePage","href":"#!page-home"},"canDelete":true,"canRename":true,"canMove":true,"canProperties":true,"opened":false},{"id":"page-overview","displayName":"Overview","link":{"linkType":"LinkTypePage","href":"#!page-overview"},"canDelete":true,"canRename":true,"canMove":true,"canProperties":true,"opened":false},{"id":"page-license","displayName":"License","link":{"linkType":"LinkTypePage","href":"#!page-license"},"canDelete":true,"canRename":true,"canMove":true,"canProperties":true,"opened":false},{"id":"page-learn","displayName":"Learn","link":{"linkType":"LinkTypePage","href":"#!page-learn"},"canDelete":true,"canRename":true,"canMove":true,"canProperties":true,"opened":false},{"id":"page-projects","displayName":"Projects","link":{"linkType":"LinkTypePage","href":"#!page-projects"},"canDelete":true,"canRename":true,"canMove":true,"canProperties":true,"opened":false},{"id":"page-publications","displayName":"Publications","link":{"linkType":"LinkTypePage","href":"#!page-publications"},"canDelete":true,"canRename":true,"canMove":true,"canProperties":true,"opened":false},{"id":"page-getintouch","displayName":"GetInTouch","link":{"linkType":"LinkTypePage","href":"#!page-getintouch"},"canDelete":true,"canRename":true,"canMove":true,"canProperties":true,"opened":false},{"id":"page-ourteam","displayName":"OurTeam","link":{"linkType":"LinkTypePage","href":"#!page-ourteam"},"canDelete":true,"canRename":true,"canMove":true,"canProperties":true,"opened":false}]}
$(function(){
    // here, the website is loaded
    // this will fade the body out and then fade in again
//    $('body').hide(2000).show(2000);
});


$(function(){
    // here, the website is loaded
    // this will prevent the right click on all the images of your website (no menu on right click)
    $('.jstest').bind("contextmenu", function(e) {
        return false;
    });
});
