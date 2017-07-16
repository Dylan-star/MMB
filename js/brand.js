/**
 * Created by Dylan on 2017/7/14.
 */
$(function () {
    var brandtitleid=getQueryString("brandtitleid");
    var brandtitle=getString("brandtitle");
    getpro(brandtitleid);
    console.log(brandtitle);
    getbrand(brandtitleid);
    function getbrand(brandtitleid) {
        $.ajax({
            url:"http://182.254.146.100:3000/api/getbrand?brandtitleid="+brandtitleid,
            success:function (data) {
                var html=template("brandTemp",data);
                $(".brandcontentClassify").html(html);
                $(".title").html(brandtitle.replace('十大品牌','')+"哪个牌子好");
                $(".proPaihang").html(brandtitle.replace('十大品牌','')+"产品销量排行");
                $(".newMes").html(brandtitle.replace('十大品牌','')+"最新评论");
                var as=$(".brandcontentClassify").find("a");
                console.log(as.attr("data-brandid"));
                var chazhi=as.attr("data-brandid")-1;
                console.log(chazhi);
                var spans=document.getElementsByClassName("paimin");
                console.log(spans);
                for(var i=0;i<spans.length;i++){
                    var brandid=as[i].attributes["data-brandid"].nodeValue;
                    var paimin=brandid-chazhi;
                    console.log(paimin);
                    spans[i].innerHTML=paimin;
                    spans[0].style.backgroundColor="#F10E0E";
                    spans[1].style.backgroundColor="#FF9314";
                    spans[2].style.backgroundColor="#8ADF5B";
                }
            }
        });
    }
    function getpro(brandtitleid) {
        $.ajax({
            url:"http://182.254.146.100:3000/api/getbrandproductlist?brandtitleid="+brandtitleid+"&pagesize=4",
            success:function (data) {
                var html=template("proTemp",data);
               $("#recProduct").html(html);
                getCom(data.result[0]);
            }
        })
    }
function getCom(product) {
    // console.log(product);
    $.ajax({
        url:"http://182.254.146.100:3000/api/getproductcom?productid="+product.productId,
        success:function (data) {
            data={
                "productImg":product.productImg,
                "productName":product.productName,
                "result":data.result
            };
            console.log(data);
            var html=template("comTemp",data);
            $("#proMes").html(html);

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

    function getString(key){
        var reg = new RegExp("(^|&)"+key+"=([^&]*)(&|$)");
        var result = window.location.search.substr(1).match(reg);
        return result?decodeURIComponent(result[2]):null;
    }
});



