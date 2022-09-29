<script src="//cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.7/p5.js"></script>
<script type="text/javascript">

let pDEnsity;
let imgArr = {};


function preload()
{
    img = loadImage("https://raw.githubusercontent.com/scikit-image/scikit-image/master/skimage/data/astronaut.png");
    
    imgArr.r = createImage(256, 256);
    
    imgArr.g = createImage(256, 256);
    
    imgArr.b = createImage(256, 256);
    
    imgArr.rgb = createImage(256, 256);
}

function setup() 
{
    createCanvas(512, 512);
    img.resize(256, 256);

    pDEnsity = pixelDensity();

    img.loadPixels();
    imgArr.r.loadPixels();
    imgArr.g.loadPixels();
    imgArr.b.loadPixels();

    imgArr.r = copyImg(img, imgArr.r, true, false, false, true);
    imgArr.g = copyImg(img, imgArr.g, false, true, false, true);
    imgArr.b = copyImg(img, imgArr.b, false, false, true, true);

    imgArr.r.updatePixels();
    imgArr.g.updatePixels();
    imgArr.b.updatePixels();

    imgArr.rgb.blend(imgArr.r, 0, 0, 256, 256, 0, 0, 256, 256, ADD);
    imgArr.rgb.blend(imgArr.g, 0, 0, 256, 256, 0, 0, 256, 256, ADD);
    imgArr.rgb.blend(imgArr.b, 0, 0, 256, 256, 0, 0, 256, 256, ADD);

    image(imgArr.r, 0, 0);
    image(imgArr.g, 256, 0);
    image(imgArr.b, 0, 256);
    image(imgArr.rgb, 256, 256);
}

function copyImg(srcImg, destImg, r, g, b, a) 
{
    for (let x = 0; x < srcImg.width; x++) 
    {
        for (let y = 0; y < srcImg.height; y++) 
        {
            for (let dx = 0; dx < pDEnsity; dx++) 
            {
                for (let dy = 0; dy < pDEnsity; dy++) 
                {
                    let pos = 4 * ((y * pDEnsity + dy) * srcImg.width * pDEnsity + (x * pDEnsity + dx));
                    if (r)
                        destImg.pixels[pos] = srcImg.pixels[pos];
                    if (g)
                        destImg.pixels[pos + 1] = srcImg.pixels[pos + 1];
                    if (b)
                        destImg.pixels[pos + 2] = srcImg.pixels[pos + 2];
                    if (a)
                        destImg.pixels[pos + 3] = srcImg.pixels[pos + 3];
                }
            }
        }
    }
    return destImg;
}
</script>
