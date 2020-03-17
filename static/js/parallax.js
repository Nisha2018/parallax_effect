


// -- -- -- -- -- --VARIABLES-- -- -- -- -- -- - //
var ticking = false;
var isFirefox = /Firefox/i.test(navigator.userAgent);
var isIe =
    /MSIE/i.test(navigator.userAgent) ||
    /Trident.*rv\:11\./i.test(navigator.userAgent);
var scrollSensitivitySetting = 30; //Increase/decrease this number to change sensitivity to trackpad gestures (up = less sensitive; down = more sensitive)
var slideDurationSetting = 600; //Amount of time for which slide is "locked"
var currentSlideNumber = 0;
var totalSlideNumber = $(".background").length;
var isTop = false;

// ------------- DETERMINE DELTA/SCROLL DIRECTION ------------- //
function parallaxScroll(evt) {
    if (isFirefox) {
        //Set delta for Firefox
        delta = evt.detail * -120;
    } else if (isIe) {
        //Set delta for IE
        delta = -evt.deltaY;
    } else {
        //Set delta for all other browsers
        delta = evt.wheelDelta;
    }

    if (ticking != true) {
        if (delta <= -scrollSensitivitySetting) {
            //Down scroll
            ticking = true;
            if (currentSlideNumber !== totalSlideNumber - 1) {

                currentSlideNumber++;
                nextItem();
                // noScroll();
            }
            slideDurationTimeout(slideDurationSetting);
        }
        if (delta >= scrollSensitivitySetting) {
            //Up scroll
            if(window.scrollY == 0){
                disableScroll();
                ticking = true;
                if (currentSlideNumber !== 0) {
                    currentSlideNumber--;
                }
                    
                    previousItem();
                    slideDurationTimeout(slideDurationSetting);
            }
            // if(isTop){
            // }
        }

        // if (currentSlideNumber === 0) {
        //     console.log("disable");
        //     disableScroll();
        // }

        if (currentSlideNumber === 2) {
           console.log("enable");
            setTimeout(()=>{enableScroll();},100)
        }
    }



    // var $window = $(window),
    //     previousScrollTop = 0,
    //     scrollLock = false;

    // $window.scroll(function(event) {
    //     if (scrollLock) {
    //         $window.scrollTop(previousScrollTop);
    //     }

    //     previousScrollTop = $window.scrollTop();
    // });


    // if (currentSlideNumber === 0) {
    //     scrollLock = !scrollLock;
    // }

    // if (currentSlideNumber === 2) {
    //     scrollLock = false;
    // }


}

function disableScroll() {
    // Get the current page scroll position 
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,

        // if any scroll is attempted, set this to the previous value 
        window.onscroll = function() {
            window.scrollTo(scrollLeft, scrollTop);
        };
}

function enableScroll() {
    window.onscroll = function() {};
}




// function noScroll() {
//     console.log("test");
//     setTimeout(() => {
//         window.scrollTo(0, 0);
//     }, 600);

// }

// ------------- SET TIMEOUT TO TEMPORARILY "LOCK" SLIDES ------------- //
function slideDurationTimeout(slideDuration) {
    setTimeout(function() {
        ticking = false;
    }, slideDuration);
}

// ------------- ADD EVENT LISTENER ------------- //
var mousewheelEvent = isFirefox ? "DOMMouseScroll" : "wheel";
window.addEventListener(mousewheelEvent, _.throttle(parallaxScroll, 60), false);
disableScroll();

// ------------- SLIDE MOTION ------------- //
function nextItem() {
    var $previousSlide = $(".background").eq(currentSlideNumber - 1);
    $previousSlide.removeClass("up-scroll").addClass("down-scroll");
}

function previousItem() {
    var $currentSlide = $(".background").eq(currentSlideNumber);
    $currentSlide.removeClass("down-scroll").addClass("up-scroll");
}