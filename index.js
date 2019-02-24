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

let isGray = false;

let originalData;

//Initial image

let currentImg = new Image();

currentImg.src = './img.jpg';



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

    brightness.addEventListener('change', () => Photoshop.enlighten(ctx, createImageData(ctx, originalData), parseInt(brightness.value)))

    blur.addEventListener('change', () => Photoshop.blur(ctx, createImageData(ctx, originalData), parseInt(blur.value)))

    grayscale.addEventListener('click', () => isGray = Photoshop.grayscale(ctx, createImageData(ctx, originalData), isGray))

    saturation.addEventListener('change', () => Photoshop.saturate(ctx, createImageData(ctx, originalData)))

    contrast.addEventListener('change', () => Photoshop.contrast(ctx, createImageData(ctx, originalData), parseInt(contrast.value)))

    loader.addEventListener('change', () => load(event))

    currentImg.addEventListener('load', () => {

        createSideImage()

        ctx.drawImage(currentImg, 0, 0, canvas.width, canvas.height)

        originalData = ctx.getImageData(0, 0, canvas.width, canvas.height );

    })

    sideBtn.addEventListener('click', sideBarAnimate );

}

handleListeners();
