/**
 * Created by Dylan on 2017/7/12.
 */
$(function () {
    var i = 0;
    var data1 = {};
    var resultLength = 0;
        $.ajax({
            url:"http://182.254.146.100:3000/api/getinlanddiscount",
            success:function (data) {
                data1 = data;
                var newdata={
                    "result":[]
                };
                for(i=0;i<4;i++){
                    newdata.result.push(data.result[i])
                }
                var html=template("inlandMainTemp",newdata)
                $("#inlandMain").html(html);
                resultLength = data.result.length;
            }
        });

    $(window).on("scroll",function () {
            if($(document).scrollTop()>=$(document).height()-$(window).height()){
                $.ajax({
                    url: "http://182.254.146.100:3000/api/getinlanddiscount",
                    success: function(data) {
                        var newData = {
                            "result": []
                        };
                        if (i >= resultLength) {
                            return;
                        }
                        for (var j = i; j < i + 4; j++) {
                            newData.result.push(data.result[j]);
                        }
                        var html = template("inlandMainTemp", newData);
                        $('#inlandMain').append(html);
                        height =$('#inlandMain').height()-$(document.body).height();
                        i = j;
                    }
                })
            }
        })
});