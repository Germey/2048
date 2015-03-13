var board = new Array();
var score = 0;
var hasConflicted = new Array();
var winOnce = false;
$(document).ready(function(){
	//加载调用的方法
	prepareForMobile();
	newgame();
	hideDialog();
});

function hideDialog(){
	$(".dialog-success").css("display","none");
	$(".dialog-fail").css("display","none");
}

function prepareForMobile(){
	if(isPC()){
		gridContainerWidth = 500;
		cellSpace = 20;
		cellSideLength = 100;
	}
	$("#grid-container").css('width',gridContainerWidth-2*cellSpace);
	$("#grid-container").css('height',gridContainerWidth-2*cellSpace);
	$("#grid-container").css('padding',cellSpace);
	$("#grid-container").css('border-radius',0.02*gridContainerWidth);
	if(documentHeight*3/documentWidth>5){
		$('header').css('margin-top',cellSideLength);
	}
	$(".grid-cell").css("width",cellSideLength);
	$(".grid-cell").css("height",cellSideLength);
	$(".grid-cell").css("border-radius",0.02*cellSideLength);
}

function newgame(){
	//初始化棋盘
	init();
	//随机生成两个数字
	generateOneNumber();
	generateOneNumber();
	resetSocre();
}

function again(){
	newgame();
	hideDialog();
	resetSocre();
}

function conti(){
	hideDialog();
}

function init(){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			var gridCell = $("#grid-cell-"+i+"-"+j);
			gridCell.css("top",getPosTop(i,j));
			gridCell.css("left",getPosLeft(i,j));
		}
	}
	for(var i=0;i<4;i++){
		board[i] = new Array();
		hasConflicted[i] = new Array();
		for(var j=0;j<4;j++){
			board[i][j] = 0;
			hasConflicted[i][j] = false;
		}
	}
	winOnce = false;
	score = 0;
	updateBoardView();
}

function updateBoardView(){
	//移除class为number-cell的元素
	$(".number-cell").remove();
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			//append方法在元素的内部结尾添加代码
			$("#grid-container").append('<div class = "number-cell" id = "number-cell-'+i+'-'+j+'"></div>');
			//取得id为number-cell-i-j的元素
			var theNumberCell = $('#number-cell-'+i+"-"+j);
			
			if(board[i][j]==0){
				theNumberCell.css("width","0px");
				theNumberCell.css("height","0px");
				theNumberCell.css("top",getPosTop(i,j)+cellSideLength/2);
				theNumberCell.css("left",getPosLeft(i,j)+cellSideLength/2);
			}else{
				theNumberCell.css("width",cellSideLength+"px");
				theNumberCell.css("height",cellSideLength+"px");
				theNumberCell.css("top",getPosTop(i,j));
				theNumberCell.css("left",getPosLeft(i,j));
				theNumberCell.css("background-color",getNumberCellBgColor(board[i][j]));
				theNumberCell.css("color",getNumberCellFontColor(board[i][j]));
				theNumberCell.css("font-size",getNumberCellFontSize(board[i][j]));
				//改变元素的内部文本内容
				theNumberCell.text(board[i][j]);
			}
			
			hasConflicted[i][j] = false;
		}
	}
	$('.number-cell').css('line-height',cellSideLength+"px");
	
}

function generateOneNumber(){
	if(nospace(board)){
		return false;
	}
	//随机找到一个位置
	var randomX = parseInt(Math.floor(Math.random()*4));
	var randomY = parseInt(Math.floor(Math.random()*4));
	
	while(true){
		if(board[randomX][randomY]==0){
			//证明当前位置可用
			break;
		}
		var randomX = parseInt(Math.floor(Math.random()*4));
		var randomY = parseInt(Math.floor(Math.random()*4));
	}
	//随机生成一个数字
	var randomNumber = Math.random()<0.5?2:4;
	//显示随机数字
	board[randomX][randomY] = randomNumber;
	showNumberWithAnimation(randomX,randomY,randomNumber);
	
	return true;
}

$(document).keydown(function (event) {
  
  switch (event.keyCode) {
	case 37: //左
	  event.preventDefault();
      if(moveLeft()){
					setTimeout("generateOneNumber()",210);
					setTimeout("isGameover()",300);
					setTimeout("isWin()",300);
				}
      break;
    case 38: //上
	  event.preventDefault();
      if(moveUp()){
					setTimeout("generateOneNumber()",210);
					setTimeout("isGameover()",300);
					setTimeout("isWin()",300);
				}
      break;
    case 39: //右
	  event.preventDefault();
      if(moveRight()){
					setTimeout("generateOneNumber()",210);
					setTimeout("isGameover()",300);
					setTimeout("isWin()",300);
				}
      break;
	case 40: //下
	    event.preventDefault();
		if(moveDown()){
					setTimeout("generateOneNumber()",210);
					setTimeout("isGameover()",300);
					setTimeout("isWin()",300);
				}
      break;
    default:
      return; 
  }
});

document.addEventListener('touchstart',function(event){
	startx = event.touches[0].pageX;
	starty = event.touches[0].pageY;
});

document.addEventListener('touchmove',function(event){
	event.preventDefault();
});

document.addEventListener('touchend',function(event){
	endx = event.changedTouches[0].pageX;
	endy = event.changedTouches[0].pageY;
	
	var deltax = endx - startx;
	var deltay = endy - starty;
	
	if(Math.abs(deltax) <0.2*documentWidth&& Math.abs(deltay)<0.2*documentWidth){
		return;
	}
	
	if(Math.abs(deltax) >= Math.abs(deltay)){
		if(deltax > 0){
			//向右
			if(moveRight()){
					setTimeout("generateOneNumber()",210);
					setTimeout("isGameover()",300);
					setTimeout("isWin()",300);
				}
		}else{
			//向左
			if(moveLeft()){
					setTimeout("generateOneNumber()",210);
					setTimeout("isGameover()",300);
					setTimeout("isWin()",300);
				}
		}
	}else{
		if(deltay > 0){
			//向下
			if(moveDown()){
					setTimeout("generateOneNumber()",210);
					setTimeout("isGameover()",300);
					setTimeout("isWin()",300);
				}
		}else{
			//向上
			if(moveUp()){
					setTimeout("generateOneNumber()",210);
					setTimeout("isGameover()",300);
					setTimeout("isWin()",300);
				}
		}
	}
});

function isGameover(){
	if(nospace(board)&&nomove(board)){
		gameover();
	}
}

function isWin(){
	for(var j=0;j<4;j++){
		for(var i=1;i<4;i++){
			if(board[i][j]==2048){
				if(winOnce==false){
					win();
					winOnce=true;
				}
			}
		}
	}
	return false;
}

function win(){
	$(".dialog-success").css("display","block");
}

function gameover(){
	$(".dialog-fail").css("display","block");
}

function moveUp(){
	if(!canMoveUp(board)){
		return false;
	}
	for(var j=0;j<4;j++){
		for(var i=1;i<4;i++){
			if(board[i][j]!=0){
			//不等于0说明可能向右移动
				for(var k=0;k<i;k++){
					if(board[k][j]==0&&noUpBlock(i,j,k,board)){
						//可以移动
						showMoveAnimation(i,j,k,j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					}else if(board[k][j]==board[i][j]&&noUpBlock(i,j,k,board)&&!hasConflicted[k][j]){
						//可以移动
						//两数相加
						showMoveAnimation(i,j,k,j);
						board[k][j] += board[i][j];
						board[i][j] = 0;
						//加分
						score += board[k][j];
						setTimeout("changeScore(score)",310);
						hasConflicted[k][j] = true;
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}

function moveDown(){
	if(!canMoveDown(board)){
		return false;
	}
	for(var j=0;j<4;j++){
		for(var i=2;i>=0;i--){
			if(board[i][j]!=0){
			//不等于0说明可能向右移动
				for(var k=3;k>i;k--){
					if(board[k][j]==0&&noDownBlock(i,j,k,board)){
						//可以移动
						showMoveAnimation(i,j,k,j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					}else if(board[k][j]==board[i][j]&&noDownBlock(i,j,k,board)&&!hasConflicted[k][j]){
						//可以移动
						//两数相加
						showMoveAnimation(i,j,k,j);
						board[k][j] += board[i][j];
						board[i][j] = 0;
						//加分
						score += board[k][j];
						setTimeout("changeScore(score)",310);
						hasConflicted[k][j] = true;
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}

function moveRight(){
	if(!canMoveRight(board)){
		return false;
	}
	for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){
			if(board[i][j]!=0){
			//不等于0说明可能向右移动
				for(var k=3;k>j;k--){
					if(board[i][k]==0&&noRightBlock(i,j,k,board)){
						//可以移动
						showMoveAnimation(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					}else if(board[i][k]==board[i][j]&&noRightBlock(i,j,k,board)&&!hasConflicted[i][k]){
						//可以移动
						//两数相加
						showMoveAnimation(i,j,i,k);
						board[i][k] += board[i][j];
						board[i][j] = 0;
						//加分
						score += board[i][k];
						setTimeout("changeScore(score)",310);
						hasConflicted[i][k] = true;
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}

function moveLeft(){
	if(!canMoveLeft(board)){
		return false;
	}
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(board[i][j]!=0){
			//不等于0说明可能向左移动
				for(var k=0;k<j;k++){
					if(board[i][k]==0&&noLeftBlock(i,j,k,board)){
						//可以移动
						showMoveAnimation(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					}else if(board[i][k]==board[i][j]&&noLeftBlock(i,j,k,board)&&!hasConflicted[i][k]){
						//可以移动
						//两数相加
						showMoveAnimation(i,j,i,k);
						board[i][k] += board[i][j];
						board[i][j] = 0;
						//加分
						score += board[i][k];
						setTimeout("changeScore(score)",310);
						hasConflicted[i][k] = true;
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}

