$( document ).ready(function() {

  // Register plugins
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

 // Smooth scroll
  if(ScrollTrigger.isTouch !==1){
    ScrollSmoother.create({
      wrapper:'.wrapper',
      content:'.content',
      smooth:1.5,
      effects:true
    })

    gsap.fromTo('.section.main',{
      opacity:1
    },
    {
      opacity:0,
      scrollTrigger:{
        trigger:'.section.main',
        start:'center',
        end:'bottom',
        scrub:true
      }
    })


    gsap.fromTo('.video-anim', { opacity: 0, x: -50 }, {
			opacity: 1, x: 0,
			scrollTrigger: {
				trigger: '.video-anim',
				start: '-850',
				end: '-100',
				scrub: true
			}
		})
  }

  // Custom cursor

  var cursor = $(".cursor"),
  follower = $(".cursor-follower");

  var posX = 0,
    posY = 0;

  var mouseX = 0,
    mouseY = 0;

  TweenMax.to({}, 0.016, {
  repeat: -1,
  onRepeat: function() {
    posX += (mouseX - posX) / 9;
    posY += (mouseY - posY) / 9;
    
    TweenMax.set(follower, {
        css: {    
        left: posX - 12,
        top: posY - 12
        }
    });
    
    TweenMax.set(cursor, {
        css: {    
        left: mouseX,
        top: mouseY
        }
    });
  }
  });

  $(document).on("mousemove", function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  $(".link").on("mouseenter", function() {
    cursor.addClass("active");
    follower.addClass("active");
  });

  $(".link").on("mouseleave", function() {
    cursor.removeClass("active");
    follower.removeClass("active");
  });




  // parallax
  var parallax = $(".parallax"),
  halfWindowH = $(window).height() * 0.5,
  halfWindowW = $(window).width() * 0.5,
  maxRotationY = 5,
  maxRotationX = 3;
  
  $(window).on("resize", function () {
    window.requestAnimationFrame(function () {
      (halfWindowH = $(window).height() * 0.5),
        (halfWindowW = $(window).width() * 0.5);
      initBackground();
    });
  });
  
  $(window).on("mousemove", function (e) {
    var rotateY = ((-event.pageX + halfWindowW) / halfWindowW) * maxRotationY,
      rotateX = ((event.pageY - halfWindowH) / halfWindowH) * maxRotationX;
  
    TweenMax.to(parallax, 2, { rotationX: rotateX, rotationY: rotateY });
  });

  // scroll trigger text

  $(function () {
   'use strict';
    let tl2 = gsap.timeline();
    tl2.to("#scrollingText", {
      x:1000,
      ease:'linear'
    })
    let tl = gsap.timeline();
    tl.to('#scrollingText', {
      x:500,
      xPercent:15,
      scrollTrigger:{
        trigger:"#scrollingText",
        scrub:1
      }
    })
    
  });

  $(function () {
    'use strict';
     let tl2 = gsap.timeline();
     tl2.to("#scrollingText2", {
       x:1000,
       ease:'linear'
     })
     let tl = gsap.timeline();
     tl.to('#scrollingText2', {
       x:500,
       xPercent:15,
       scrollTrigger:{
         trigger:"#scrollingText2",
         scrub:1
       }
     })
     
   });

   $(function () {
    'use strict';
     let tl2 = gsap.timeline();
     tl2.to("#scrollingText3", {
       x:1000,
       ease:'linear'
     })
     let tl = gsap.timeline();
     tl.to('#scrollingText3', {
       x:500,
       xPercent:15,
       scrollTrigger:{
         trigger:"#scrollingText3",
         scrub:1
       }
     })
     
   });
 


  // main section objects appear

  TweenMax.from(".main__title", 1, {
    opacity: 0,
    x: -20,
    ease: Expo.easeInOut,
    delay:1.8
  })
  TweenMax.from(".header", 1, {
    opacity: 0,
    y: -20,
    ease: Expo.easeInOut,
    delay:2
  })

  TweenMax.staggerFrom(".parallax__item", 1, {
      opacity: 0,
      x: -20,
      delay:1.5,
      ease: Power3.easeInOut,
  }, 0.08)

  // overlay bg
  TweenMax.to('.first', 1.5, {
    delay: .2,
    left: '-100%',
    ease: Expo.easeInOut
  })

  TweenMax.to('.second', 1.5, {
    delay: .4,
    left: '-100%',
    ease: Expo.easeInOut
  })

  TweenMax.to('.third', 1.5, {
    delay: .6,
    left: '-100%',
    ease: Expo.easeInOut
  })

  // Accordeon
  $(function () {

    'use strict';

    function oneItemAckordion() {
        $('.accordion_one_item .accordion__item').on('click', function () {
            const timeAnim = 250;
            $('.accordion_one_item .accordion__item').removeClass('active').css({ 'pointer-events': 'auto' });
            $(this).addClass('active').css({ 'pointer-events': 'none' });
            $('.accordion_one_item .accordion__header').next().slideUp(timeAnim);
            $(this).find('.accordion__header').next().slideDown(timeAnim);
        });
    }
    oneItemAckordion();
  });


  // scroll slider
  $(function () {

    'use strict';

    gsap.registerPlugin(ScrollTrigger);

    function scrollTrig() {

        let gsapBl = $('.gsap__bl').width();

        let gsapTrack = $('.gsap__track').width();
        let scrollSliderTransform = gsapTrack - gsapBl;

        let winHeight = $(window).height();
        let slHeight = $('.gsap_slider').outerHeight(true);
        let startScrollTrig = (winHeight - slHeight) / 2;

        // Skew
        let proxy = { skew: 0 },
            skewSetter = gsap.quickSetter(".gsap__item", "skewX", "deg"),
            clamp = gsap.utils.clamp(-1000, 1000);

        gsap.to(".gsap__track", {
            scrollTrigger: {
                trigger: ".gsap_slider",
                // start: "top center",
                start: () => "-=" + startScrollTrig,
                end: "+=1500px",
                // end: () => '+=' + gsapTrack,
                scrub: true,
                pin: true,
                // markers: true
                onUpdate: (self) => {
                    let skew = clamp(self.getVelocity() / 800);
                    if (Math.abs(skew) > Math.abs(proxy.skew)) {
                        proxy.skew = skew;
                        gsap.to(proxy, {
                            skew: 0,
                            duration: 0.8,
                            ease: "power3",
                            overwrite: true,
                            onUpdate: () => skewSetter(proxy.skew)
                        });
                    }
                }
            },
            x: "-" + scrollSliderTransform + "px",
        });
        gsap.set(".gsap__item", { transformOrigin: "center center", force3D: true });

        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 1000);
    }
    scrollTrig();
  });
  

});

