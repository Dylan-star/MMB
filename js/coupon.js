/**
 * Created by Dylan on 2017/7/13.
 */
$(function () {
    getCoupon();
    function getCoupon() {
        $.ajax({
            url:"http://182.254.146.100:3000/api/getcoupon",
            success:function (data) {
                var html=template("yoouhuiquanTemp",data);
                $(".youhuiquan").html(html);
            }
        })
    }
    // function getCouponProduct() {
    //     $.ajax({
    //         url:"http://182.254.146.100:3000/api/getcouponproduct?couponid="+couponid,
    //         success:function (data) {
    //            
    //         }
    //     })
    // }
});