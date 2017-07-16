/**
 * Created by Dylan on 2017/7/12.
 */
$(function () {
    var pageid=getQueryString("pageid");
    getctrPro(pageid);
   function getctrPro(pageid) {
       $.ajax({
           url:"http://182.254.146.100:3000/api/getmoneyctrl",
           data:{
               "pageid":pageid||0
           },
           success:function (data) {
               var ctrpro=template("ctrTemp",data);
               $("#ctrProduct").html(ctrpro);
               var pageList=Math.ceil(data.totalCount/data.pagesize);
               var pageli="";
               for(var i=0;i<pageList;i++){
                   var url="moneyctrl.html?pageid="+i;
                   pageli+="<li><a href="+url+">"+(+i+1)+"/"+pageList+"</a></li>";
               }
               $(".dropdown-menu").html(pageli);
               $("#dLabel").html((+pageid+1)+"/"+pageList+'<span class="caret"></span>');
               if(pageid<=0){
                   $("#btPr").on("click",function () {
                       return false;
                   })
               }else if(pageid>=pageList){
                   $("#btNe").on("click",function () {
                       return false;
                   })
               }
               var prUrl="moneyctrl.html?pageid="+(pageid-1);
               var neUrl="moneyctrl.html?pageid="+(+pageid+1);
               $("#btPr").attr("href",prUrl);
               $("#btNe").attr("href",neUrl);

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