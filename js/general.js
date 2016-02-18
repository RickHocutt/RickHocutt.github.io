// Google Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-687900-11', 'rickhocutt.com');
  ga('send', 'pageview');

$(document).foundation();

function setUpPortfolio (portfolioConfig) {
	//Open modal from portfolio items
	$(portfolioConfig.items).each(function() {
		// Portfolio Page Sliding Title Overlay
		$(this).hover(function() {
			$(portfolioConfig.itemInfo, this).stop().animate({top:'0px'},{queue:false,duration:300});
			$('img', this).addClass('effect');
		}, function() {
			$(portfolioConfig.itemInfo, this).stop().animate({top:'100%'},{queue:false,duration:300});
			$('img', this).removeClass('effect');
		});

		// Make entire face clickable and open link in modal
		if ($(this).find('a').length) {

			var linkURL = $(this).find("a").attr("href");

			$(this).css({'cursor': 'pointer'}).click(function() {
				$.ajax({
					url: linkURL,
					type: 'GET',
					success: function(data) {
						$(portfolioConfig.modalItem).html($(data).filter('#main'));
						$('<a class="close-reveal-modal">&#215;</a>').insertAfter(portfolioConfig.modalItem +' '+ portfolioConfig.pageFragment);
						$(portfolioConfig.modalItem).foundation('reveal', 'open');
					},
					error: function() {
						alert('Sorry an error has occurred');
					}
				});
				return false;
			});
		}
	});
}

function sectionPadding(){
	if (Foundation.utils.is_large_up()) {
		var headerHeight = $('#primary-header').outerHeight(),
		    footerHeight = $('#primary-footer').outerHeight();

		$('section:first-of-type').css('margin-top', headerHeight +"px");
    $('section:last-of-type').css('margin-bottom', footerHeight +"px");
	} else {
    $('section:first-of-type').css('margin-top', "0");
    $('section:last-of-type').css('margin-bottom', "0");
  }
}

$(document).ready(function() {
	if ($('#homepage').length) {
		sectionPadding();
		$(window).resize(function() {
			sectionPadding();
		});
	}

  $(".js-primary-nav").find("a").each(function(){
    var target = $(this).attr("href").replace ("/", ""),
        offset = $(target).offset().top - $('#primary-header').outerHeight();

    $(this).on("click", function(e){
      e.preventDefault();
      $('html, body').animate({
        scrollTop: offset
      }, 2000);
    });
  });

	// Focus on the form
	$("a.contactLink").on("click", function() {
	    $("form #your-name").focus();
	});

	// Configs
	setUpPortfolio({
		items: ".card",
		itemInfo: ".back",
		modalItem: "#modal-1",
		pageFragment: "#main"
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
	});

  // Hide Header on on scroll down
  var didScroll;
  var lastScrollTop = 0;
  var delta = 5;
  var navbarHeight = $('#primary-header').outerHeight();

  $(window).scroll(function(event){
    didScroll = true;
  });

  setInterval(function() {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  }, 250);

  function hasScrolled() {
    var st = $(this).scrollTop();

    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
      return;

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
      // Scroll Down
      $('#primary-header').addClass('nav-up');
    } else {
      // Scroll Up
      if(st + $(window).height() < $(document).height()) {
        $('#primary-header').removeClass('nav-up');
      }
    }

    lastScrollTop = st;
  }
});
