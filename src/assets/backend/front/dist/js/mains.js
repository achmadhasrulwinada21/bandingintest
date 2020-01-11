/* ==========================================================================
   General
   ========================================================================== */
  
  
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
  
  