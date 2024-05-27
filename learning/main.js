"use strict"
const ctx=document.getElementById("canva").getContext("2d");

function throttle(func, limit,endfunc=null) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() =>{
      	inThrottle = false;
      	endfunc&&endfunc();
      }, limit);
    }
  }
}

function handleResize(){
	let l=circles.length;
	while(l--){
		circles.pop();
	}

	ctx.canvas.style.width = innerWidth + 'px';
	ctx.canvas.style.height = innerHeight + 'px';
	w=ctx.canvas.width = innerWidth;
	h=ctx.canvas.height = innerHeight;

	for(let i=0;i<100;i++){
		circles.push(
			new Circle(
				startRadius+Math.floor(Math.random()*(w-startRadius*2)),
				startRadius+Math.floor(Math.random()*(h-startRadius*2)),
				Math.floor((Math.random()-0.5)*10)||1,
				Math.floor((Math.random()-0.5)*10)||1,
				"rgb("+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+")",
				startRadius,
				4.5
			)
		)
	}
	animateCircles();
}
window.addEventListener('resize',throttle(handleResize,250,handleResize));

function handleMouseMove(e){
	pointer.x=e.x;
	pointer.y=e.y;
}
ctx.canvas.addEventListener('mousemove',throttle(handleMouseMove,50));

ctx.canvas.addEventListener('mouseout',(e)=>{
	pointer.x=-1000;
	pointer.y=-1000;
})

document.addEventListener("visibilitychange", function() {
	if (document.visibilityState === 'hidden') {
		pause=true;
	} else {
		pause=false;
	}
});

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
	constructor(x,y,dx,dy,color,radius,factor=15){
		this.x=x;
		this.y=y;
		this.dx=dx;
		this.dy=dy;

		this.col=color;
		this.r=radius;
		this.minR=radius;
		this.f=factor;
	}

	move(ctx,pointer){
		this.draw(ctx);

		if(this.x+this.dx-this.r<0||this.x+this.dx+this.r>w){
			this.dx=-this.dx;
		}
		if(this.y+this.dy-this.r<0||this.y+this.dy+this.r>h){
			this.dy=-this.dy;
		}
		const minRPlusFactor=this.minR*this.f*1.4;
		const inRange=
			pointer.x>=this.x-minRPlusFactor &&
			pointer.x<=this.x+minRPlusFactor &&
			pointer.y>=this.y-minRPlusFactor &&
			pointer.y<=this.y+minRPlusFactor;

		if(inRange){
			const rSpeed=this.r+this.f*1.4;

			const canIncresseX=this.x-rSpeed>0&&this.x+rSpeed<w;
			const canIncresseY=this.y-rSpeed>0&&this.y+rSpeed<h;
			if(this.r<minRPlusFactor&&
				 canIncresseX&&
				 canIncresseY)this.r+=this.f;
		}else{
			this.r = Math.max(this.minR, this.r - this.f);
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


function animateCircles(){
	if(!pause)requestAnimationFrame(animateCircles);
	ctx.clearRect(0,0,w,h);
	for(const i of circles){
		i.move(ctx,pointer);
	}
}



const circles=[];
const startRadius=18;
const pointer={x:-1000,y:-1000};

let w,h,
	pause=false;

handleResize();
