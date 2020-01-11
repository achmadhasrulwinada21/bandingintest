/* ==========================================================================
   General
   ========================================================================== */

/* Viewport Animations
-------------------------------------------------- */


/* Smooth Scroll
-------------------------------------------------- */
$('a.smooth-scroll').click(function() {
  if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 800);
      return false;
    }
  }
});

/* Parallax
-------------------------------------------------- */
// $(document).ready(function() {
//   $('.parallax-window').parallax({parallax: 'scroll'});
// }); 

/* Toggle active class
-------------------------------------------------- */
$('.classname').click(function(e){
  e.preventDefault();
  $(this).addClass('active');
  $(this).siblings().each(function(){
    $(this).removeClass('active') ;
  });
});


$(function(event) {
  activePage();
})

function activePage() {
  var active = $('meta[name=page]').attr('initial');
  if (active) {
      $(document).find('*[pageactive=' + active + ']').addClass('active');
      $(document).find('.nav-' + active).addClass('active');
  }
}


/* ==========================================================================
   Navbar
   ========================================================================== */

/* Navbar Scroll
-------------------------------------------------- */
// var logo = ["../assets/img/brand/logo_avrist_purple.png", "../assets/img/brand/logo_avrist_white.png"];

// $(window).on("scroll", function() {
//   if ($(window).scrollTop() > 10) {
//      $(".navbar-avrist").addClass("navbar-scroll");
//      $(".icon-bar").addClass("scroll");
//      $('.navbar-avrist .navbar-brand img').attr('src', logo[0]);
//   } else {
//      //remove the background property so it comes transparent again (defined in your css)
//      $(".navbar-avrist").removeClass("navbar-scroll");
//      $(".icon-bar").removeClass("scroll");
//      $('.navbar-avrist .navbar-brand img').attr('src', logo[1]);
//   }
// });

// $(window).on("scroll", function() {
//   if ($(window).scrollTop() > 10) {
//      $(".navbar-avrist-transparent").addClass("navbar-scroll");
//      $(".icon-bar").addClass("scroll");
//      $('.navbar-avrist-transparent .navbar-brand img').attr('src', logo[0]);
//   } else {
//      //remove the background property so it comes transparent again (defined in your css)
//      $(".navbar-avrist-transparent").removeClass("navbar-scroll");
//      $(".icon-bar").removeClass("scroll");
//      $('.navbar-avrist-transparent .navbar-brand img').attr('src', logo[1]);
//   }
// });


/* Navbar Responsive
-------------------------------------------------- */
$(".navbar-toggle").click(function(){
  $(".navbar-responsive").toggleClass("active");
  $(".navbar-list-mobile-1").toggleClass("animated fadeInLeft delayp1");
  $(".navbar-list-mobile-2").toggleClass("animated fadeInLeft delayp2");
  $(".navbar-list-mobile-3").toggleClass("animated fadeInLeft delayp3");
  $(".navbar-list-mobile-4").toggleClass("animated fadeInLeft delayp4");
  $(".navbar-btn-placeholder").toggleClass("animated fadeInLeft delayp6");
});


/* ==========================================================================
   Modal
   ========================================================================== */

/* Modal Button
-------------------------------------------------- */

$(".btn-modal").click(function (e) {
  var el = $(this).data('target');
  console.log(el);
  $(el).appendTo("body").modal("show");
})

$('.btn-rider-add').click(function(){
  var $this = $(this);
  $this.toggleClass('btn-green');
  if($this.hasClass('btn-green')){
    $this.html('<i class="fas fa-check-circle"></i> Added');     
  } else {
    $this.html('Add');
  }
});

$('.card-rider').click(function () {
  $(this).toggleClass("active");
})

