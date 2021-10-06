<script src="//cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.7/p5.js"></script>
<script>
function setup() {
createCanvas(800,600);
noLoop();
}
function draw() {  
background(0);
for(y=0; y<height; y++)
   for(x=0; x<width; x++) {
   set(x, y, color(255,0,255));
  }
  updatePixels();
}
</script>