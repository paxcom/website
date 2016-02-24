var slidesIntervalTime = 5000;
var slidesInterval;
var overviewScrolling = false;
var changeslideAuto = function(){
    var slidesCount = $('.slides-heads').children().length
    var activeHeadIndex = $('.slides-heads').find('.active-slide-head').index();
    activeHeadIndex++;
    if(activeHeadIndex >= slidesCount){
        activeHeadIndex = 0;
    }
    $('.slides-heads .slide-head').eq(activeHeadIndex).find('a').click();
}

var resetslidesInterval = function(){
    clearInterval(slidesInterval);
    slidesInterval = setInterval(changeslideAuto,slidesIntervalTime)
}

$(function(){
    //Typing effect
    $("#typed-pim").typed({
		stringsElement : $('#typed-strings'),
        typeSpeed: 30,
        backDelay: 500,
        loop: true,
        contentType: 'html',
        loopCount: false
    });
    
    
    $("#typed-insights").typed({
		stringsElement : $('#typed-strings'),
        typeSpeed: 30,
        backDelay: 500,
        loop: false,
        contentType: 'html',
        loopCount: false
    });

    wow = new WOW(
      {
        animateClass: 'animated',
        offset:       100
      }
    );
    wow.init();


    //Moving slides effect
    $('a').click(function(event){
        if($(this).hasClass('slide-btn')){
            if(event.hasOwnProperty('originalEvent')){
                clearInterval(slidesInterval)
            }
            //resetslidesInterval();
            var targetId = $(this).data('target-id');
            $('.slides-heads').find('.active-slide-head').removeClass('active-slide-head')
            $(event.target).closest('.slide-head').addClass('active-slide-head');
            $('.slides-contents').find('.active-slide-content').removeClass('active-slide-content');
            $(targetId).addClass('active-slide-content')
        }
    })
    slidesInterval = setInterval(changeslideAuto,slidesIntervalTime)
    
    $('#skuButton').on('click',function(){
		var iframe = $("#priceCompareFrame");
        if(iframe.attr("src") !== iframe.data("src")){
            iframe.attr("src", iframe.data("src"));    
        }
	});
    
    $('.top-main-part,header').bind('DOMMouseScroll mousewheel wheel',function (event) {
        if(window.animating){
            return false;
        }
        //console.log($('#navigation-bar').offset())
        console.log('w scroll top',$(window).scrollTop())        
        if( event.originalEvent.detail > 0 || event.originalEvent.wheelDelta < 0 ) { //alternative options for wheelData: wheelDeltaX & wheelDeltaY
            return frontDown();
        }
        return true;
    });
    
    $(document).keydown(function ( event ) {
        console.log('ddd',event)
        if(window.animating){
            return false;
        }
        if(isElementAtTop('#overview') && event.which === 40){
            return overviewDown()
        }
        if(isElementAtTop('#overview') && event.which === 38){
            return overviewUp()
        }
        if(isElementAtTop('#relatedProducts') && event.which === 40){
            return relatedDown()
        }
        if(isElementAtTop('#relatedProducts') && event.which === 38){
            return relatedUp()
        }
        if(($('#clients').offset().top <= $(window).scrollTop() + 100) && event.which === 40){
            return clientsDown()
        }
        if(($('#clients').offset().top <= $(window).scrollTop() + 100) && event.which === 38){
            return clientsUp()
        }
        
        if(!$('#navigation-bar').hasClass('navbar-fixed-top') && event.which === 40){
            return frontDown()
        }

        return true;
    });

    $('#overview').bind('DOMMouseScroll mousewheel wheel', function ( event ) {
        if(window.animating || overviewScrolling){
            return false;
        }
        overviewScrolling = true;
        setTimeout(function() {
            overviewScrolling = false;
        }, 250);
        console.log('w scroll top',$(window).scrollTop())
        console.log('#overview offset().top',$('#overview').offset().top);

        if( event.originalEvent.detail > 0 || event.originalEvent.wheelDelta < 0 ) { //alternative options for wheelData: wheelDeltaX & wheelDeltaY
            //scroll down
            return overviewDown();
        } else {
            return overviewUp();
        }
    });
    
	$('#relatedProducts').bind('DOMMouseScroll mousewheel wheel', function ( event ) {
        if(window.animating){
            return false;
        }
        console.log('w scroll top',$(window).scrollTop());
        console.log('#relatedProducts offset().top',$('#relatedProducts').offset().top);
        if( event.originalEvent.detail > 0 || event.originalEvent.wheelDelta < 0 ) { //alternative options for wheelData: wheelDeltaX & wheelDeltaY
            //scroll down
            return relatedDown();
        }else{
            //scroll up
            return relatedUp();
        }
    });

    $('#clients,footer').bind('DOMMouseScroll mousewheel wheel', function ( event ) {
        if(window.animating){
            return false;
        }
        console.log('w scroll top',$(window).scrollTop());1447
        console.log('#clients offset().top',$('#clients').offset().top);1534
        if( event.originalEvent.detail > 0 || event.originalEvent.wheelDelta < 0 ) { //alternative options for wheelData: wheelDeltaX & wheelDeltaY
            //scroll down
            return clientsDown();
        }else{
            //scroll up
            return clientsUp();
        }
    });
});



var overviewDown = function () {
                var slidesCount = $('.slides-heads').children().length
            var activeHeadIndex = $('.slides-heads').find('.active-slide-head').index();
            if($('#navigation-bar').hasClass('navbar-fixed-top')){
                activeHeadIndex++;
                if(activeHeadIndex >= slidesCount){
                    //scroll to related products
                    $('#nav2').click();
                    return false;
                }
                $('.slides-heads .slide-head').eq(activeHeadIndex).find('a').click();
                resetslidesInterval();
                //prevent page fom scrolling
                return false;
            }else{
                console.log('element not at top - scrolling down to nav1')
                $('#nav1').click();
                return false;
            }
}

var overviewUp = function () {
            var activeHeadIndex = $('.slides-heads').find('.active-slide-head').index();
            //scroll up
            if(isElementAtTop('#overview')){
                activeHeadIndex--;
                if(activeHeadIndex < 0){
                    //scroll to top
                    window.animating = true;
                    $('html, body').animate({scrollTop : 0},1500,'easeInOutExpo',function () {
                        window.animating = false;
                    });
                    return false;
                }
                $('.slides-heads .slide-head').eq(activeHeadIndex).find('a').click();
                resetslidesInterval();
                return false;
            }else{
                console.log('element not at top - up scroll')
                return true;
            }
}

var relatedDown = function () {
                $('#nav3').click();
            return false;
}

var relatedUp = function () {
                if($('#relatedProducts').offset().top >= ($(window).scrollTop() -15)){
                $('#nav1').click();
                return false;
            }else{
                return true;
            }
}

var clientsDown = function () {
                $('#nav3').click();
            return false;
}

var clientsUp = function () {
    if($('#clients').offset().top <= ($(window).scrollTop() + 100)){
                $('#nav2').click();
            }else{
                console.log('here')
                $('#nav1').click();
            }
            return false;
}

var frontDown = function () {
                $('#nav1').click();
            return false;
}

function isNavAtTop(){
    var docViewTop = $(window).scrollTop();
    var navTop = $('#navigation-bar').offset().top;
    return (navTop == docViewTop );
}

function isElementAtTop(element) {
    var windowTop = $(window).scrollTop();
    var elementTop = $(element).offset().top;
    if(elementTop >= windowTop -35 && elementTop <= windowTop + 35){
        return true;
    }
    return false;
}