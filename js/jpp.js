(function($,win,undefined){
	'use strict';
	var pName="Orz",
	defaults = {
			Style:true,
			theme:'red'
	},
	isIE6 = $.browser.msie && $.browser.version === '6.0',sav;
	defaults.Style && $(function(){$("head").append("<style plugin="+pName+">.red{background:red;border:5px solid black}.blue{background:blue;border:5px solid orange}.pink{background:pink;border:5px solid yellow;}</style>")});
	$.fn[pName]=function(options,value){
		if(typeof options === 'object' || !arguments.length){
			var opts= $.extend(defaults,options);
			return this.each(function(){
				if (!$.data(this,'plugin-' + pName)){//this --> html元素
						$.extend(opts,{TOP:$(this).offset()['top']});//$(this) --> jquery对象
						$.data(this,'plugin-' + pName,new Plugin($(this),opts));
				}
			});
		}else if(typeof options === 'string' && options != 'init'){
			return this.each(function(){
				var data=$.data(this,'plugin-' + pName);
				if(data && data[options]){
					value && (data.opts[options]=value);
					return data[options]();
				}
			});
		}
	};
	sav = $.fn[pName];
	$.fn[pName].noConflict = function () {
		$.fn[pName] = sav
		return this;
	}
	var Evts={
		create:function(){
			return $.trim(document.getElementById("tmp").value);
		},
		check:function(e){
			//	isIE6 ? function(){alert("ie6")}:function(){alert("no")}
			return {
				'ie':function(e){
					alert(e.type + '--ie--');
					$(this).remove();
				},
				'w3c':function(e){
					alert(e.type + '--w3c--');
					$(this).remove();
				}
			}['\v'=='v' ? 'ie' : 'w3c']
		}
	};
	function Plugin($this,opts){
		this.$e = $this;
		this.opts=opts;
		this.init(opts);
	};
	Plugin.prototype={
		//constructor:Plugin,
		init:function(opts){
			this.$e.html(this.opts.TOP)
			this.theme(opts.theme);
		},
		hide:function(){
			this.$e.css('display','none')
		},
		show:function(){
			this.$e.css('display','block')
		},
		theme:function(){
			this.$e.attr('class',this.opts.theme);
		},
		add:function(){
			var temp = this.temp || (this.temp=Evts.create());
			$(temp).appendTo(this.$e).on('click',Evts.check())
		},
		pos:function(){
			var left = null, top = null, right = null, bottom = null;
			var w = $("#test").outerWidth(true),h = $("#test").outerHeight(true);
			var W = $(win).width(),H = $(win).height();
			var offset=10;
			var cX = (W/2) - (w/2),cY = (H/2) - (h/2);
			var rX = W - w - offset,bY = H - h - offset;
			switch("rm"){
				case 'cm': left = cX;top = cY;break;
				case 'lt': left = offset;top = offset;break;
				case 'ct': left = cX;top = offset;break;
				case 'rt': left = rX;top = offset;break;
				case 'rm': left = rX;top = cY;break;
				case 'rb': left = rX;top = bY;break;
				case 'cb': left = cX;top = bY;break;
				case 'lb': left = offset;top = bY;break;
				case 'lm': left = offset;top = cY;break;
     		}
     		$("#test").show().css({left:(left ? left + 'px' : 'auto'), top:(top ? top + 'px' : 'auto'), bottom:(bottom ? bottom + 'px' : 'auto'), right: (right ? right + 'px' : 'auto') });

		},
		destroy:function(){
			$.data(this.$e[0],'plugin-' + pName,null);
			$.removeData(this.$e[0],'plugin-' + pName);
		}
	}

	$.fn.log = function (msg) {win.console && console.log && win.console.log("%s: %o", msg||'$', this,this.length);return this;};
})(jQuery,window);
