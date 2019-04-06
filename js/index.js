$(function($){
	var photoAlbum = {
		arr: [],
		layer:'',
		loadPhoto: function(){
			var i=1,
			arr = this.arr;					
			for(i;i<=28;i++){
				arr.push(`<div class='icon'><a href="" style="background-image:url('images/${i}.jpg')"></a></div>`);
			}
		},
		renderIcon: function(){
			var arr = this.arr,
			container = document.createElement('div');
			container.innerHTML = arr.join('');
			container.className = 'container';
			document.body.appendChild(container);
		},
		calculateIconSize: function(){
			var screenWidth = window.innerWidth;				
			console.log(screenWidth);
			$('a').height(screenWidth/4);
			$('a').addClass('a');
		},
		checkPhoto: function(){
			$('.icon').on('click',function(e){
				e.preventDefault();
				var photoUrl,
				photoWidth,
				photoHeight,
				iconPhotoUrl,
				photo = new Image(),
					// 创建遮罩层
					layer = document.createElement('div');

				// 获取icon图片的路径等下用作layer的背景图路径
				iconPhotoUrl = e.target.style.backgroundImage;
				$(layer).addClass('layer').css('backgroundImage',photoUrl);

				// 创建image对象以计算该横图还是竖图呈现
				photoUrl = iconPhotoUrl.split("(")[1].split(")")[0].split('"')[1].split('"')[0];
				photo.src = photoUrl;
				photoWidth = photo.width;
				photoHeight =  photo.height;

				// 判断图片高宽比
				if(photoHeight/photoWidth > 1.2){
					$(layer).css({
						'backgroundImage':iconPhotoUrl,
						'backgroundSize':`contain`,
						'backgroundRepeat':'no-repeat',
						'backgroundPosition':'center',
					});
				}else{
					$(layer).css({
						'backgroundImage':iconPhotoUrl,
						'backgroundSize':`100% auto`,
						'backgroundRepeat':'no-repeat',
						'backgroundPosition':'center',
					});
				};
				// document.body.appendChild(layer);
				$('.container').append($(layer));
				// 给layer绑定再点击收起来事件
				setTimeout(function(){
					$(layer).on('click',function(){
						$(this).remove();
					})
				},100)
			});
		},
		_init: function(){
			photoAlbum.loadPhoto();
			photoAlbum.renderIcon();
			photoAlbum.calculateIconSize();
			photoAlbum.checkPhoto();
		}
	};

	photoAlbum._init();
});
