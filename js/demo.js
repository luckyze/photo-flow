 // areaDom  图片容器
 // urls     图片的url地址数组
 // everyWidth  每张图片的宽度

//图片异步加载问题
//当图片设置了src属性之后,不会同步完成图片加载,而是异步(不影响当前代码执行)
//图片中有onload事件,该事件是图片记载完成之后触发
 
 var div = document.getElementById("water");
			
			//包含图片路径的图片数组
			var imgs = [];
			for(var i = 0 ; i<= 21 ; i++){
				imgs.push("./img/" + "img"+i + ".jpg");
			}
			creatWaterFall(div , imgs , 220);
 
 function creatWaterFall(areaDom ,urls , everyWidth){
	 //列数
	 var colNumber;
	 //每列之间的间隙
	 var gap;
	 //1创建图片
	  createImgDoms();
	  //2设置图片坐标
	  setImgPosition();
	//窗口改变事件
	var timer = null;
	window.onresize = function(){
		if(timer){
			clearInterval(timer);
		}
		timer = setTimeout(function() {
			setImgPosition();
		}, 300);
		
		//窗口发生改变时   重新布局
	}
	
	//函数区
	
	//计算列数
	function col(){
		var containerWidth = parseInt(areaDom.clientWidth);
		// console.log(containerWidth);
		colNumber = Math.floor(containerWidth / everyWidth) ;
		var space = containerWidth - colNumber * everyWidth;
		gap = space / (colNumber + 1);
	}
	
	
	//创建函数的dom对象
	function createImgDoms(){
		for(var i = 0 ; i< urls.length;i++){
			var url = urls[i];
			var img = document.createElement("img");
			img.src = url;
			img.style.width = everyWidth + "px";
			img.style.position = "absolute";
			img.onload = function (){
				setImgPosition();
			}
			areaDom.appendChild(img);
		}
	}

    //设置每张图片的坐标
    function setImgPosition() {
		//有多少列
		col();
		//存放每一列下一张图片的Y坐标
		var colY = new Array(colNumber);
		colY.fill(0);//将数组每一列填充为0
		// console.log(colY);
		
		for(var i = 0 ; i <areaDom.children.length; i++){
			var img = areaDom.children[i];
			//找到数组colY中的最小值
			var y = Math.min(...colY);  //y坐标
			//x坐标
			var index = colY.indexOf(y)
			var x = (index + 1) * gap + index * everyWidth;
			img.style.left = x + "px";
			img.style.top = y + "px";
			
			//更新数组
			colY[index] += parseInt(img.height) + gap;
		}
		
		//找到数组中最大的数字
		var height = Math.max(...colY);
		areaDom.style.height = height + "px";
	}
	
 }