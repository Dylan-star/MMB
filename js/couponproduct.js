/**
 * Created by Dylan on 2017/7/13.
 */
$(function () {
    var couponid= getQueryString("couponid");
    var coupontitle=getRequest(coupontitle);
    coupontitle=coupontitle.coupontitle;
    getcouponpro(couponid);
    var index=0;
    $("#change").html(coupontitle+"优惠券");
    function getcouponpro(couponid) {
        $.ajax({
            url:"http://182.254.146.100:3000/api/getcouponproduct?couponid="+couponid,
            success:function (data) {
                var html=template("couproTemp",data);
                $("#couponProduct").html(html);
                for(var i=0;i<$("#couponProduct").find("a").length;i++){
                    $("#couponProduct").find("a")[i].index = i;
                    var div = document.createElement("div");
                    var img = $($("#couponProduct").find("a")[i].innerHTML)[0];
                    // console.log(img);
                    img.style.width="200px";
                    $(div).append(img);
                    $(".gallerySlider").append(div);
                    var num=  $(".gallerySlider>div").length;
                    console.log(num);
                    $($("#couponProduct").find("a")[i]).on("click",function(){
                        $(".gallerySlider").css("left","-"+this.index+"00%");
                        $("#galleryOverlay").addClass("visible").css("display","block");
                        var count=this.index;
                        $(".arrow>.left").on("click",function(){
                            if(count>0){
                                count--;
                            }

                            if(count>=0&&count<num){
                                $(".gallerySlider").css("left",-count+"00%");
                            }
                        });
                        $(".arrow>.right").on("click",function(){
                            count++;
                            if(count>=0&&count<num){
                                $(".gallerySlider").css("left",-count+"00%");
                            }
                        });

                    });
                    $(".gallerySlider").on("click",function () {
                        $("#galleryOverlay").removeClass("visible").css("display","none");
                    });
                    $(".left").on('click',function () {
                        $(this).css("opacity",0.8);
                        $(".right").css("opacity",0.3)
                    })
                    $(".right").on('click',function () {
                        $(this).css("opacity",0.8);
                        $(".left").css("opacity",0.3)
                    })

                }
            }


        });
        // var medias=$("#couponProduct").find("div");
        // console.log(medias.length);
        /*使用zepto实现轮播图*/




    }
    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }
    function getRequest(strs) {
        var url = window.location.search;
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for(var i = 0; i < strs.length; i ++) {
                theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }

});