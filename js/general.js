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
	if ($(window).width() > 640) {
		var headerHeight = $('#primary-header').outerHeight(),
		footerHeight = $('#primary-footer').outerHeight(),
		margin = headerHeight + 'px 0 ' + footerHeight + 'px 0';

		$('section.content').css('padding', margin);
	} else {
		$('section.content').css('padding', '0');
	}
}

$(document).ready(function() {

	if ($('#homepage').length) {
		sectionPadding();
		$(window).resize(function() {
			sectionPadding();
		});
	}

	// Focus on the form
	$("a.contactLink").click(function() {
	    $("form #name").focus();
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
});