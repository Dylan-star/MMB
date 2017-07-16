/**
 * Created by Dylan on 2017/7/10.
 */
$(function () {
    var pageId=getQueryString("pageid");
    var categoryId=getQueryString("categoryid");
    getCategory(categoryId);
    getProduct(categoryId,pageId);
    function getCategory(categoryId) {
        $.ajax({
            url:"http://182.254.146.100:3000/api/getcategorybyid?categoryid="+categoryId,
            success:function (data) {
                $("#change").html(data.result[0].category)
            }
        })
    }
    function getProduct(categoryId,pageid) {
        $.ajax({
            url:"http://182.254.146.100:3000/api/getproductlist",
            data:{"categoryid":categoryId,
                "pageid":pageid||1
            },
            success:function (data) {
                var pageList=Math.ceil(data.totalCount/data.pagesize);
                var pageli="";
                for(var i=0;i<pageList;i++){
                   var url="productlist.html?categoryid="+categoryId+"&pageid="+(i+1);
                    pageli+="<li><a href="+url+">"+(i+1)+"/"+pageList+"</a></li>";
                }
                if(pageList<=0){
                    $("#dLabel").html(0+"/"+pageList+'<span class="caret"></span>');
                }else{
                    $("#dLabel").html(pageId+"/"+pageList+'<span class="caret"></span>');
                }
                if(pageId<=1){
                    $("#btPr").on("click",function () {
                        return false;
                    })
                }else if(pageId>=pageList){
                    $("#btNe").on("click",function () {
                        return false;
                    })
                }
                var prUrl="productlist.html?categoryid="+categoryId+"&pageid="+(pageId-1);
                var neUrl="productlist.html?categoryid="+categoryId+"&pageid="+(+pageId+1);
                $("#btPr").attr("href",prUrl);
                $("#btNe").attr("href",neUrl);
                $(".dropdown-menu").html(pageli);
                var html=template("proTemp",data);
                $("#product").html(html);
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
       
});