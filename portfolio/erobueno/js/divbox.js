(function($){
	$.fn.divbox = function(opt,clickObj){
		var _cfg = {
			width: null, 
			height: null,
			skin: null,
			speed: 500,
			animate:  'default', // currently we are only support: default &  explore & scroll & none
			left: null,
			top: null,
			type: null,
			src: 'href',
			url: null,
			embed: null,
			scrollbar: 'auto',
			btn_closed: '#divbox_frame .closed',
			btn_prev: '#divbox_frame .prev',
			btn_next: '#divbox_frame .next',
			btn_number: '#divbox_frame .number',
			path: 'players/',
			full_drag_handle: false,
			resize_large_image: true,
			click_full_image: true,
			overlay: true,
			caption: true,
			caption_control: true,
			caption_number: false,
			event: 'click',
			container: document.body,
			download_able:['pdf','zip','gz','rar','doc','docx','xls','xslx','ppt','pptx','csv'],
			languages: {
				btn_close: 'Close',
				btn_next: 'Next',
				btn_prev: 'Prev',
				click_full_image: 'Click on here to view full image',
				error_not_youtube: 'This is not a youtube link',
				error_not_vimeo: 'This is not a vimeo link',
				error_cannot_load: "We can't load this page\nError: "
			},
			api:{
				start: null,
				beginLoad: null,
				afterLoad: null,
				closed: null
			}
			
		}
		if(opt) $.extend(_cfg,opt);
		
		var oMatch = this;
		var objArr = [];
		$(oMatch).each(function(i,o){
			objArr[i] = o;
		});
		function _run(index,init){
			var fn = {}
			fn.closed = function(){
				$('#divbox_frame').animate({
					'top': _click.top,
					'left': _click.left,
					width: '0px',
					height: '0px'
				},_cfg.speed,function(){
					$(this).remove();
					$('#divbox').remove();
					fn.toggleObj('body','show');
					if(typeof(_cfg.api.closed)=='function') _cfg.api.closed(this);
				});
			}
			
			fn.toggleObj = function(o,act){
				if(ie6){
					if(act=='show') $(o).find('embed,object,select').show();
					else $(o).find('embed,object,select').hide();
				}
			}
			
			fn.init = function(){
				if(typeof(_cfg.api.start)=='function') _cfg.api.start(obj);
				var requires  = '#divbox,#divbox_frame,#divbox_content,#divbox_ajax';
				$(requires).remove();
				$(_cfg.container).prepend('<div id="divbox"></div><div id="divbox_ajax"></div><div id="divbox_frame" class="'+(_cfg.skin?_cfg.skin:'divbox_default')+'"><div class="closed" title="'+_cfg.languages.btn_close+'"></div><div id="divbox_data"><div id="divbox_content"></div><div class="prev" title="'+_cfg.languages.btn_prev+'"></div><div class="caption"></div><div class="number">10/10</div><div class="next" title="'+_cfg.languages.btn_next+'"></div></div></div>');
				$(_cfg.btn_closed+','+_cfg.btn_next+','+_cfg.btn_prev+','+_cfg.btn_number).hide();
				if(_cfg.overlay){
					$('#divbox').css({
						'width': sizesystem[0]+'px',
						'height': sizesystem[1]+'px',
						'position':'absolute',
						'zIndex':'10001',
						'left':'0',
						'top':'0'
					}).click(function(){
						fn.closed();
					});
				}
				$('#divbox_frame').css({
					'position':'absolute',
					'top': _click.top,
					'left': _click.left,
					'zIndex':'10002',
					'width': 0,
					'height': 0
				});
				if(_cfg.animate != 'none') $('#divbox_frame').animate({
					width: 50, 
					height: 50,
					top: _cfg.top?sizesystem[3] +  _cfg.top: sizesystem[3] + Math.round(sizesystem[5]/2),
					left: _cfg.left?sizesystem[2] +_cfg.left:Math.round(sizesystem[4]/2) 
				});
				
				
			}
			fn.resizeWindow = function(resizeW){
				var sizesystem = pageSize(ie);
				$('#divbox').css({
					'width': sizesystem[0]+'px',
					'height': sizesystem[1]+'px'
				});
				var w = $(oFrame).outerWidth();
				var h = $(oFrame).outerHeight();
				$(oFrame).css({
					top: _cfg.top?sizesystem[3] +  _cfg.top: sizesystem[3] + Math.round((sizesystem[5] - h)/2),
					left:  _cfg.left?sizesystem[2] +_cfg.left:Math.round((sizesystem[4] - w)/2) 
				});
			}
			
			fn.resize = function(w,h){
				var sizesystem = pageSize(ie);
				$(oFrame).css({
					'width': w+'px',
					'height': h+'px',
					top: _cfg.top?sizesystem[3] +  _cfg.top: sizesystem[3] + Math.round((sizesystem[5] - h)/2),
					left:  _cfg.left?sizesystem[2] +_cfg.left:Math.round((sizesystem[4] - w)/2) 
				});
			}
			
			fn.animate = function(t,l,w,h,fncallback,fnclosed, caption){
				$('#divbox').unbind('click');
				$(document).unbind('keydown');
				$(_cfg.btn_closed+','+_cfg.btn_next+','+_cfg.btn_prev+','+_cfg.btn_number).hide();
				var _l =  _cfg.left?_cfg.left:l;
				var _w = _cfg.width?_cfg.width:w;
				var _t = _cfg.top?sizesystem[3] + _cfg.top:t;
				var _h = _cfg.height?_cfg.height:h;
				if(_cfg.animate == 'default'){
					$(oFrame).removeClass('white').animate({
						left: _l,
						width: _w
					},_cfg.speed).animate({
						top: _t, 
						height: _h
					},_cfg.speed,function(){  fn.main(t,l,w,h,fncallback,fnclosed, caption);});
				}else if(_cfg.animate == 'explore'){
					$(oFrame).removeClass('white').animate({
						left:_l,
						width:_w,
						top: _t, 
						height: _h
					},_cfg.speed,function(){ fn.main(t,l,w,h,fncallback,fnclosed, caption);});
				}else if(_cfg.animate == 'scroll'){
					$(oFrame).removeClass('white').animate({
						left: _l,
						top: _t
					},_cfg.speed).animate({
						width: _w
					},_cfg.speed).animate({
						height: _h
					},_cfg.speed,function(){ fn.main(t,l,w,h,fncallback,fnclosed, caption);});
				}else if(_cfg.animate == 'none'){
					$(oFrame).removeClass('white').css({
						left:_l,
						top: _t,
						width:_w,
						height: _h
					}).fadeIn(_cfg.speed,function(){ fn.main(t,l,w,h,fncallback,fnclosed, caption);})
				}
			}
			
			
			fn.main = function(t,l,w,h,fncallback,fnclosed, caption){
				fn.toggleObj('body');
				var oContent = $('#divbox_content');
				$('#divbox_data').css({width: w, height: h});
				oContent.closed = function(){ fn.closed();}
				oContent.resize = function(w,h){ fn.resize(w,h);}
				if(typeof(_cfg.api.beginLoad)=='function') _cfg.api.beginLoad(oContent);
				if(typeof(fncallback) == 'function') fncallback(oContent);
				if(typeof(_cfg.api.afterLoad) == 'function') _cfg.api.afterLoad(oContent);
			
				$(_cfg.btn_closed).show().click(function(){
					if(typeof(fnclosed) == 'function') fnclosed(oContent);
					fn.closed();
				});
				$('#divbox').bind('click',function(){
					if(typeof(fnclosed) == 'function') fnclosed(oContent);
					fn.closed();
				});
				
				$(oFrame).addClass('white');
				
				var c = $(oFrame).find('.caption');
					
				if(_cfg.caption != false && (caption != '' || _cfg.caption_control == true)){
					var cH = c.outerHeight(true);
					$(oFrame).animate({height: h + cH}).find('.caption').show();
					
					if(_cfg.caption_control == true){// caption control
						var btn_top = h + parseInt(c.css('padding-top')); // 12 = 1/2 height of button prev/next icon
						$(_cfg.btn_prev+','+_cfg.btn_next+','+_cfg.btn_number).css({top: btn_top}).show();
						if(index*1>0){
							$(_cfg.btn_prev).removeClass('prevDisabled').bind('click',function(){
								fn.prevItem(index);
							});
						}else{
							$(_cfg.btn_prev).addClass('prevDisabled').unbind('click');		
						}
						if(_cfg.caption_number){
							$(_cfg.btn_number).html((index*1+1)+'/'+total)
						}else{
							$(_cfg.btn_number).remove();
						}
						if(index*1<total - 1){
							$(_cfg.btn_next).removeClass('nextDisabled').bind('click',function(){
								fn.nextItem(index);
							});
						}else{
							$(_cfg.btn_next).addClass('nextDisabled').unbind('click');	
						}
					}else{ // have no caption control
						$(c).css({'padding-left': '5px', 'padding-right': '5px'});		
					}
					
				}
					
				
				
				$(document).bind('keydown',function(e) {
					var k = e?e.keyCode:event.keyCode;
					if(k == 27){
						if(typeof(fnclosed) == 'function') fnclosed($('#divbox_content'));
						fn.closed();
					}
					if(_cfg.caption != '' && _cfg.caption_control==true){
						if(k == 38 || k==39){ fn.nextItem(index); return false; }
						if(k == 37 || k==40){ fn.prevItem(index); return false; }
					}
				});
				
				try {
					var drag_handle = _cfg.caption == false?'#divbox_frame':'#divbox_frame .caption';
					$("#divbox_frame").draggable({ handle: $(drag_handle) }).css({ cursor: 'move' });
					if(!_cfg.full_drag_handle) $('#divbox_content').css({ cursor: 'pointer' });
				} catch(e) { /* requires jQuery UI draggables */ }
				
				$(window).bind('resize scroll',function(){
					fn.resizeWindow();
				});
			}
			fn.prevItem = function(index){
				if(index*1>0) _run(index*1 - 1);
			}
			
			fn.nextItem = function(index){
				if(index*1<total - 1) _run(index*1 + 1);
			}
			
			fn.parseType = function(src){
				if(typeof(_cfg.embed) == 'string') return 'embed';
				if(_cfg.type) return _cfg.type;
				if (src.match(/youtube\.com\/watch/i)){
					return 'youtube';
				}
				if (src.match(/vimeo\.com\/(\d+)/i)){
					return 'vimeo';
				}
				var aExt = src.split('.');
				var ext = aExt[aExt.length-1];
				return ext.toLowerCase();
			}
			
			fn.error = function(str){
				var imgW = 200;
				var imgH = 50;
				var top = sizesystem[3] + Math.round((sizesystem[5] - imgH)/2);
				var left = Math.round((sizesystem[4] - imgW)/2);
				_cfg.caption = false;
				fn.animate(top,left,imgW,imgH,function(o){
					$(o).html(str);							   
				});
			}
			fn.viewImage = function(src,caption){
				
				var Img = new Image();
				Img.onerror = function(){
					fn.error('This image cannot download!');
				}
				
				
				Img.onload = function(){
					$('#divbox_content').html('<img src="'+src+'" />').find('img').hide();
					//$('#divbox_content img').attr('src',src);
					var imgW = Img.width;
					var imgH = Img.height;
					imgW = fn.setwidth(imgW);

					imgH = fn.setheight(imgH);
					var zoom = 0;
					if(_cfg.resize_large_image){
						if(imgW >= sizesystem[4] - 100 || imgH >= sizesystem[5] - 100 || Img.width > imgW || Img.height > imgH){
							if(imgW >= sizesystem[4] - 100 ){
								imgW = sizesystem[4] - 100;
								imgH = Math.round(imgW*Img.height/Img.width);
							}
							if(imgH >= sizesystem[5] - 100){
								tH = sizesystem[5] - 100;
								imgW = Math.round(imgW*tH/imgH);
								imgH = tH;
							}
							if(_cfg.click_full_image) zoom = 1;
						}
					}
					
					var top = sizesystem[3] + Math.round((sizesystem[5] - imgH)/2);
					var left = Math.round((sizesystem[4] - imgW)/2);
					fn.animate(top,left,imgW,imgH,function(o){
						if(ie6 && ext == 'png'){
							$(o).find('img').wrap('<span style="display:inline-block;width: '+imgW+'px;height: '+imgH+'px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='+src+');"></span>');
						}else{
							$(o).find('img').css({'width': imgW,'height': imgH,'display':'block'}).fadeIn();
						}
						if(zoom) $(o).find('img').addClass('zoom').attr({'title': _cfg.languages.click_full_image}).click(function(){
							window.open(src,'wDivBox');
						});
					},false,caption)
					//IE 
					Img.onload=function(){};
				}
				
				Img.src = src;
				
			}
			fn.flashEmbedString = function(file,w,h,type){ // default type is FLV
				var flashvar = '&provider=video';
				var swf_file = type=='swf'? file : _cfg.path+'jwplayer.swf';
				if(type=='mp3') flashvar = '&provider=sound';
				var str = '<object id="player" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" name="player" width="'+w+'" height="'+h+'">';
				str += '<param name="movie" value="'+swf_file+'" />';
				str += '<param name="allowfullscreen" value="true" />';
				if(type!='swf') str += '<param name="flashvars" value="file='+file+'&autostart=true'+flashvar+'" />';
				str += '<embed  pluginspage="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" quality="high"';
					str += ' type="application/x-shockwave-flash"';
					str += ' id="player2"';
					str += ' name="player2"';
					str += ' src="'+swf_file+'" ';
					str += ' width="'+w+'" ';
					str += ' height="'+h+'"';
					str += ' allowfullscreen="true"';
					if(type!='swf') str += ' flashvars="file='+file+'&start=true&autostart=true'+flashvar+'" ';
				str += ' />';
				str += '</object>';
				return str;
				
			}
			fn.viewFLV = function(src,caption){
				var winW = fn.setwidth(400);
				var winH = fn.setheight(300);
				var top = sizesystem[3] + Math.round((sizesystem[5] - winH)/2);
				var left = Math.round((sizesystem[4] - winW)/2);
				var str = fn.flashEmbedString(obj.href,winW,winH,'flv');
				fn.animate(top,left,winW,winH,function(o){
					$(o).html(str);
				},false,caption);
			}
			fn.viewMP4 = function(src,caption){
				var winW = fn.setwidth(400);
				var winH = fn.setheight(300);
				var top = sizesystem[3] + Math.round((sizesystem[5] - winH)/2);
				var left = Math.round((sizesystem[4] - winW)/2);
				var str = fn.flashEmbedString(obj.href,winW,winH,'mp4');
				fn.animate(top,left,winW,winH,function(o){
					$(o).html(str);
				},false,caption);
			}
			fn.viewMP3 = function(src,caption){
				var winW = fn.setwidth(320);
				var winH = fn.setheight(80);
				var top = sizesystem[3] + Math.round((sizesystem[5] - winH)/2);
				var left = Math.round((sizesystem[4] - winW)/2);
				var str = fn.flashEmbedString(src,winW,winH,'mp3');
				fn.animate(top,left,winW,winH,function(o){
					$(o).html(str);
				},false,caption);
			}
			fn.viewMOV = function(src,caption){
				var winW = fn.setwidth(400);
				var winH = fn.setheight(300);
				var top = sizesystem[3] + Math.round((sizesystem[5] - winH)/2);
				var left = Math.round((sizesystem[4] - winW)/2);
				var str = '<embed id="movMeida" src="'+src+'" width="'+winW+'" height="'+winH+'" autoplay="true" controller="true" pluginspage="http://www.apple.com/quicktime/download/"></embed></object>';
				fn.animate(top,left,winW,winH,function(o){
					$(o).html(str);
				},function(){
					$('#movMeida').each(function(){
						try { this.Stop();   } catch(e) {}  // quicktime
						try { this.controls.stop(); } catch(e) {} // windows media player
						$(this).hide().remove(); 
					});
					fn.closed();
				},caption);
			}
			fn.viewWMV = function(src,caption){
				var winW = fn.setwidth(400);
				var winH = fn.setheight(300);
				var top = sizesystem[3] + Math.round((sizesystem[5] - winH)/2);
				var left = Math.round((sizesystem[4] - winW)/2);
				var str = '<embed id="wmwMedia" SendPlayStateChangeEvents="true" type="application/x-mplayer2" src="'+src+'" Showcontrols="true" autoStart="true" width="'+winW+'" height="'+winH+'"></embed>';
				fn.animate(top,left,winW,winH,function(o){
					$(o).html(str);
				},function(){
					$('#wmwMedia').each(function(){
						try { this.Stop();   } catch(e) {}  // quicktime
						try { this.controls.stop(); } catch(e) {} // windows media player
						$(this).hide().remove(); 
					});
					fn.closed();
				},caption);
			}
			fn.viewSWF = function(src,caption){
				var winW = fn.setwidth(400);
				var winH = fn.setheight(300);
				var top = sizesystem[3] + Math.round((sizesystem[5] - winH)/2);
				var left = Math.round((sizesystem[4] - winW)/2);
				var str = fn.flashEmbedString(src,winW,winH,'swf');
				fn.animate(top,left,winW,winH,function(o){
					$(o).html(str);
				},false,caption);
			}
			fn.viewElement = function(caption){
				var e = '#'+$(obj).attr('rel');
				var winW = fn.setwidth($(e).outerWidth());
				var winH = fn.setheight($(e).outerHeight());

				var top = sizesystem[3] + Math.round((sizesystem[5] - winH)/2);
				var left = Math.round((sizesystem[4] - winW)/2);
				fn.animate(top,left,winW,winH,function(o){
					$(o).html($(e).html());
					fn.toggleObj(o,'show');
					$(e).html('');
				},function(o){
					$(e).html($(o).html());
				},caption);
			}
			fn.viewAjax = function(src,caption){
				$.ajax({
					url: src,
					success:function(data){
						if(_cfg.width) $('#divbox_ajax').css({'width': _cfg.width});
						if(_cfg.height) $('#divbox_ajax').css({'height': _cfg.height});
						$('#divbox_ajax').html(data);
						var winW = fn.setwidth($('#divbox_ajax').outerWidth());
						var winH = fn.setheight($('#divbox_ajax').outerHeight());

						var top = sizesystem[3] + Math.round((sizesystem[5] - winH)/2);
						var left = Math.round((sizesystem[4] - winW)/2);
						fn.animate(top,left,winW,winH,function(o){
							$(o).html(data);
							
							$('#divbox_ajax').remove();
						},false,caption);
					} ,
					error: function(x,e){
						fn.error(_cfg.languages.error_cannot_load);
					}
				});
			}
			fn.viewDefault = function(src,caption){
				var winW = fn.setwidth(sizesystem[4]-100);
				var winH = fn.setheight(sizesystem[5]-100);
				var top = sizesystem[3] + Math.round((sizesystem[5] - winH)/2);
				var left = sizesystem[2] + Math.round((sizesystem[4] - winW)/2);
				fn.animate(top,left,winW,winH,function(o){
					$(o).html('<iframe src="'+src+'" width="'+winW+'" frameborder="0" scrolling="'+_cfg.scrollbar+'" height="'+winH+'"></iframe>');	
				},false,caption);
			}
			
			fn.viewEmbed = function(src,caption){
				var winW = fn.setwidth(400);
				var winH = fn.setheight(300);
				var top = sizesystem[3] + Math.round((sizesystem[5] - winH)/2);
				var left = Math.round((sizesystem[4] - winW)/2);
				fn.animate(top,left,winW,winH,function(o){
					var str = _cfg.embed;
					str = str.replace(/%w/ig,winW);
					str = str.replace(/%h/ig,winH);
					str = str.replace(/%src/ig,src);
					$(o).html(str);	
				},false,caption);
			}
			fn.viewYouTube = function(src,caption){
				if (!src.match(/youtube\.com\/watch/i)){
					alert(_cfg.languages.error_not_youtube);
					return false;
				}
				var vidId = src.split('v=')[1].split('&')[0];
				var vidSrc = "http://www.youtube.com/v/" + vidId + "&hl=en&fs=1&autoplay=1&rel=0";
				var winW = fn.setwidth(640);
				var winH = fn.setheight(385);
				var top = sizesystem[3] + Math.round((sizesystem[5] - winH)/2);
				var left = Math.round((sizesystem[4] - winW)/2);
				var str = '<object width="'+winW+'" height="'+winH+'"><param name="movie" value="'+vidSrc+'"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="'+vidSrc+'" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="'+winW+'" height="'+winH+'"></embed></object>';
				//var str = fn.flashEmbedString(src,winW,winH,'youtube');
				fn.animate(top,left,winW,winH,function(o){
					$(o).html(str);
				},false,caption);
			}
			
			
			fn.setwidth = function(w){
				return  _cfg.width?_cfg.width:w;	
			}
			
			fn.setheight = function(h){
				return _cfg.height?_cfg.height:h;	
			}
			var obj = clickObj?clickObj:objArr[index];
			var ie = navigator.appVersion.indexOf("MSIE") != -1;
			var ie6 = (ie && parseFloat(navigator.appVersion.split("MSIE")[1]) == 6)?true:false;
			var sizesystem = pageSize(ie);
			var total = $(oMatch).length;
			var _click = $(obj).offset();
			var src = _cfg.url?_cfg.url:$(obj).attr(_cfg.src).toString();
			var ext = fn.parseType(src);
			
			// Download able
			for(var i in _cfg.download_able) if(ext==_cfg.download_able[i]){
				return window.open(src);
			}
			
			//
			var caption = '';
			if(typeof(_cfg.caption)=='function'){
				caption = _cfg.caption(obj);
			}else if(_cfg.caption === true){
				caption = $(obj).attr('title');	
			}
			
			if(init) fn.init();
			$(_cfg.btn_prev).unbind('click');
			$(_cfg.btn_next).unbind('click');
			var oFrame = $('#divbox_frame');
			$(oFrame).find('.caption').hide().html(caption);
			
			switch(ext){
				case 'jpg':
				case 'jpeg':
				case 'gif':
				case 'png': fn.viewImage(src,caption);break;
				case 'flv':fn.viewFLV(src,caption);break;
				case 'wmv': fn.viewWMV(src,caption);break;
				case 'mov': fn.viewMOV(src,caption);break;
				case 'mp3': fn.viewMP3(src,caption);break;
				case 'mp4': fn.viewMP4(src,caption);break;
				case 'swf': fn.viewSWF(src,caption);break;
				case 'element': fn.viewElement(caption); break;
				case 'ajax': fn.viewAjax(src,caption); break;
				case 'youtube': fn.viewYouTube(src,caption); break;
				case 'vimeo': fn.viewVimeo(src,caption); break;
				case 'embed': fn.viewEmbed(src,caption);break;
				default: fn.viewDefault(src,caption);break;
			}	
			
			return false;
		}
		if(clickObj){
			//var index = 0;
			_run(0,true);
			return false;
		}
		$(oMatch).bind(_cfg.event,function(){
			var index = 0;
			for(var i in objArr) if(objArr[i] === this) index = i;
			_run(index,true);
			return false;
		});
		
		
	}
	
	$.divbox = function(clk, cfg){
		if(!cfg) cfg = {}
		cfg.caption_control = false;
		cfg.caption_number = false;
		if(typeof(clk) == 'string'){
			cfg.url = clk;
			var obj = $('body');
		}else{
			var obj = clk;
		}
		$(clk).divbox(cfg,obj);
		return false;
	}
	
	
	
	function pageSize(ie){
		var de = document.documentElement;
		var winW = window.innerWidth || self.innerWidth || (de&&de.clientWidth) || document.body.clientWidth;
		var winH = window.innerHeight || self.innerHeight || (de&&de.clientHeight) || document.body.clientHeight;
		var x = window.pageXOffset || self.pageXOffset || (de&&de.scrollLeft) || document.body.scrollLeft;
		var y = window.pageYOffset || self.pageYOffset || (de&&de.scrollTop) || document.body.scrollTop;
		var pW = window.innerWidth || document.body.scrollWidth || document.body.offsetWidth;
		var pH = window.innerHeight+window.scrollMaxY || document.body.scrollHeight || document.body.offsetHeight;
		var w = Math.max(winW,pW); 
		if(!ie && pH > winH ) w -= 18;
		var h = pH<winH?winH:pH;
		arrayPageSize = [w,h,x,y,winW,winH];
		return arrayPageSize;
	}
})(jQuery)