/**
 * Created by Dylan on 2017/7/15.
 */
/**
 * Created by Dylan on 2017/7/12.
 */
$(function () {
    var productid=getQueryString("productid");
    getmoneyProduct (productid);
    function getmoneyProduct (productid) {
        $.ajax({
            url:"http://182.254.146.100:3000/api/getdiscountproduct?productid="+productid,
            success:function (data) {
                var html=template("disProductTemp",data);
                $("#disProduct").html(html);
                var html2=template("disComTemp",data);
                $(".newComment").html(html2)
            }
        })
    }
    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }
})