const canvasMatrix = document.getElementById('Matrix');
const context = canvasMatrix.getContext('2d');
var body = document.body,
    html = document.documentElement;
canvasMatrix.width = window.innerWidth;
const height1 = Math.max( body.scrollHeight, body.offsetHeight, 
html.clientHeight, html.scrollHeight, html.offsetHeight );
// console.log(height, window.innerHeight)
// canvasMatrix.height = window.innerHeight;
canvasMatrix.height = height1

const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';

const alphabet = "01" //katakana + latin + nums;

const fontSize = 16;
const columns = canvasMatrix.width/fontSize;

const rainDrops = [];

for( let x = 0; x < columns; x++ ) {
	rainDrops[x] = 1;
}

const draw = () => {
	context.fillStyle = 'rgba(0, 0, 0, 0.18)';
	context.fillRect(0, 0, canvasMatrix.width, canvasMatrix.height);
	
	context.fillStyle = '#0F0';
	context.font = fontSize + 'px monospace';

	for(let i = 0; i < rainDrops.length; i++)
	{
		const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
		context.fillText(text, i*fontSize, rainDrops[i]*fontSize);
		
		if(rainDrops[i]*fontSize > canvasMatrix.height && Math.random() > 0.975){
			rainDrops[i] = 0;
        }
		rainDrops[i]++;
	}
};

setInterval(draw, 60);
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["AWS", "Docker", "Terrafrom", "CI-CD", "Python", "PHP", "JS", "Groovy", "Jenkins", "Jira", ".git"];
const typingDelay = 100;
const erasingDelay = 75;
const newTextDelay = 1000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if(textArrayIndex>=textArray.length) textArrayIndex=0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function() { // On DOM Load initiate the effect
  if(textArray.length) setTimeout(type, newTextDelay + 250);
});




// console.clear();
// const canvas = document.querySelector('#scene');
// canvas.width = canvas.clientWidth;
// canvas.height = canvas.clientHeight;
// const ctx = canvas.getContext('2d');

// if (window.devicePixelRatio > 1) {
//   canvas.width = canvas.clientWidth * 2;
//   canvas.height = canvas.clientHeight * 2;
//   ctx.scale(2, 2);
// }
// let width = canvas.clientWidth; 
// let height = canvas.clientHeight; 
// let rotation = 0; 
// let dots = []; 
// const DOTS_AMOUNT = 1000; 
// const DOT_RADIUS = 2.5; 
// let GLOBE_RADIUS = width * 0.7; 
// let GLOBE_CENTER_Z = -GLOBE_RADIUS; 
// let PROJECTION_CENTER_X = width / 2; 
// let PROJECTION_CENTER_Y = height / 2; 
// let FIELD_OF_VIEW = width * 0.8;

// class Dot {
//   constructor(x, y, z) {
//     this.x = x;
//     this.y = y;
//     this.z = z;
    
//     this.xProject = 0;
//     this.yProject = 0;
//     this.sizeProjection = 0;
//   }
//   project(sin, cos) {
//     const rotX = cos * this.x + sin * (this.z - GLOBE_CENTER_Z);
//     const rotZ = -sin * this.x + cos * (this.z - GLOBE_CENTER_Z) + GLOBE_CENTER_Z;
//     this.sizeProjection = FIELD_OF_VIEW / (FIELD_OF_VIEW - rotZ);
//     this.xProject = (rotX * this.sizeProjection) + PROJECTION_CENTER_X;
//     this.yProject = (this.y * this.sizeProjection) + PROJECTION_CENTER_Y;
//   }
//   draw(sin, cos) {
//     this.project(sin, cos);
//     ctx.beginPath();
//     ctx.arc(this.xProject, this.yProject, DOT_RADIUS * this.sizeProjection, 0, Math.PI * 2);
//     ctx.closePath();
//     ctx.fill();
//   }
// }

// function createDots() {
//   dots.length = 0;
//   for (let i = 0; i < DOTS_AMOUNT; i++) {
//     const theta = Math.random() * 2 * Math.PI; 
//     const phi = Math.acos((Math.random() * 2) - 1); 
//     const x = GLOBE_RADIUS * Math.sin(phi) * Math.cos(theta);
//     const y = GLOBE_RADIUS * Math.sin(phi) * Math.sin(theta);
//     const z = (GLOBE_RADIUS * Math.cos(phi)) + GLOBE_CENTER_Z;
//     dots.push(new Dot(x, y, z));
//     // console.log(dots);
//   }
// }
// function render(a) {
//   ctx.clearRect(0, 0, width, height);
//   rotation = a * 0.0004;
//   const sineRotation = Math.sin(rotation); 
//   const cosineRotation = Math.cos(rotation); 
//   for (var i = 0; i < dots.length; i++) {
// 	  // context.fillStyle = 'rgba(0, 0, 0, 0.9)';
//     ctx.fillStyle = '#0f0';
//     dots[i].draw(sineRotation, cosineRotation);
//   }
  
//   window.requestAnimationFrame(render);
// }
// function afterResize () {
//   width = canvas.offsetWidth;
//   height = canvas.offsetHeight;
//   if (window.devicePixelRatio > 1) {
//     canvas.width = canvas.clientWidth * 2;
//     canvas.height = canvas.clientHeight * 2;
//     ctx.scale(2, 2);
//   } else {
//     canvas.width = width;
//     canvas.height = height;
//   }
//   GLOBE_RADIUS = width * 0.7;
//   GLOBE_CENTER_Z = -GLOBE_RADIUS;
//   PROJECTION_CENTER_X = width / 2;
//   PROJECTION_CENTER_Y = height / 2;
//   FIELD_OF_VIEW = width * 0.8;
  
//   createDots(); 
// }
// let resizeTimeout;
// function onResize () {
//   resizeTimeout = window.clearTimeout(resizeTimeout);
//   resizeTimeout = window.setTimeout(afterResize, 500);
// }
// window.addEventListener('resize', onResize);
// createDots();
// window.requestAnimationFrame(render);


