var pulsers = Array.from(document.querySelectorAll('.pulser'));

pulsers.forEach(function(p, i) {
  p.animate([
    {transform: 'scale('+Math.random()+') translate3d(0,0,0) rotate(0deg)'},
    {transform: 'scale('+Math.random()+') translate3d(0,0,0) rotate(360deg)'}
  ], {
    duration: Math.random() * 5000 + 5000,
    iterations: Infinity,
    direction: 'alternate',
    easing: 'cubic-bezier(.53,-0.38,.52,1.41)'
  });
  
  p.style.animationDelay = (-10000 * i / pulsers.length) + 'ms';
});





//switched to css keyframes
function filters(p) {
  p.animate([
    {filter: 'hue-rotate(0deg) blur(3vmin)'},// blur(0px)'},
    {filter: 'hue-rotate(360deg) blur(20vmin)'}// blur('+(Math.random()*5)+'px)'}
  ], {
    //iterationComposite: 'accumulate',
    duration: 10000,
    delay: -10000 * i / pulsers.length,
    iterations: Infinity,
    direction: 'alternate'
  });
}

$(document).ready(function(){

 	var canvas, ctx, w, h;

 	var h = window.innerHeight;
 	var w = window.innerWidth;

    var canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0px';
    canvas.style.width = '100%';

    document.body.appendChild(canvas);
    
	canvas.width = w;
	canvas.height = h;

	ctx = canvas.getContext('2d');

	function paintCanvas(){
		ctx.fillStyle = "rgba(0,0,0,1)";
		ctx.fillRect(0,0,w,h);
	}


	function particle(r,off,c){
		this.x = Math.random()*w;
		this.y = Math.random()*h;
		this.r = r;
		this.offset = Math.random()*50+off;
		this.color = "rgba(255,255,255,"+c+")"
		this.draw = function(){
			ctx.fillStyle = this.color;
			ctx.beginPath();
			ctx.arc(this.x,this.y,this.r,Math.PI*2,false);
			ctx.fill();
		}
		
	}

	var layer_1 = [],
	layer_2 = [],
	layer_3 = [];

	var layer_1_num = 40;
	var layer_2_num = 40;
	var layer_3_num = 100;


	for(i=0;i<layer_1_num;i++){
		layer_1.push(new particle(4,20,0));

	}
	for(i=0;i<layer_2_num;i++){
		layer_2.push(new particle(2.5,40,0));
	}
	for(i=0;i<layer_3_num;i++){
		layer_3.push(new particle(1,60,0));
	}

	function draw(){
		for(i=0;i<layer_1.length;i++){
			var p = layer_1[i];
			p.draw();
			update(p);
			checkBounds(p);
			for(var j=i+1;j<layer_3.length;j++){
				p2 = layer_3[j];
				distance(p,p2,w*1.5);
			}
			
		}
		for(i=0;i<layer_2.length;i++){
			var p = layer_2[i];
			p.draw();
			update(p);
			checkBounds(p);
			for(var j=i+1;j<layer_3.length;j++){
				p2 = layer_3[j];
				distance(p,p2);
			}
		}
		for(i=0;i<layer_3.length;i++){
			var p = layer_3[i];
			p.draw();
			update(p);
			checkBounds(p);
			for(var j=i+1;j<layer_3.length;j++){
				p2 = layer_3[j];
				distance(p,p2);
			}
		}
	}
	function update(p){
		p.x = p.x - mouse.x/p.offset;
		p.y = p.y - mouse.y/p.offset;
	}
	function checkBounds(p){
		if(p.x > w  ){
			p.x =0;
		}
		else if(p.x < 0){
			p.x =w;
		}
		if(p.y > h){
			p.y =0;
		}
		else if(p.y < 0){
			p.y = h;
		}
	}

  var minDist = w*0.7;

	function distance(p1,p2){
		var dist;
		var dx = p1.x - p2.x;
		var dy = p1.y - p2.y;
		dist = Math.sqrt(dx*dx + dy*dy);

		if (dist <= minDist){
			ctx.beginPath();
			ctx.strokeStyle = "rgba(255,255,255,"+ (0.2-dist/minDist) +")";
			ctx.moveTo(p1.x, p1.y);
			ctx.lineTo(p2.x, p2.y);
			ctx.stroke();
			ctx.closePath();
		}
	}

	var mouse ={
		x:0,
		y:0
	}

	document.addEventListener('mousemove', function(e){ 
	    mouse.x = e.clientX  -w/2|| e.pageX -w/2; 
	    mouse.y = e.clientY -h/2|| e.pageY -h/2;
	}, false);

	function animate(){
		paintCanvas();
		draw();
		requestAnimationFrame(animate);
	}
	// setInterval(function(){
	// 	paintCanvas();
	// 	draw();
	// },30);
	animate();
});






