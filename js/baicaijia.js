/**
 * Created by Dylan on 2017/7/13.
 */
$(function () {
    getbaicaijiaTitle();
   function getbaicaijiaTitle() {
       $.ajax({
           url:"http://182.254.146.100:3000/api/getbaicaijiatitle",
           success:function (data) {
               var html=template("baicaijiaTemp",data);
               $(".tabs").html(html);
               $(".tabs").find("li").eq(0).addClass("active");
               setSwipe();
               getbaicaijiaProduct(0);
           }
       });
   }
    
    function  setSwipe(){
        $(".tabs").find("li").on('click',function () {
            $(".tabs").find("li").removeClass("active");
            $(this).addClass("active");
            var thisTitleId=$(this).find("a").attr("data-titleid");
            var navs=$(".tabs").find("li");
            var swipeLeft=0;
            for(var i=0;i<thisTitleId;i++){
                swipeLeft-=$(navs[i]).width();
            }
            if(swipeLeft>minPosition){
                swipeUl.css("transform","translateX("+swipeLeft+"px)");
                swipeUl.css("transition","all 0.5s");
            }else{
                swipeLeft=minPosition;
                swipeUl.css("transform","translateX("+swipeLeft+"px)");
                swipeUl.css("transition","all 0.5s");
            }
            currentX=swipeLeft;
            getbaicaijiaProduct(thisTitleId);
            console.log(thisTitleId);
        });
        var startX, endX, moveX;
        var currentX = 0;
        var distanceX = 0;
        var maxSwipe = 0 + 100;
        var minSwipe = $('.bcj-title').width() - $('.bcj-title').find('ul').width() - 100;
        var maxPosition = 0;
        var minPosition = $('.bcj-title').width() - $('.bcj-title').find('ul').width();

        var swipeUl = $('.bcj-title').find('ul');
        $('.bcj-title').on('touchstart', function(e) {
            // console.log(e.originalEvent.touches[0].clientX);
            startX = e.originalEvent.touches[0].clientX
        });
        $('.bcj-title').on('touchmove', function(e) {
            moveX = e.originalEvent.touches[0].clientX;
            distanceX = moveX - startX;
            // console.log(distanceX);
            //当超过了最大滑动的位置 就不让滑动  小于最大滑动距离才设置滑动
            if ((currentX + distanceX) < maxSwipe && (currentX + distanceX) > minSwipe) {
                swipeUl.css("transform", "translateX(" + (currentX + distanceX) + "px)");
                swipeUl.css("transition", "none");
            }

        });
        $('.bcj-title').on('touchend', function(e) {
            endX = e.originalEvent.changedTouches[0].clientX;
            currentX += distanceX;
            //松开手的时候要弹回去
            if (currentX > maxPosition) {
                currentX = maxPosition;
                swipeUl.css("transform", "translateX(" + currentX + "px)");
                swipeUl.css("transition", "all 0.2s");
            } else if (currentX < minPosition) {
                currentX = minPosition;
                swipeUl.css("transform", "translateX(" + currentX + "px)");
                swipeUl.css("transition", "all 0.2s");
            }
        })

    }

    function getbaicaijiaProduct(titleid) {
        $.ajax({
            url: "http://182.254.146.100:3000/api/getbaicaijiaproduct",
            data: {
                "titleid": titleid
            },
            success: function(data) {
                var html = template('baicaijiaProductTmp', data);
                $('.bcjList').html(html);
            }
        })
    }
    $(".goTop").click(function() {
        $("html,body").animate({scrollTop:0}, 200);
    });
});