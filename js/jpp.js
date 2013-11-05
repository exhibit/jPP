(function($,win,undefined){
	'use strict';
	var pName="Orz",
	defaults = {
			Style:true,
			setTheme:'red'
	},
	isIE6 = $.browser.msie && $.browser.version === '6.0',
	idx=0,
	Evts={
		add:function($e){
			var temp = this.temp || ( this.temp = "<b>:"+(idx++)+"</b>"); 
			if(temp){
				$(temp).appendTo($e).on('click',Evts.on)
			}
		},
		on:function(){
			alert(this.innerHTML)
		}
	};
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
					value && (data.opts['setTheme']=value);
					return data[options]();
				}
			});
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
			this.$e.attr('class',this.opts.setTheme);
			Evts.add(this.$e)
		}
	}
	$.fn.log = function (msg) {win.console && console.log && win.console.log("%s: %o", msg||'$', this,this.length);return this;};
})(jQuery,window);