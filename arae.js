//s1101445 楊子枋
var allnode = []
function progress(){
	var txt = document.form.txt.value;
	var seq = txt.split("\n");
	var output=""
	for (var i = 0; i<20;i+=2)
	{
	    var result=calc(seq[i],seq[i+1]); //第i筆測資
		output=output+"<br>"+result;
		allnode.splice(0,allnode.length);
	}
    document.getElementById('out').innerHTML= output;
}
function calc(str1,str2)
{
    /* 
       str1 : first object
	   str2 : second object
    */
	var s1 = str1.split(","); //s1[0]:x1, s1[1]:y1 ...
	var s2 = str2.split(","); 
	var answer = "";
    /*----------------- Your Code Start-------------*/
	//判斷是否有點在四邊形裡(包含線段端點在線上&四邊形共同的點)
	for(var i = 0;i < 7;i+=2){
		pointInBox(s1,s2[i],s2[i+1]);
	}
	for(var i = 0;i < 7;i+=2){
		pointInBox(s2,s1[i],s1[i+1]);
	}
	//找四邊形任兩線段交點(不包含線段端點在線上＆共線) => 純交點
	for(var i = 0;i < 7;i+=2){
		for(var j = 0;j < 7;j+=2){
			if(i == 6){
				if(j == 6){
					segmentsIntr(s1[6],s1[7],s1[0],s1[1],s2[6],s2[7],s2[0],s2[1]);
				}else{
					segmentsIntr(s1[6],s1[7],s1[0],s1[1],s2[j],s2[j + 1],s2[j + 2],s2[j + 3]);
				}
			}else{
				if(j == 6){
					segmentsIntr(s1[i],s1[i + 1],s1[i + 2],s1[i + 3],s2[6],s2[7],s2[0],s2[1]);
				}else{
					segmentsIntr(s1[i],s1[i + 1],s1[i + 2],s1[i + 3],s2[j],s2[j + 1],s2[j + 2],s2[j + 3]);
				}
			}
		}
	}
	debugger;
	setSort(allnode);
	
	//allnode.length == 0 or 1-> 兩四邊形無任何交點 -> 無交疊面積
	//----待完成
	//若點無在另一四邊形裡 -> 無交疊面積 
	if(allnode.length == 0 || allnode.length == 2 || allnode.length == 4){
		answer = 0;
	}else{
		answer = Area(allnode)/2;
	}
    /*----------------- Your Code End --------------*/
	return answer;
}
function segmentsIntr(x1,y1,x2,y2,x3,y3,x4,y4){
  
    /** 1 解线性方程组, 求线段交点. **/  
// 如果分母为0 则平行或共线, 不相交  
var denominator = (y2 - y1)*(x4 - x3) - (x1 - x2)*(y3 - y4);  
if (denominator==0) {  
	return false;  
}  

// 线段所在直线的交点坐标 (x , y)      
var x = ( (x2 - x1) * (x4 - x3) * (y3 - y1)   
			+ (y2 - y1) * (x4 - x3) * x1   
			- (y4 - y3) * (x2 - x1) * x3) / denominator ;  
var y = -( (y2 - y1) * (y4 - y3) * (x3 - x1)   
			+ (x2 - x1) * (y4 - y3) * y1   
			- (x4 - x3) * (y2 - y1) * y3 ) / denominator;  

/** 2 判断交点是否在两条线段上 **/  
if (  
	// 交点在线段1上  
	(x - x1) * (x - x2) <= 0 && (y - y1) * (y - y2) <= 0  
	// 且交点也在线段2上  
	 && (x - x3) * (x - x4) <= 0 && (y - y3) * (y - y4) <= 0  
	){  
		for(var i = 0;i < allnode.length;i+=2){
			if(x == allnode[i] && y == allnode[i + 1]){
				return false;
			}
		}
	// 返回交点p  
	allnode.push(x);
	allnode.push(y);
	return true;
}  
//否则不相交  s
return false;
}
function pointInBox(str,x,y){
	var vect = [str[2] - str[0],str[3] - str[1],str[4] - str[2],str[5] - str[3],str[6] - str[4],str[7] - str[5],str[0] - str[6],str[1] - str[7]]
	var point_vect = [x - str[0],y - str[1],x - str[2],y - str[3],x - str[4],y - str[5],x - str[6],y - str[7]];
	var test = [cross(point_vect[0],point_vect[1],vect[0],vect[1]),cross(point_vect[2],point_vect[3],vect[2],vect[3]),cross(point_vect[4],point_vect[5],vect[4],vect[5]),cross(point_vect[6],point_vect[7],vect[6],vect[7])];
	var count = 0;
	for(var i = 0;i < 4;i++){
		if(test[i] >= 0){
			count += 1;
		}
	}
	if(count == 4){
		for(var i = 0;i < allnode.length;i+=2){
			if(x == allnode[i] && y == allnode[i+1]){
				return false;
			}
		}
		allnode.push(x);
		allnode.push(y);
	}
}
function cross(x1,y1,x2,y2){
	return (x1 * y2) - (y1 * x2); 
}
function allPointSame(str1,str2){
	var count = 0;
	for(var i = 0;i < 7;i+=2){
		for(var j = 0;j < 7;j+=2){
			if(str1[i] == str2[j] && str1[i+1] == str2[j+1]){
				count += 1;
			}
		}
	}
	if(count == 4){
		return true;
	}
	return false;
}
//---
function Area(str){
	// for(var i = str.length - 1;i >= 0;i--){
	// 	allnode.push(str[i]);
	// }
	allnode.push(allnode[0]);
	allnode.push(allnode[1]);

	var area = 0.0;

	for(var i = 0;i < allnode.length - 3;i+=2){
		area += cross(allnode[i],allnode[i+1],allnode[i+2],allnode[i+3]);
	}
	return area;
}
function setSort(str){
	var xc = 0;
	var yc = 0;
	for(var i = 0;i < str.length;i+=2){
		xc += parseInt(str[i]);
	}
	for(var i = 1;i < str.length;i+=2){
		yc += parseInt(str[i]);
	}
	xc = xc /((str.length)/2);
	yc = yc /((str.length)/2);

	var up = [];
	var down = [];
	for(var i = 1;i < str.length;i+=2){
		// <=
		if(str[i] < yc){
			down.push(parseFloat(str[i - 1]));
			down.push(parseFloat(str[i]));
		}
		//>
		if(str[i] >= yc){
			up.push(parseFloat(str[i - 1]));
			up.push(parseFloat(str[i]));
		}
	}
	for(var i = 2;i < down.length;i+=2){
		var keyX = down[i];
		var keyY = down[i+1];
		var next = i;
		//down(中心點以下)： 越左 -> x越小（兩端 y 較高）
		if(keyX < down[next - 2] || keyX == down[next - 2]){
			while(next > 0 && (keyX < down[next - 2] || keyX == down[next - 2])){
				if(keyX == down[next - 2]){
					if(keyY > down[next - 1]){
						down[next] = down[next - 2];
						down[next+1] = down[next - 1];
						next -= 2;
					}else{
						next -= 2;
					}
				}else{
					down[next] = down[next - 2];
					down[next+1] = down[next - 1];
					next -= 2;
				}
			}
			down[next] = keyX;
			down[next+1] = keyY;
		}
	}
	for(var i = 2;i < up.length;i+=2){
		var keyX = up[i];
		var keyY = up[i+1];
		var next = i;
		//up(中心點以上)： 越左 -> x越大（兩端 y 較小）
		if(keyX > up[next - 2] || keyX == up[next - 2]){
			//next > 0 && keyX > up[next - 2]
			/* up[next] = up[next - 2];
				up[next+1] = up[next - 1];
				next -= 2;*/
			while(next > 0 && (keyX > up[next - 2] || keyX == up[next - 2])){
				if(keyX == up[next - 2]){
					if(keyY < up[next - 1]){
						up[next] = up[next - 2];
						up[next+1] = up[next - 1];
						next -= 2;
					}else{
						next -= 2;
					}
				}else{
					up[next] = up[next - 2];
					up[next+1] = up[next - 1];
					next -= 2;
				}
			}
			up[next] = keyX;
			up[next+1] = keyY;
		}
	}
	str.splice(0,str.length);
	for(var i = 0;i <down.length;i++){
		str.push(down[i]);
	}
	for(var i = 0;i <up.length;i++){
		str.push(up[i]);
	}

}
/*
-1,1,4,3,4,1,3,0  
-2,2,-1,5,3,4,2,0
= 3.228758169934641

1,1,1,5,4,5,4,2
4,3,4,5,6,6,6,4
= 0

7,7,8,10,11,10,10,7
9,8,9,11,10,11,10,8
= 2

5,5,5,9,9,9,9,5
7,7,5,11,11,10,8,7
= 4.5

1,1,1,5,5,5,5,1
1,1,1,5,5,5,5,1
= 16

5,5,5,9,9,9,9,5
6,7,3,10,9,11,7,7
= 4.5

-1,-1,-1,-5,-5,-5,-5,-1
-1,-1,-1,-5,-5,-5,-5,-1
= 16

-5,-5,-5,-9,-9,-9,-9,-5
-7,-7,-5,-11,-11,-10,-8,-7
= 4.5

1,1,1,5,5,5,5,1
0,3,3,6,6,3,3,0
= 14

1,2,2,7,7,6,8,1
5,4,4,9,10,9,9,5
= 4.7142857142857135

*/