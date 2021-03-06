// Google Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-687900-11', 'rickhocutt.com');
ga('send', 'pageview');

$(document).foundation();

//Open modal from portfolio items
$(".card").each(function() {
  // Portfolio Page Sliding Title Overlay
  $(this).hover(function() {
    $(".back", this).stop().animate({top:'0px'},{queue:false,duration:300});
    $('img', this).addClass('effect');
  }, function() {
    $(".back", this).stop().animate({top:'100%'},{queue:false,duration:300});
    $('img', this).removeClass('effect');
  });

  // open link in modal
  var linkURL = $(this).attr("href");

  $(this).click(function(e) {
    $("#modal-1").html("");
    $.ajax({
      url: linkURL,
      type: 'GET',
      success: function(data) {
        $("#modal-1").html($(data).filter('#main'));
        $('<a class="close-reveal-modal">&#215;</a>').insertAfter("#modal-1 #main");
      },
      complete: function (data) {
        $("#modal-1").foundation('reveal', 'open');
        $(".reveal-modal").css({"max-height" : window.innerHeight - 50 +"px", "overflow-y" : "auto"});
      },
      error: function() {
        alert('Sorry an error has occurred');
      }
    });
    e.preventDefault();
  });

});

$(document).ready(function() {
  $('#homepage a[href^="#"], #homepage a[href^="/#"]').on('click', function(e) {
    e.preventDefault();

    var target = this.hash,
    $target = $(target);

    $('html, body').stop().animate({
      'scrollTop': $target.offset().top
    }, 900, 'swing', function() {
      window.location.hash = target;
    });

    if ($(this).hasClass("contactLink")){
      $("form #your-name").focus();
    }
  });

  // Handle the Prev/Next links in modal
  $("#modal-1").click(function(event) {
    if( $(event.target).hasClass('button')) {
      var urlLink = $(event.target).attr("href");
      $(".fragment").load( urlLink+" #main");
      event.preventDefault();
    }
  });

  // Remove HTML from modal on close
  $(document).on('close.fndtn.reveal', '[data-reveal]', function () {
    $("#modal-1 .fragment").empty();
    $(".reveal-modal-bg").remove();
  });
});
