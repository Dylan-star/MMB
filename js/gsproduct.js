/**
 * Created by Dylan on 2017/7/14.
 */
$(function () {

    var shopid=0;
    var areaid=0;
    var shopname="";
    var areaname="";
    getgsPro(0,0);
    $(".shop").on('click',function () {
        $.ajax({
            url:"http://182.254.146.100:3000/api/getgsshop",
            success:function (data) {
                var html=template('getshopTemp',data);
                $(".gsContent").html(html);
                $(".gsContent").show();
                // if($(".gsContent").css("display")=="none"){
                //     $(".gsContent").show();
                // }else{
                //     $(".gsContent").hide();
                // }
                $(".gsContent").find("a").on('click',function () {
                    shopid=$(this).attr('data-shopId');
                    // areaid=$(this).attr('data-areaId');
                    console.log("店铺"+shopid);
                    getgsPro(shopid,areaid);
                    shopname=$(this).html();
                    console.log("地区"+areaid);
                    console.log(shopname);
                    $(".shop").html(shopname+"<img src='images/arrow1.gif'>")
                    $(".gsContent").hide();
                })
            }
        })
    });
    $(".area").on('click',function () {
        $.ajax({
            url:"http://182.254.146.100:3000/api/getgsshoparea",
            success:function (data) {
                var html=template('getshopareaTemp',data);
                $(".gsContent").html(html);
                $(".gsContent").show();
                // if($(".gsContent").css("display")=="none"){
                //     $(".gsContent").show();
                // }else{
                //     $(".gsContent").hide();
                // }
                $(".gsContent").find("a").on('click',function () {
                    areaid=$(this).attr('data-areaId');
                    // console.log(areaid);
                    console.log("店铺"+shopid);
                    console.log("地区"+areaid);
                    getgsPro(shopid,areaid);
                    areaname=$(this).html();
                    console.log(areaname);
                    $(".area").html(areaname.slice(0,2)+"<img src='images/arrow1.gif'>")
                    $(".gsContent").hide();
                })
            }
        })
    });
    $(".price").on('click',function () {
        $(".gsContent").html('<li><a href="#">全部价格</a></li>');
            $(".gsContent").show();
        $(".gsContent").find("a").on('click',function () {
            $(".gsContent").hide();
        })
    });
    getgsPro(shopid,areaid);
    function getgsPro(shopid,areaid) {
        $.ajax({
            url:"http://182.254.146.100:3000/api/getgsproduct?shopid="+shopid+"&areaid="+areaid,
            success:function (data) {
                var html=template("gsMainTemp",data);
                $(".gsMain").html(html)
            }
        })
    }



});