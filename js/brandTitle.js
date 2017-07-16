/**
 * Created by Dylan on 2017/7/14.
 */
$(function () {
    getbrandTitle();
    function getbrandTitle() {
        $.ajax({
            url:"http://182.254.146.100:3000/api/getbrandtitle",
            success:function (data) {
                var html=template("brandtitleTemp",data);
                $(".brandClassify").html(html)
            }
        })
    }
});