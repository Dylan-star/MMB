$(function () {

    getindexMenu();
    getindexRec();
    function getindexMenu() {
        $.ajax({
            url:"http://182.254.146.100:3000/api/getindexmenu",
            success:function (data) {
                var html=template("menuTemp",data);
                $("#menu").html(html);
                    $("#menu>.row>div:nth-last-child(-n+4)").css('display',"none");
                $("#menu>.row>div:nth-child(8)").on('click',function () {
                    $("#menu>.row>div:nth-last-child(-n+4)").toggle(200);
                });
            }
        });
    }
    function getindexRec() {
        $.ajax({
            url:"http://182.254.146.100:3000/api/getmoneyctrl",
            success:function (data) {
                var html=template("recTemp",data);
                $("#recProduct").html(html);
            }
        })
    }

   
});