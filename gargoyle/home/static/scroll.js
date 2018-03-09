// ------------- VARIABLES ------------- //
var ticking = false;
var isFirefox = (/Firefox/i.test(navigator.userAgent));
var isIe = (/MSIE/i.test(navigator.userAgent)) || (/Trident.*rv\:11\./i.test(navigator.userAgent));
var scrollSensitivitySetting = 30; //Increase/decrease this number to change sensitivity to trackpad gestures (up = less sensitive; down = more sensitive) 
var slideDurationSetting = 600; //Amount of time for which slide is "locked"
var currentSlideNumber = 0;
var totalSlideNumber = $(".background").length;
var controlsNumber = $(".page-counter").length;

// ------------- DETERMINE DELTA/SCROLL DIRECTION ------------- //
function parallaxScroll(evt) {
  if (isFirefox) {
    //Set delta for Firefox
    delta = evt.detail * (-120);
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
      }
      slideDurationTimeout(slideDurationSetting);
    }
    if (delta >= scrollSensitivitySetting) {
      //Up scroll
      ticking = true;
      if (currentSlideNumber !== 0) {
        currentSlideNumber--;
      }
      previousItem();
      slideDurationTimeout(slideDurationSetting);
    }
  }
}

// ------------- SET TIMEOUT TO TEMPORARILY "LOCK" SLIDES ------------- //
function slideDurationTimeout(slideDuration) {
  setTimeout(function() {
    ticking = false;
  }, slideDuration);
}

// ------------- ADD EVENT LISTENER ------------- //
var mousewheelEvent = isFirefox ? "DOMMouseScroll" : "wheel";
window.addEventListener(mousewheelEvent, _.throttle(parallaxScroll, 60), false);

// ------------- SLIDE MOTION ------------- //
function nextItem() {
  var $previousSlide = $(".background").eq(currentSlideNumber - 1);
  var $previousControl = $(".page-counter").eq(currentSlideNumber - 1);
  var $nextControl = $(".page-counter").eq(currentSlideNumber);
  $previousSlide.removeClass("up-scroll").addClass("down-scroll");
  $previousControl.removeClass("counter-active");
  $nextControl.addClass("counter-active");
}

function previousItem() {
  var $currentSlide = $(".background").eq(currentSlideNumber);
  var $previousControl = $(".page-counter").eq(currentSlideNumber + 1);
  var $currentControl = $(".page-counter").eq(currentSlideNumber);
  $currentSlide.removeClass("down-scroll").addClass("up-scroll");
  $previousControl.removeClass("counter-active");
  $currentControl.addClass("counter-active");

}


function clickControl(number, id){
  var $nextSlide = $(".background").eq(number);
  var $nextControl = $(".page-counter").eq(number);
  var $currentSlide = $("#next-item");
  $currentSlide.attr('id',' ');
  $nextControl.attr('id', 'next-item');
  $("#next-item").prev(".page-counter").removeClass("counter-active");
  $nextSlide.addClass("up-scroll");

}

