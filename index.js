import * as Photoshop from './photoshop.js'



const loader = document.querySelector("#loader");

const canvas = document.querySelector("#canvas");

const brightness = document.querySelector("#brightness");

const contrast = document.querySelector("#contrast");

const saturation = document.querySelector("#saturation");

const grayscale = document.querySelector("#grayscale");

const blur = document.querySelector("#blur");

const sideBtn = document.querySelector('#side-btn');

const sideBar = document.querySelector('#sidebar');

const sideImgs = document.querySelector('#images');

const icon = document.querySelector('#icon');

const reader = new FileReader();

const ctx = canvas.getContext('2d');

const redButton = document.querySelector('#chooseRed');

const greenButton = document.querySelector('#chooseGreen');

const yellowButton = document.querySelector('#chooseYellow');

let isGray = false;

let originalData;

let paint = false;

let clickX = new Array();

let clickY = new Array();

let clickDrag = new Array();



let red = "#df4b26";
let green = "#659b41";
let yellow = "#ffcf33";


var curColor = red;
var clickColor = new Array();


//Initial image

let currentImg = new Image();

currentImg.src = './img.jpg';



function addClick(x, y, dragging) {
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
  clickColor.push(curColor);
}


function redraw(){
  ctx.lineJoin = "round";
  ctx.lineWidth = 5;
			
  for(var i=0; i < clickX.length; i++) {		
    ctx.beginPath();
    if(clickDrag[i] && i){
      ctx.moveTo(clickX[i-1], clickY[i-1]);
     }else{
       ctx.moveTo(clickX[i]-1, clickY[i]);
     }
     ctx.lineTo(clickX[i], clickY[i]);
     ctx.closePath();
	 ctx.strokeStyle = clickColor[i];
     ctx.stroke();
  }
}

function load(event){

    let file = event.target.files[0];

    reader.readAsDataURL(file);

    reader.onload = function(event){

        if( event.target.readyState == FileReader.DONE) {

            currentImg.src = event.target.result;

    }}

}



function createImageData(ctx, src)

{

    let dst = ctx.createImageData(src.width, src.height);

    dst.data.set(src.data);

    return dst;

}



function sideBarAnimate() {

    if( sideBar.className == "hidden" ) {

        sideBar.className = "visible"

        icon.innerText = 'arrow_back'

    }else{

        sideBar.className = "hidden"

        icon.innerText = 'arrow_forward'

    }

}



function createSideImage(){

    let canvas = document.createElement('canvas');

    canvas.className = 'side-img';

    canvas.addEventListener('click', showUsedImage);

    sideImgs.appendChild(canvas)

    canvas.getContext('2d').drawImage(currentImg, 0, 0, canvas.width, canvas.height);

}



function showUsedImage(event){

    let currentCtx = event.target.getContext('2d')

    ctx.putImageData(currentCtx.getImageData(0, 0, event.target.width, event.target.height), 0 ,0)

}



function handleListeners(){

    brightness.addEventListener('change', () => Photoshop.enlighten(ctx, createImageData(ctx, originalData), parseInt(brightness.value)));

    blur.addEventListener('change', () => Photoshop.blur(ctx, createImageData(ctx, originalData), parseInt(blur.value)));

    grayscale.addEventListener('click', () => isGray = Photoshop.grayscale(ctx, createImageData(ctx, originalData), isGray));

    saturation.addEventListener('change', () => Photoshop.saturate(ctx, createImageData(ctx, originalData)));

    contrast.addEventListener('change', () => Photoshop.contrast(ctx, createImageData(ctx, originalData), parseInt(contrast.value)));

    loader.addEventListener('change', (e) => load(e));

    currentImg.addEventListener('load', () => {

        createSideImage();

        ctx.drawImage(currentImg, 0, 0, canvas.width, canvas.height);

        originalData = ctx.getImageData(0, 0, canvas.width, canvas.height );

    });

    sideBtn.addEventListener('click', sideBarAnimate );
	
	

	
	canvas.addEventListener('mousedown', (e) => {
		var mouseX = e.pageX - canvas.offsetLeft;
		var mouseY = e.pageY - canvas.offsetTop;
		
		paint = true;
		addClick(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
		redraw();
	});

	canvas.addEventListener('mousemove', (e) => {
		if(paint){
			addClick(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop, true);
			redraw();
		}
	});

	canvas.addEventListener('mouseup', () => {
		paint = false;
	});

	canvas.addEventListener('mouseleave', () => {
		paint = false;
	});
	
	redButton.addEventListener('click', () => {
		curColor = red;
	});
	
	greenButton.addEventListener('click', () => {
		curColor = green;
	});
	
	yellowButton.addEventListener('click', () => {
		curColor = yellow;
	});
	
}

handleListeners();
