<script src="//cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.7/p5.js"></script>
<script>
function setup() {
createCanvas(800,600);
noLoop();
}
function draw() {  
for(y=0; y<height; y++)
   for(x=0; x<width; x++) {
   set(x, y, (x/width)*256);
  }
  updatePixels();
}
</script>