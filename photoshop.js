export function enlighten(ctx, imgData, currentValue){

    for( let i = 0; i < imgData.data.length; i+=4){

        imgData.data[i] = Math.min(255, imgData.data[i] + currentValue)

        imgData.data[i+1] = Math.min(255, imgData.data[i+1] + currentValue)

        imgData.data[i+2] = Math.min(255, imgData.data[i+2] + currentValue)

    }

    ctx.putImageData(imgData, 0, 0)

}



export function blur(ctx, imgData, value) {

        for(let i=0; i<imgData.data.length; i+=4) {

            let pixel = getRGB(imgData.data.slice(i, i + 4))



            !isBrightPixel(pixel) && ( value = -value )



            imgData.data[i]    = Math.min(255, imgData.data[i] + value)

            imgData.data[i+1]  = Math.min(255, imgData.data[i+1] + value)

            imgData.data[i+2]  = Math.min(255, imgData.data[i+2] + value)

        }

        ctx.putImageData(imgData, 0, 0)

    }



export function isBrightPixel(pixel) {

        return  pixel.r > 128 || 

                pixel.g > 128 || 

                pixel.b > 128

    }



export function getRGB(array) {

        return {

            r: array[0],

            g: array[1],

            b: array[2]

        }

    }



export function grayscale(ctx, imgData, isGray){

  if( isGray == true ){

    ctx.putImageData(imgData, 0, 0)

    return false;

  } else {

    let d = imgData.data;

    for (let i=0; i<d.length; i+=4) {

      let r = d[i];

      let g = d[i+1];

      let b = d[i+2];

      

      let v = 0.2126*r + 0.7152*g + 0.0722*b;

      d[i] = d[i+1] = d[i+2] = v

    }

    ctx.putImageData(imgData, 0, 0)

    return true

  }  

}



export function saturate(ctx, imgData){

    let d = imgData.data;

    for (let i=0; i<d.length; i+=4) {

        let hsv= RGBtoHSV ([d[i], d[i+1], d[i+2]]);

        hsv[1] *= 1.5;

        let rgb= HSVtoRGB(hsv);

        d[i] = rgb[0];

        d[i+1] = rgb[1];

        d[i+2] = rgb[2];

    }

    ctx.putImageData(imgData, 0, 0)

}



export function RGBtoHSV(color) {

    let r,g,b,h,s,v, min, max, delta;

    r= color[0];

    g= color[1];

    b= color[2];

    min = Math.min( r, g, b );

    max = Math.max( r, g, b );





    v = max;

    delta = max - min;

    if( max != 0 )

        s = delta / max;

    else {

        s = 0;

        h = -1;

        return [h, s, undefined];

    }

    if( r === max )

        h = ( g - b ) / delta;      

    else if( g === max )

        h = 2 + ( b - r ) / delta;  

    else

        h = 4 + ( r - g ) / delta;  

    h *= 60;                

    if( h < 0 )

        h += 360;

    if ( isNaN(h) )

        h = 0;

    return [h,s,v];

};



export function HSVtoRGB(color) {

    let h,s,v,r,g,b, f, i, p, q, t;

    h= color[0];

    s= color[1];

    v= color[2];

    if(s === 0 ) {

        r = g = b = v;

        return [r,g,b];

    }

    h /= 60;         

    i = Math.floor( h );

    f = h - i;          

    p = v * ( 1 - s );

    q = v * ( 1 - s * f );

    t = v * ( 1 - s * ( 1 - f ) );

    switch( i ) {

        case 0:

            [r, g, b] = [v, t, p]

            break;

        case 1:

            [r, g, b] = [q, v, p]

            break;

        case 2:

            [r, g, b] = [p, v, t]

            break;

        case 3:

            [r, g, b] = [p, q, v]

            break;

        case 4:

            [r, g, b] = [t, p, v]

            break;

        default:        

            [r, g, b] = [v, p, q]

            break;

    }

    return [r,g,b];

}



export function contrast(ctx, imgData, contrast){

    var d = imgData.data;

    contrast = (contrast/100) + 1;

    var intercept = 128 * (1 - contrast);

    for(var i=0;i<d.length;i+=4){

        d[i] = d[i]*contrast + intercept;

        d[i+1] = d[i+1]*contrast + intercept;

        d[i+2] = d[i+2]*contrast + intercept;

    }

    ctx.putImageData(imgData, 0, 0)

}
