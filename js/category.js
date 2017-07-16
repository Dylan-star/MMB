/**
 * Created by Dylan on 2017/7/9.
 */
$(function () {
    getindexTitle();
    // $(".classify > .panel-group > .panel-default > .panel-heading  >.panel-title> a").click();
    function getindexTitle() {
        $.ajax({
            url: "http://182.254.146.100:3000/api/getcategorytitle",
            success: function (data) {
                var html = template("clsTemp", data);
                $("#accordion").html(html);
                var categoryTitle = $(".classify > .panel-group > .panel-default > .panel-heading  >.panel-title> a");
                categoryTitle.on("click", function(e) {
                    var titleId = $(this).data("titleid");
                    $.ajax({
                        url:"http://182.254.146.100:3000/api/getcategory?titleid="+titleId,
                        success:function (data) {
                            var html=template("titTemp",data);
                            var panelBody= $(e.target).parent().parent().parent().find(".panel-collapse").find('.panel-body');
                            panelBody.html(html);
                        }
                    })
                    
                })
            }
        })
    }
})