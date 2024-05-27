"use strict"
const ctx=document.getElementById("canva").getContext("2d");

function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() =>{
      	inThrottle = false;
      	func();
      }, limit);
    }
  }
}

function resizeCanvas(){
	let l=circles.length;
	while(l--){
		circles.pop();
	}

	ctx.canvas.style.width = innerWidth*0.95 + 'px';
	ctx.canvas.style.height = innerHeight*0.9 + 'px';
	ctx.canvas.width = innerWidth*0.95;
	ctx.canvas.height = innerHeight*0.9;

	for(let i=0;i<100;i++){
	circles.push(
		new Circle(
			startRadius+Math.floor(Math.random()*(ctx.canvas.width-startRadius*2)),
			startRadius+Math.floor(Math.random()*(ctx.canvas.height-startRadius*2)),
			Math.floor((Math.random()-0.5)*10)||1,
			Math.floor((Math.random()-0.5)*10)||1,
			"rgb("+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+")",
			startRadius
	))
}
}

window.addEventListener('resize',throttle(resizeCanvas,250));



console.log(ctx);

// retangle
/*
ctx.fillRect(100, 20, 35, 35);


// line
ctx.beginPath();
ctx.moveTo(25, 50);
ctx.lineTo(75, 50);
ctx.lineTo(50, 25);
ctx.fillStyle="#0000FF";

ctx.stroke();

// circle
ctx.beginPath();
ctx.arc(50, 35, 30, 0, Math.PI*2, true);
ctx.stroke();
*/



// draw "dinamic" circles
/*let _x=0;
ctx.canvas.onmousemove=(e)=>{
	console.log(e)
	if(e.which!==1||e.offsetX<0||e.offsetY<0)return;
	ctx.beginPath();
	ctx.strokeStyle="rgb("+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+")";
	ctx.arc(e.offsetX,e.offsetY,15,0,Math.PI*2)
	ctx.stroke();
	_x=0;
}*/

class Circle{
	constructor(x,y,dx,dy,color,radius){
		this.x=x;
		this.y=y;
		this.dx=dx;
		this.dy=dy;

		this.col=color;
		this.r=radius;
	}

	move(ctx){

		this.draw(ctx);

		if(this.x+this.dx-this.r<0||this.x+this.dx+this.r>ctx.canvas.width){
			this.dx=-this.dx;
		}
		if(this.y+this.dy-this.r<0||this.y+this.dy+this.r>ctx.canvas.height){
			this.dy=-this.dy;
		}

		this.x+=this.dx;
		this.y+=this.dy;
	}

	draw(ctx){
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, true);
		ctx.fillStyle=this.col;
		ctx.fill();
		ctx.fillStyle="#000000";
	}
}


function AnimateCircles(){
	requestAnimationFrame(AnimateCircles);
	ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
	for(const i of circles){
		i.move(ctx);
	}
}



const circles=[];
const startRadius=15;



resizeCanvas();
AnimateCircles();