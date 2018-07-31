;(function ($) {
  "use strict";

  var _prefix = (function (temp) {
    //私有方法：闭包，在外面访问不到
    var aPrefix = ["webkit", "Moz", "o", "ms"];
    var props = "";
    for (var i in aPrefix) {
      props = aPrefix[i] + "Transition";
      if (temp.style[props] !== undefined) {
        return "-" + aPrefix[i].toLowerCase() + "-";
      }
    }
    return false;
  })(document.createElement(PageSwitch));

  // 构造函数
  var PageSwitch = (function () {

    function PageSwitch(element, options) {

      // 将用户配置的参数合并进来，{}为了配置不被用户完全影响
      this.settings = $.extend({}, $.fn.PageSwitch.defaults, options || {});

      //选择器返回的DOM元素
      this.element = element;

      //初始化
      this.init();
    }

    // 将方法封装到到对象的原型下
    PageSwitch.prototype = {
      init: function () {
        //公共方法
        //初始化插件
        var me = this;
        // 获取到dom元素
        me.selectors = me.settings.selectors;
        me.sections = me.element.find(me.selectors.sections);
        me.section = me.sections.find(me.selectors.section);

        me.direction = me.settings.direction == "vertical" ? true : false;
        me.pagesCount = me.pagesCount();
        me.index = (me.settings.index >= 0 && me.settings.index < me.pagesCount) ? me.settings.index : 0;

        me.canscroll = true;

        //横屏
        if (!me.direction || me.index) {
          me._initLayout();
        }

        me._initPaging();

        me._initEvent();

        me._autoPlay();
      },

      //说明：获取页面数量
      pagesCount: function () {
        return this.section.length;
      },

      //说明：获取滑动的宽度（横屏滑动）或高度（竖屏滑动）
      switchLength: function () {
        return this.direction == 1 ? this.element.height() : this.element.width();
      },

      //说明：上一页
      prve: function () {
        var me = this;
        if (me.index > 0) {
          me.index--;
        } else if (me.settings.loop) {
          me.index = me.pagesCount - 1;
        }
        me._scrollPage();
      },

      //说明：下一页
      next: function () {
        var me = this;
        if (me.index < me.pagesCount) {
          me.index++;
        } else if (me.settings.loop) {
          me.index = 0;
        }
        me._scrollPage();
      },

      _autoPlay: function () {
        var me = this;

        // 每秒轮循一次
        var t = setInterval(function() {
          me.index++;
          me._scrollPage();
        }, 1000);

        // 移入停止切换
        me.element.hover(function() {
          clearInterval(t);
        },function() {
          t = setInterval(function() {
            me.index++;
            me._scrollPage();
          }, 1000);
        });
      },

      //说明：页面布局
      _initLayout: function () {
        var me = this;

        console.log(me.section);
        if (!me.direction) {
          var width = (me.pagesCount * 100) + "%",
            cellWidth = (100 / me.pagesCount).toFixed(2) + "%";
          me.sections.width(width);
          me.section.width(cellWidth).css("float", "left");
        }
        if (me.index) {
          me._scrollPage(true);
        }

      },

      //说明：主要针对横屏情况进行页面布局
      _initPaging: function () {
        var me = this;
        var pagesClass = me.selectors.page.substring(1);
        me.activeClass = me.selectors.active.substring(1);

        var pageHtml = `<ul class=${pagesClass}>`;
        for (var i = 0; i < me.pagesCount; i++) {
          pageHtml += `<li></li>`;
        }
        pageHtml += "</ul>";
        me.element.append(pageHtml);
        var pages = me.element.find(me.selectors.page);
        me.pageItem = pages.find("li");
        me.pageItem.eq(me.index).addClass(me.activeClass);

        if (me.direction) {
          pages.addClass("vertical");
        } else {
          pages.addClass("horizontal");
        }
      },

      //说明：初始化插件事件
      _initEvent: function () {
        var me = this;

        //分页的click事件
        me.element.on("click", me.selectors.page + " li", function () {
          me.index = $(this).index();
          me._scrollPage();
        });

        //鼠标滚轮事件
        me.element.on("mousewheel DOMMouseScroll", function (e) {
          e.preventDefault();
          var delta = e.originalEvent.wheelDelta || -e.originalEvent.detail;
          if (me.canscroll) {
            if (delta > 0 && (me.index && !me.settings.loop || me.settings.loop)) {
              me.prve();
            } else if (delta < 0 && (me.index < (me.pagesCount - 1) && !me.settings.loop || me.settings.loop)) {
              me.next();
            }
          }
        });

        //键盘事件
        if (me.settings.keyboard) {
          $(window).keydown(function (e) {
            var keyCode = e.keyCode;
            if (keyCode == 37 || keyCode == 38) {
              me.prve();
            } else if (keyCode == 39 || keyCode == 40) {
              me.next();
            }
          });
        }

        //调整大小
        //为了不频繁调用resize的回调方法，做了延迟
        var resizeId;
        $(window).resize(function () {
          clearTimeout(resizeId);
          resizeId = setTimeout(function () {
            var currentLength = me.switchLength();
            var offset = me.settings.direction ? me.section.eq(me.index).offset().top : me.section.eq(me.index).offset().left;
            if (Math.abs(offset) > currentLength / 2 && me.index < (me.pagesCount - 1)) {
              me.index++;
            }
            if (me.index) {
              me._scrollPage();
            }
          }, 500);
        });

        //支持CSS3动画的浏览器，绑定transitionend事件(即在动画结束后调用起回调函数)
        if (_prefix) {
          me.sections.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend", function () {
            me.canscroll = true;
            if (me.settings.callback && $.type(me.settings.callback) === "function") {
              me.settings.callback();
            }
          })
        }
      },

      //滑动动画
      _scrollPage: function (init) {
        var me = this;
        var dest = me.section.eq(me.index).position();
        if (!dest) return;

        // 轮循到末张页面时，返回第一张
        if(me.index == 4){
          me.index == 0;
          me.sections.css({"left": "0%"});
        }

        me.canscroll = false;
        if (_prefix) {
          var translate = me.direction ? `translateY(-${dest.top}px)`:`translateX(-${dest.left}px)`;
          me.sections.css(_prefix + "transition", "all " + me.settings.duration + "ms " + me.settings.easing);
          me.sections.css(_prefix + "transform", translate);
        } else {
          var animateCss = me.direction ? {
            top: -dest.top
          } : {
            left: -dest.left
          };
          me.sections.animate(animateCss, me.settings.duration, function () {
            me.canscroll = true;
            if (me.settings.callback) {
              me.settings.callback();
            }
          });
        }
        if (me.settings.pagination && !init) {
          me.pageItem.eq(me.index).addClass(me.activeClass).siblings("li").removeClass(me.activeClass);
        }
      }
    };
    return PageSwitch;
  })();

  $.fn.PageSwitch = function (options) {
    //链式调用
    return this.each(function () {
      // 单例模式
      var me = $(this),
        instance = me.data("PageSwitch");
      // 实例不存在，则创建
      if (!instance) {
        me.data("PageSwitch", (instance = new PageSwitch(me, options)));
      }
      // 实例存在，则返回实例
      if ($.type(options) === "string") return instance[options]();
    });
  };

  //默认的配置参数
  $.fn.PageSwitch.defaults = {
    selectors: {//配置分页的class
      sections: ".sections",
      section: ".section",
      page: ".pages",
      active: ".active",
    },
    index: 0,                   //对应页面开始的索引值，默认为0
    easing: "ease",             //动画效果
    duration: 500,              //动画执行时间
    loop: false,                //是否循环播放
    pagination: true,           //是否分页
    keyboard: true,             //键盘控制
    direction: "vertical",      //横竖切换vertical,horizontal
    callback: ""                //回调函数
  };

  //实例化
  $(function () {
    $('[data-PageSwitch]').PageSwitch();
  });
})(jQuery);
