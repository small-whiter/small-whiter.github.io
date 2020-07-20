// 页面加载时
window.onload = function(){
	giveNumber(2);
	newGameBotton();
	getReady();
	backgroundColorToNumber();
	scaleWidth();
	touch();
}

// 移动端是的格子宽高为1:1
function scaleWidth(){
	// 获取格子的宽度
	var grid = document.getElementsByClassName("grid")
	width = window.getComputedStyle(grid[0],null)["width"];
	// 给格子高度赋值
	for (var i = 0 ; i<16; i++){
		grid[i].style.height = width;
	}
}
function createTempGrid(num){
	var temp = document.createElement("div");
	temp.innerHTML = "<span>"+ num +"</span>";
	temp.style.position = "absolute";
	temp.style.backgroundColor = "#fff8dc";
	temp.style.width = '87.5px';
	temp.style.height = '87.5px';
	temp.style.lineHeight = "87.5px";
	temp.style.fontWeight = "bold";
	temp.style.fontSize = "48px";
	temp.style.borderRadius = "5px";
	temp.style.top = "0";
	temp.style.left = "0";
	temp.classList.add("temp.grid");
	return temp;
}

// 删除临时的格子
function deleteTempGrid(){
	var temp = document.getElementsByClassName("temp.grid");
	for (var i = 0; i< temp.length; i++){
		temp[i].remove();
	}
	var newGrid = document.getElementsByClassName("new-grid");
	if (newGrid){
		for (var i = 0; i<newGrid.length; i++){
			newGrid[i].classList.remove("new-grid")
		}
	}
}
// giveNumber随机生成一个空格子，每个空格子中放一个数字num
function giveNumber(num){
	// console.log('give!!!')
	var x,y, newGrid, tempGrid;
	tempGrid = createTempGrid(num);
	while(true){
		x = Math.floor(Math.random()*4)+1;
		y = Math.floor(Math.random()*4)+1;
		newGrid = document.getElementsByClassName("grid-" + x + y)[0];
		if (newGrid.innerHTML == "<span></span>"){
			newGrid.classList.add('new-grid');
			newGrid.innerHTML = "<span>"+ num +"</span>";//为什么要加span给newGrid,tempGrid里面有了
			// alert(newGrid.innerHTML);
			newGrid.appendChild(tempGrid);
			// alert(newGrid.innerHTML);
			break;
			}
	}
}
// clearGrid:清空格子及分数归零
function clearGrid() {
	var grid = document.getElementsByClassName("grid"),
		score = document.getElementsByClassName("score")[0].children[2];
	score.innerText = "0";
	for (var i = 0; i< grid.length; i++){
		grid[i].innerHTML = "<span></span>";

	}
	backgroundColorToNumber();
}
// 重新开始一次游戏
function newGame(){
	clearGrid();
	giveNumber(2);
	backgroundColorToNumber();
	return true;
}
// 触发一次新的按钮
function newGameBotton(){
	var newGameBtn = document.getElementsByClassName("new-game")[0];
	newGameBtn.addEventListener("click",function(){
		newGame();
	},false);
}
// backgroundColorToNumber：数字大小和背景颜色相对应
function backgroundColorToNumber(){
	var gridNum,grid =document.getElementsByClassName("grid");
	for (var i = 0; i<grid.length ; i++){
		gridNum = getGridNum(grid[i]);
		grid[i].style.fontSize = '48px';
			switch(gridNum){
				case 2:
					grid[i].style.backgroundColor = "rgb(255,248,220)";
					fontSize = "100px";
					// grid[i].children[0].style.Color = "#fff8dc";代码会使网页瘫痪，可查原因。

					break;
				case 4:
					grid[i].style.backgroundColor = "#e9967a";
					break;
				case 8:
					grid[i].style.backgroundColor = "#ffa07a";
					break;
				case 16:
					grid[i].style.backgroundColor = "#f4a460";
					break;
				case 32:
					grid[i].style.backgroundColor = "#fa8072";
					break;
				case 64:
					grid[i].style.backgroundColor = "#ff7f50";
					break;
				case 128:
					grid[i].style.backgroundColor = "#ff6347";
					grid[i].style.fontSize='40px';
					break;
				case 256:
					grid[i].style.backgroundColor = "#ff8800";
					grid[i].style.fontSize='40px';
					break;
				case 512:
					grid[i].style.backgroundColor = "#ff6600";
					grid[i].style.fontSize='40px';
					break;
				case 1024:
					grid[i].style.backgroundColor = "#F53";
					grid[i].style.fontSize='32px';
					break;
				case 2048:
					grid[i].style.backgroundColor = "#f40";
					grid[i].style.fontSize='32px';
					break;
				default:
					grid[i].style.backgroundColor = "#b0c4de";
			}
	}
}
// 游戏主入口
function getReady(){
	window.onkeydown = function(e){
		deleteTempGrid();
		keyDown(e.keyCode);

	}
}
// getGridNum(ele):传入div元素，返回格子里面的数字
function getGridNum(ele){
	return parseInt(ele.children[0].innerText)
}
// 各个方向的prevGrid,即所对应方向的前一个格子
function getPrevGrid(ele,direction){
	var preEle,count = 0;
	if (direction == "left"){
		return ele.previousElementSibling || null;
	}else if (direction == "right") {
		return ele.nextElementSibling || null;
	}else if (direction == 'up') {
		for (var i = 0 ; i< 4 ; i++){
			ele = ele.previousElementSibling;
			if (!ele){
				return null;
			}
		}
		return ele;
	}else if (direction == 'down'){
		for (var i = 0; i<4; i++){
			ele = ele.nextElementSibling;
			if(!ele){
				return null;
			}
		}
		return ele;
	}
}
// 滑块移动
// 桌面版通过监听方向键来控制滑块的移动
function keyDown(keyCode){
	var dir,arr,go,count= 0, signal = 0;
	switch (keyCode){
		case 37:
			dir = "left";
			break;
		case 38:
			dir = "up";
			break;
		case 39:
			dir = "right";
			break;
		case 40:
			dir = "down";
			break;
	}
	for (var i=1;i < 5;i++){
		if (dir =='up'||dir =="down"){
			arr = document.getElementsByClassName("col"+i);
		}else if (dir == "left"|| dir =="right") {
			arr = document.getElementsByClassName('row'+i);
		}
		if (dir == 'up' || dir =="left") {
			for (var j = 1; j<=3 ; j++){
				max = j;
				go = howToGo(arr[j],dir,max);
				signal +=go;
				if (go > 1){
					count += go; //累计每一次运动的得分
				}
			}
		}else if( dir == "down" || dir == "right"){
			for (var j=2; j >= 0; j-- ){
				max = 3 - j;
				go = howToGo(arr[j],dir,max);
				signal += go;
				if (go > 1){
					count += go;
				}
			}
		}
	}
	// 格子有运动signal>0
	if (signal > 0){
		giveNumber(2);
		backgroundColorToNumber();
		testGameOver();
	}
	if (count > 0){
		addScore(count);
	}
	return count;
}
// 移动端采用touch时间来监听滑块移动
function touch(){
	var gameBoard = document.getElementsByClassName("game-board")[0];
	gameBoard.addEventListener("touchstart",function(e){
		startX = e.changeTouches[0].pageX;
		startY = e.changeTouches[0].pageY;
	},false)
	gameBoard.addEventListener('touchend',function(e){
		e.preventDefault();
		endX = e.changeTouches[0].pageX,
		endY = e.changeTouches[0].pageY,
		distanceX = endX - startX;
		distanceY = endY - startY;
		if (Math.abs(distanceX) / Math.abs(distanceY)> 1.73 && distanceX > 0){
			deleteTempGrid();
			keyDown(39);
		}else if(Math.abs(distanceX) / Math.abs(distanceY)> 1.73 && distanceX < 0){
			deleteTempGrid();
			keyDown(37);
		}else if(Math.abs(distanceX) / Math.abs(distanceY)> 1.73 && distanceY < 0){
			deleteTempGrid();
			keyDown(38);
		}else if(Math.abs(distanceX) / Math.abs(distanceY)> 1.73 && distanceY > 0){
			deleteTempGrid();
			keyDown(40);
		}else{

		}
	})
}
// 记录分数，分数会增加
function addScore(score){
	var span = document.getElementsByClassName("number"),
	currentScore = parseInt(span[0].innerText),
	bestScore = parseInt(span[1].innerText);
	span[0].innerText = score + currentScore;
	scoreUpAnimaton("score",score);
	if (span[0].innerText > bestScore){
		scoreUpAnimaton("best",score);
		span[1].innerText = span[0].innerText;
	}
}
// howToGoLeft(ele,direction,max):判断单个格子怎么移动
function howToGo(ele,direction,max,testMode){
	var prevGrid,
	prevGridNum,
	gridNum = 0,
	go,
	addNum,
	numLen,
	doubleNumGrid;
	prevGrid = getPrevGrid(ele,direction);
	gridNum = getGridNum(ele);
	if (prevGrid){
		prevGridNum = getGridNum(prevGrid);
	}else{
		prevGridNum = "null";
	}
	// 如果是空格还要啊继续判断
	if (gridNum && !prevGridNum){
		prevGrid.innerHTML = ele.innerHTML;
		ele.children[0].innerText = "";
		max -= 1;
		if (max) {
			go = howToGo(prevGrid,direction,max);
		}
		return go || 1;

	}else if (gridNum == prevGridNum){
		if (!testMode){
			gridNum *=2;
			prevGrid.children[0].innerText = gridNum + '';
			ele.children[0].innerText = '';
			if (gridNum == 2048){
				popup("win");
			}
		}
		return gridNum;
	}else{
		return 0;
	}
}

// 怎么判断gameover 或者达到2048为winner
function testGameOver(){
	var content,
	leftTest,
	rightTest,
	upTest,
	downTest,
	count = 0;
	grid  = document.getElementsByClassName("grid");
	for (var i = 0; i< grid.length; i++ ){
		content = grid[i].innerHTML;
		if (content != "<span></span>"){
			count += 1;
		}
	}
	if (count == 16){
		if (getGridNum(grid[3])== getGridNum(grid[4])){
			count -= 2;
		}
		if (getGridNum(grid[7])== getGridNum(grid[8])){
			count -= 2;
		}
		if (getGridNum(grid[11])== getGridNum(grid[12])){
			count -= 2;
		}
		for ( var i = 0; i < grid.length; i++){
			 if(!howToGo(grid[i], "left", 1, true) && !howToGo(grid[i], "right", 1, true) && !howToGo(grid[i], "up", 1, true) && !howToGo(grid[i], "down", 1, true)) {
			 	count --;
			 	if (count == 0){
			 		popup("game-over");
			 		return true;
			 	}
			} 
		}	
	}
	return false;
}

// 复制粘贴
function popup(popType) {
    var num,
        tryAgainEle,
        ele = document.getElementsByClassName(popType)[0],
        headerEle = document.getElementsByClassName("header")[0],
        gameBoardEle = document.getElementsByClassName("game-board")[0];
    ele.style.display = "block";
    headerEle.style.opacity = "0.4";
    gameBoardEle.style.opacity = "0.4";
 
    // tryAgain(num);
    if (popType == "game-over") {
        num = 0;
    }
    if (popType == "win") {
        num = 1;
    }
    tryAgainEle = document.getElementsByClassName("try-again")[num];
    tryAgainEle.addEventListener("click", function () {
        tryAgain(ele, headerEle, gameBoardEle);
    }, false);
    tryAgainEle.addEventListener("touchend", function () {
        tryAgain(ele, headerEle, gameBoardEle);
    }, false);
}
 
// 再来一次
function tryAgain(ele, headerEle, gameBoardEle) {
    ele.style.display = "none";
    headerEle.style.opacity = "1.0";
    gameBoardEle.style.opacity = "1.0";
    newGame();
}
 
// 5.测试
function test() {
    var randomInt,
        timer;
    timer = setInterval(function() {
        randomInt = Math.floor(Math.random() * 4) + 37;
        keyDown(randomInt);
        // console.log(randomInt);
        if (testGameOver()) {
            clearInterval(timer);
        }
    }, 300);
}
 
 
// 分数增加的动画
function scoreUpAnimaton(type, score) {
    var ele,
        score,
        timer,
        count = 0;
    if (type == "score") {
        ele = document.getElementsByClassName("score-animation")[0];
    } else if (type == "best") {
        ele = document.getElementsByClassName("best-animation")[0];
    }
    score = "+" + score;
    ele.innerText = score;
    ele.style.top = "25px";
    ele.style.color = "#8f7a66";
    ele.style.opacity = "1.0"
 
    timer = setInterval(function() {
        count ++;
        ele.style.display = "inline-block";
        ele.style.top = parseInt(ele.style.top) - 8 + "px";
        ele.style.opacity = parseFloat(ele.style.opacity) - 0.1;
        if (count == 6) {
            clearInterval(timer);
            ele.style.display = "none";
        }
    }, 80);
 };

// window.onload = function(){
// 	var newGrid = document.getElementsByClassName("grid-"+1+4)[0]
// 	console.log(newGrid.innerHTML)
// }