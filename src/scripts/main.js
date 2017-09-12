/*
* @Author: Wanglj
* @Date:   2017-08-28 11:48:37
* @Last Modified by:   Wanglj
* @Last Modified time: 2017-09-06 17:45:11
*/

'use strict';
var common={
    tooltip:function(){
        var DOM=[],CreateDOM=[],tooltip=null;
        var timer=null;
        $(document).delegate("[data-tooltip]","mouseenter",function(e){
            e.stopPropagation();
            e.preventDefault();
            var randomNum=new Date().getTime()+Math.floor(5*Math.random()+100);
            var $this=$(this);
            var dataNum=$this.data("id");
            var direction=null,content=null,dom=null;

            if($.inArray(dataNum,DOM)!=-1){
                return;
            }
            $this.data("id",randomNum);
            DOM.push(randomNum);
            direction=$this.attr("data-arrow-direction")||"bottom";
            content=$this.attr("data-tooltip")||"大道易图";
            dom=$("<div><div class='dadao_tooltip dadao_tooltip_placement_"+direction+"'><div class='dadao_tooltip_content'><div class='dadao_tooltip_arrow'></div><div class='dadao_tooltip_inner'><span>"+content+"</span></div></div></div></div>");
            var left=$this.offset().left,
                top=$this.offset().top,
                height=$this.height(),
                width=$this.width();
            var halftop=Math.ceil(height/4);
            tooltip=dom.find(".dadao_tooltip");
            if(direction=="right"){
                dom.find(".dadao_tooltip").css({
                    left:left+width,
                    top:top+halftop
                });
                tooltip.addClass("antZoomIn");
            }
            if(direction=="bottom"){
                dom.find(".dadao_tooltip").css({
                    left:left,
                    top:top+height
                });
            }

            $("body").append(dom);
            tooltip.get(0).addEventListener("animationend",function(){
                tooltip.removeClass("antZoomIn");
            },false);
            CreateDOM.push({
                id:randomNum,
                dom:dom
            });
        });
        $(document).delegate("[data-tooltip]","mouseleave",function(e){
            e.stopPropagation();
            e.preventDefault();
            var $this=$(this),
            id=$this.data("id"),
            domEle=null,
            tamp=null;
            $.each(CreateDOM,function(idx,item){
                if(id==item["id"]){
                    domEle=item.dom;
                    setTimeout(function(){
                        domEle.remove();
                    },300);
                    domEle.find(".dadao_tooltip").addClass("antZoomOut");
                    domEle.get(0).addEventListener("animationend",function(){
                        domEle.remove();
                    },false);
                    tamp=DOM.indexOf(id);
                    DOM.splice(tamp,1);
                }
            });
        });
    },
    //左下角头像按钮
    hoverHeaderPic:function(){
        var box=$("#setting_me"),
        winHeight=$(window).height(),
        oEle=box.find(".tick"),
        left=box.offset().left,
        width=box.width(),
        height=oEle.height(),
        dom=null,
        isopen=false,
        children=null,
        bottom=winHeight-box.offset().top-height;
        oEle.on("click",function(evt){
            evt.stopPropagation();
            var html=box.find(".ui_user_panel").clone().show();
            if(isopen){
                children.addClass("antZoomOut");
                children.get(0).addEventListener&&children.get(0).addEventListener("animationend",function(){
                    children.removeClass("antZoomOut");
                    dom.remove();
                    isopen=false;
                });
                setTimeout(function(){
                    dom.remove();
                    isopen=false;
                },300);
            }else{
                dom=$("<div><div style='position:fixed;z-index:1000;left:"+(left+width+2)+"px;bottom:"+bottom+"px;transform-origin:0 100%;-webkit-transform-origin:0 100%;-moz-transform-origin:0 100%;-ms-transform-origin:0 100%;'></div></div>").appendTo($("body"));
                children=dom.children();
                children.append(html);
                children.addClass("antZoomIn");
                children.get(0).addEventListener&&children.get(0).addEventListener("animationend",function(){
                    children.removeClass("antZoomIn");
                });
                isopen=true;
            }
        });
        $(document).on("click",function(){
            if(isopen){
                oEle.trigger("click");
            }
        });
    },
    //switch开头效果
    inputSwitch:function(opt){
        $(document).delegate('[data-toggle="switch"]',"click",function(){
            var isSelected=$(this).is(".dadao_switch_checked");
            if(isSelected){
                $(this).removeClass("dadao_switch_checked");
                opt&&opt.off&&opt.off($(this));
            }else{
                $(this).addClass("dadao_switch_checked");
                opt&&opt.on&&opt.on($(this));
            }
        });
    }
}