$.fn.extend({"nav_fixed":function(){
    var $_this = $(this),
        /*获取文档绝对位置top*/
        $_this_top = $_this.offset().top,
        /*获取文档绝对位置left*/
        $_this_left = $_this.offset().left,
        /*记录下文外边框，以为后续通过-margin-top顶替导航栏*/
        $_this_next_marginTop = parseFloat($_this.next().css("margin-top")),
         /*记录元素当前占文档"宽高"*/
        $_this_Width = $_this.outerWidth(true);
        $_this_Height = $_this.outerHeight(true);
        /*记录当前滚动条高度*/
        $_this.css("position", "relative");
        $_this.css("top","0px");
        $_this[0].style.zIndex = "999";
        $(document).scroll(function() {
        /*判断当前滚动条位置*/
        Throttle(FixedJudge);
    });
    /*函数节流（防止滚动条或resize事件触发过快）*/
   function Throttle(fn){
        clearTimeout(fn.flag);
        fn.flag = setTimeout(fn,100); //适当调整节流延迟以防抖动
    }
    function FixedJudge(){
        _leftPosition = $(document).scrollLeft();
        _topPosition = $(document).scrollTop();
        if (_topPosition >= $_this_top){
            $_this.css("position", "fixed");
            /*若采用百分比定位则需要重新计算宽高(此时其属性均相对窗口)*/
            $_this.css("height",$_this_Height+"px");
            $_this.css("width",$_this_Width+"px");
            /*兼容有横向滚动条的网页*/
            $_this.css("left",$_this_left-_leftPosition + "px");
            /*通过下级元素margin-top的增加填充导航*/
            $_this.next().css("margin-top",$_this_Height + $_this_next_marginTop + "px");
        }else{
            $_this.css("left",$_this_left+"px");
            $_this.css("position", "relative");
            $_this.next().css("margin-top", $_this_next_marginTop + "px");
        }
    }
}});