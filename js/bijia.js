/**
 * Created by Dylan on 2017/7/10.
 */
$(function () {
    $('#myTabs a').click(function (e) {
        e.preventDefault();
        $(this).tab('show')
    });
    var productid=getQueryString("productid");
    console.log(productid);
    getproductid();
    function getproductid() {
        $.ajax({
            url:"http://182.254.146.100:3000/api/getproduct?productid="+productid,
            success:function (data) {
                var detal=template("deTemp",data);
                $("#detail").html(detal);
                $("#bijiabuy").html(data.result[0].bjShop)
            }
        });
    }
    var categoryId=getQueryString("categoryid");
    getCategory(categoryId);
    function getCategory(categoryId) {
        $.ajax({
            url:"http://182.254.146.100:3000/api/getcategorybyid?categoryid="+categoryId,
            success:function (data) {
                $("#change").html(data.result[0].category+"&nbsp>")
            }
        })
    }
    getMessage();
    function getMessage() {
        $.ajax({
            url:"http://182.254.146.100:3000/api/getproductcom?productid="+productid,
            success:function (data) {
                var message=template("mesTemp",data);
                $("#messages").html(message)
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
    $("#change").on("click",function () {
        window.history.go(-1)
    })
});