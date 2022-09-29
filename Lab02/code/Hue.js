<script src="//cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.7/p5.js"></script>
<script type="text/javascript">

    let canvasSize = 512;
    let imageSize = 256;
    let imgArr = {};
    
    let pd;

    function preload() {
        img = loadImage("https://raw.githubusercontent.com/scikit-image/scikit-image/master/skimage/data/astronaut.png");
        
        imgArr.v = createImage(imageSize, imageSize);
        
        imgArr.s = createImage(imageSize, imageSize);
        
        imgArr.h = createImage(imageSize, imageSize);
    }

    function setup() {
        createCanvas(canvasSize, canvasSize);
        img.resize(imageSize, imageSize);

        pd = pixelDensity();

        img.loadPixels();
        
        imgArr.v.loadPixels();
        imgArr.s.loadPixels();
        imgArr.h.loadPixels();

        imgArr.v = copyImg(img, imgArr.v, true, false, false);
        imgArr.s = copyImg(img, imgArr.s, false, true, false);
        imgArr.h = copyImg(img, imgArr.h, false, false, true);

        imgArr.v.updatePixels();
        imgArr.s.updatePixels();
        imgArr.h.updatePixels();

        image(imgArr.v, 0, imageSize);
        image(imgArr.s, imageSize, 0);
        image(imgArr.h, 0, 0);
        image(img, imageSize, imageSize);
    }

    function copyImg(srcImg, destImg, setV, setS, setH) {
        for (let x = 0; x < srcImg.width; x++) {
            for (let y = 0; y < srcImg.height; y++) {
                for (let dx = 0; dx < pd; dx++) {
                    for (let dy = 0; dy < pd; dy++) {
                        let pos = 4 * ((y * pd + dy) * srcImg.width * pd + (x * pd + dx));

                        const rN = srcImg.pixels[pos] / 255;
                        const gN = srcImg.pixels[pos + 1] / 255;
                        const bN = srcImg.pixels[pos + 2] / 255;

                        const cmax = Math.max(rN, gN, bN);
                        const cmin = Math.min(rN, gN, bN);

                        const v = cmax;
                        const l = (cmax + cmin) / 2;

                        let s = 0;
                        const c = cmax - cmin;

                        if (cmax !== 0) {
                            s = c / cmax;
                        }

                        //s = c / (1 - Math.abs(2 * l - 1));

                        let h = 0;

                        if (c === 0)
                            h = 0;
                        else if (v === rN)
                            h = ((gN - bN) / c) % 6;
                        else if (v === gN)
                            h = ((bN - rN) / c) + 2;
                        else /*v==b*/
                            h = ((rN - gN) / c) + 4;

                        h /= 6;

                        if (h < 0) h += 1;

                        const mx = (pos / 4) % 256;
                        const my = (pos / 4) / 256;

                        if (setV)
                            destImg.set(mx, my, 255 * v);

                        if (setS)
                            destImg.set(mx, my, 255 * s);

                        if (setH)
                            destImg.set(mx, my, 255 * h);
                    }
                }
            }
        }

        return destImg;
    }
</script>