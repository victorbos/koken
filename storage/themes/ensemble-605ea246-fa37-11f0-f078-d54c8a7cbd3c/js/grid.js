$(function(){var n=$K.lazy.load,i=$K.lazy.init,e=!1,o=$(".column").length,t=function(i){i&&n()},d=function(){$K.lazy.init(),setTimeout(function(){$K.lazy.load(!0)},100)},a=$("<div/>").css("width","100%").addClass("column condensed");$K.lazy.load=t,$K.lazy.init=i;var c=function(){e=!1,$("#wrapper > .item").each(function(n,i){var e=$(".column:eq("+n%o+")");$(i).appendTo(e),e.find(".item:last").clone().appendTo(a)}),$("#grid").hasClass("no-rebalance")||window.setTimeout(function(){var n,i;$(".column").each(function(e,o){(!n||$(o).outerHeight(!0)>n.outerHeight(!0))&&(n=$(o)),(!i||$(o).outerHeight(!0)<i.outerHeight(!0))&&(i=$(o))}),n.find(".item:last").css("display","none"),n.outerHeight(!0)!==i.outerHeight(!0)&&n.find(".item:last").appendTo(i),n.find(".item:last").css("display","block"),t(!0)},50)};$(window).off(".rjs").on("k-scroll.rjs",function(){return t(!0),e?!1:(($(document).scrollTop()+$("#grid").offset().top>$("#grid").offset().top+$("#grid").height()-3*$(window).height()||$(".k-lazy-loading").length<15)&&(e=!0,$K.infinity.next()),void 0)}),$K.infinity.check=$.noop;var l,s=function(){clearTimeout(l),!window.matchMedia||window.matchMedia("(min-width: 767px)").matches?($(".column").show(),$(".column.condensed").hide()):($(".column.condensed").length?$(".column.condensed").show():$(".column").parent().append(a),$('.column:not(".condensed")').hide()),d(),$K.responsiveImages()};$(window).on("k-infinite-loaded",c).trigger("k-infinite-loaded"),$(window).on("resize",function(){clearTimeout(l),l=window.setTimeout(s,200)}).trigger("resize"),d()});