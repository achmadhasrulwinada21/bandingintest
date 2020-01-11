try {
  // Bootstrap 4.3.1 dependency
  window.jQuery = window.$ = $ = require("jquery");
  window.Popper = require("popper.js").default;
  require("bootstrap");

  // CoreUI 2.0.7 dependency
  require("@coreui/coreui/dist/js/coreui");
  require("@coreui/coreui/dist/js/coreui-utilities");

  // ----------------------------------------------------------------------------------------------------------

  // jQuery UI
  // Has dependency on main.scss
  require("jquery-ui-dist/jquery-ui.min");

  // Viewport Checker
  // For viewport animation
  window.viewportChecker = require("jquery-viewport-checker");

  // Parallax JS
  // For parallax effect
  require("jquery-parallax.js");

  // Fancy Box
  // For lightbox
  // Has dependency on main.scss"
  require("fancybox/dist/js/jquery.fancybox");

  // Bootstrap Datepciker
  // For Datepicker
  // Has dependency on main.scss"
  require("bootstrap-datepicker/dist/js/bootstrap-datepicker");

  // Select
  // For custom select
  // Has dependency on main.scss
  require("select2");

  // DataTables
  // For advanced table
  // Has dependency on main.scss"
  require("datatables.net");
  require("datatables.net-bs4");

  // Slick Slider
  // For advanced slider
  // Has dependency on main.scss
  require("slick-carousel");

  // Owl Carousel-
  // For custom carousel
  // Has dependency on.main.scss"
  require("owl.carousel");

  // Carousel.js
  // Carousel custom JS from author
  require("./carousel");

  // Main.js
  // Main custom JS from author
  require("./main");
} catch (e) {}
