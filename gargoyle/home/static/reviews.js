// ------------- VARIABLES ------------- //
var reviewTicking = false;
var isFirefox = (/Firefox/i.test(navigator.userAgent));
var isIe = (/MSIE/i.test(navigator.userAgent)) || (/Trident.*rv\:11\./i.test(navigator.userAgent));
var reviewScrollSensitivitySetting = 30; //Increase/decrease this number to change sensitivity to trackpad gestures (up = less sensitive; down = more sensitive) 
var reviewSlideDurationSetting = 600; //Amount of time for which slide is "locked"
var reviewCurrentSlideNumber = 0;
var reviewTotalSlideNumber = $(".review-card").length;


// ------------- SET TIMEOUT TO TEMPORARILY "LOCK" SLIDES ------------- //
function reviewSlideDurationTimeout(slideDuration) {
  setTimeout(function() {
    reviewTicking = false;
  }, slideDuration);
}

// ------------- SLIDE MOTION ------------- //
function reviewNextItem() {
  var $reviewPreviousSlide = $(".review-card").eq(reviewCurrentSlideNumber - 1);
  $reviewPreviousSlide.removeClass("left-scroll").addClass("right-scroll");
}

function reviewPreviousItem() {
  var $reviewCurrentSlide = $(".review-card").eq(reviewCurrentSlideNumber);
  $reviewCurrentSlide.removeClass("right-scroll").addClass("left-scroll");

}


        
