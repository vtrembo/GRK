<script src="//cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.7/p5.js"></script>
<script type="text/javascript">

let canvasSize = 512;
let imageSize = 256;
let imgArr = {};
let pd;

function preload() 
{
	img = loadImage("https://raw.githubusercontent.com/scikit-image/scikit-image/master/skimage/data/astronaut.png");
	
    imgArr.v = createImage(imageSize, imageSize);
    
	imgArr.l = createImage(imageSize, imageSize);
}

function setup() 
{
	createCanvas(canvasSize, canvasSize);
	img.resize(imageSize, imageSize);
    
	pd = pixelDensity();

	img.loadPixels();
	imgArr.v.loadPixels();
	imgArr.l.loadPixels();

	imgArr.v = copyImg(img, imgArr.v, true, false);
    
	imgArr.l = copyImg(img, imgArr.l, false, true);

	imgArr.v.updatePixels();
	imgArr.l.updatePixels();
  
    image(imgArr.l, 0, imageSize);
    image(img, imageSize, imageSize);
}
function copyImg(srcImg, destImg, setV, setL)
{
    for (let x = 0; x < srcImg.width; x++)
    {
        for (let y = 0; y < srcImg.height; y++)
        {
            for (let dx = 0; dx < pd; dx++)
            {
                for (let dy = 0; dy < pd; dy++)
                {
                    let pos = 4 * ((y * pd + dy) * srcImg.width * pd + (x * pd + dx));
                    const rN = srcImg.pixels[pos] / 255;
                    const gN = srcImg.pixels[pos + 1] / 255;
                    const bN = srcImg.pixels[pos + 2] / 255;
                    const cmax = Math.max(rN, gN, bN);
                    const cmin = Math.min(rN, gN, bN);
                    const v = cmax;
                    const l = (cmax + cmin) / 2;
                    const mx = (pos / 4) % 256;
                    const my = (pos / 4) / 256;
                    if (setV)
                        destImg.set(mx, my, 255 * v);

                    if (setL)
                        destImg.set(mx, my, 255 * l);
                }
            }
        }
    }
    return destImg;
}
</script>