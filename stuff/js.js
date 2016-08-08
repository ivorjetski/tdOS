function pageaspect() {
    if ($(window).height() > $(window).width()) {
        $('body').removeClass("landscape").addClass("portrait");
    }
    if ($(window).height() < $(window).width()) {
        $('body').removeClass("portrait").addClass("landscape");
    }
}
$(document).ready(pageaspect);
$(window).resize(pageaspect);

function appswap() {
    $('body').removeClass('home browser camera apploaded');
}

$('.close').click(function () {
    appswap();
    $('body').addClass('home');
    return false;
});
$('.tab-close').click(function () {
    $('.tab-cover').addClass('hide');
    $(this).closest('.tab').remove();
    return false;
});


//home
$(window).load(function () {
    $('body').addClass('ready1').delay(250).queue(function () {
        $('body').removeClass('ready1').addClass('ready2').clearQueue().delay(250).queue(function () {
            $('body').removeClass('ready2').addClass('ready3').clearQueue().delay(500).queue(function () {
                $('body').addClass('home');
            });
        });
    });
});



$('.app-list a').click(function () {

    var icon = $(this);
    var position = icon.position();
    $('.app').css('transform-origin', Math.round(position.left + 50) + 'px ' + Math.round(position.top + 50) + 'px');
});


//browser
//open
$('#abrowser').click(function () {
    appswap();
    $('body').addClass('browser apploaded');
    return false;
});
//refresh
$('.browser-refresh').click(function () {
    $('#browseri').attr('src', $('#browseri').attr('src'));
    return false;
});
//search
function setBrowserFrameSource() {
    var browserFrame = document.getElementById("browseri");
    browserFrame.src = document.getElementsByClassName("bsf-field").value;
}
$('.bsf-field').keypress(function (e) {
    var key = e.which;
    if (key == 13) 
    {
        $('.bsf-btn').click();
        return false;
    }
});
//back
var loads = 0;
$('.browseri').load(function(){
    if(loads == 0){
    }else{
        $('.browser-back').removeClass('hide');
    }
    ++loads;
});
$('.browser-back').click(function () {
    window.history.back();
    return false;
});
//new

var bcount = 0;
$('.browser-new').click(function () {
    bcount++;
    $('.tab-cover').removeClass('hide');
    $('.browser-new').addClass('hide');
    var $clone = $('#tab0').clone(true,true);
    $('#browser').append($clone);
    $clone.attr('id', 'tab' + bcount).addClass('clone');
    $clone.find('#browseri0').attr('id', 'browseri0' + bcount)
    $clone.css('top', 40 * bcount);
    $clone.find('.browser-new, .tab-close').removeClass('hide');
    $clone.find('.tab-cover, .close').addClass('hide');
});







//camera
//open
$('#acamera').click(function () {
    appswap();
    $('body').addClass('camera apploaded');
    return false;
});