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
//browser
//browser
//open
$('#abrowser').click(function () {
    appswap();
    $('body').addClass('browser apploaded');
    return false;
});
//new tab
var bcount = 0;
$('.browser-new').click(function () {
    bcount++;
    $('.tab-cover').removeClass('hide');
    $('.browser-new').addClass('hide');
    var $clone = $('#tab0').clone(true,true);
    $('#browser').append($clone);
    $clone.attr('id', 'tab' + bcount).addClass('clone');
    $clone.find('iframe').attr('id', 'iframetab0' + bcount);
    $clone.find('form').attr('target', 'iframetab0' + bcount);
    $clone.css('top', 40 * bcount);
    $clone.find('.browser-new, .tab-close').removeClass('hide');
    $clone.find('.tab-cover, .close').addClass('hide');
});
//refresh
$('.browser-refresh').click(function () {
    var tabid = '#' + $(this).closest('.tab').attr('id');
    $(tabid + ' iframe').attr('src', $(tabid + ' iframe').attr('src'));
    return false;
});
//search
function setBrowserFrameSource() {
    var iframeid = $(this).closest('.tab').attr('id');
    var browserFrame = document.getElementById('iframe' + iframeid);
    browserFrame.src = document.getElementsByClassName("bsf-field").value;
}
$('.bsf-field').keypress(function (e) {
    var key = e.which;
    if (key == 13) {
        $(this).next().click();
        return false;
    }
});
//back
$('.tab').each(function () {
    var loads = 0;
    $(this).find('iframe').load(function () {
        if (loads == 0) {
            $(this).find('.browser-back').addClass('hide');
        } else {
            $(this).find('.browser-back').removeClass('hide');
        }
        ++loads;
    });
});
$('.browser-back').click(function () {
    window.history.back();
    return false;
});
$('.tab-cover').click(function () {
    $('.tab').removeClass('current-tab after-c-tab');
    $(this).closest('.tab').addClass('current-tab').nextAll().addClass('after-c-tab').find('.tab-cover').addClass('hide');
});





//camera
//camera
//camera

//select camera
'use strict';

var videoElement = document.querySelector('video');
var audioSelect = document.querySelector('select#audioSource');
var videoSelect = document.querySelector('select#videoSource');

navigator.getUserMedia = navigator.getUserMedia ||
  navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

function gotSources(sourceInfos) {
    for (var i = 0; i !== sourceInfos.length; ++i) {
        var sourceInfo = sourceInfos[i];
        var option = document.createElement('option');
        option.value = sourceInfo.id;
        if (sourceInfo.kind === 'audio') {
            option.text = sourceInfo.label || 'microphone ' +
              (audioSelect.length + 1);
            audioSelect.appendChild(option);
        } else if (sourceInfo.kind === 'video') {
            option.text = sourceInfo.label || 'camera ' + (videoSelect.length + 1);
            videoSelect.appendChild(option);
        } else {
            console.log('Some other kind of source: ', sourceInfo);
        }
    }
}

if (typeof MediaStreamTrack === 'undefined' ||
    typeof MediaStreamTrack.getSources === 'undefined') {
    alert('This browser does not support MediaStreamTrack.\n\nTry Chrome.');
} else {
    MediaStreamTrack.getSources(gotSources);
}

function successCallback(stream) {
    window.stream = stream; // make stream available to console
    videoElement.src = window.URL.createObjectURL(stream);
    videoElement.play();
}

function errorCallback(error) {
    console.log('navigator.getUserMedia error: ', error);
}

function camopen() {
    if (window.stream) {
        videoElement.src = null;
        window.stream.stop();
    }
    var audioSource = audioSelect.value;
    var videoSource = videoSelect.value;
    var constraints = {
        audio: {
            optional: [{
                sourceId: audioSource
            }]
        },
        video: {
            optional: [{
                sourceId: videoSource
            }]
        }
    };
    navigator.getUserMedia(constraints, successCallback, errorCallback);
}

audioSelect.onchange = camopen;
videoSelect.onchange = camopen;

//open
$('#acamera').click(function () {
    appswap();
    $('body').addClass('camera apploaded');
    camopen();
    return false;
});

$('#camera .close').click(function () {
    window.stream.stop();
    alert('hello');
});

