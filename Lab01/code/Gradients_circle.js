<script src="//cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.7/p5.js"></script>
<script>
function setup() {
createCanvas(800,600);
noLoop();
}
function draw() {  
for(y=0; y<height; y++)
   for(x=0; x<width; x++) {
   set(x, y, color(255 -sqrt((x-width/2)*(x-width/2) + (y-height/2)*(y-height/2)),
   sqrt((x-width/2)*(x-width/2) + (y-height/2)*(y-height/2)),
   ((x + y)/(width + height))* 255));
  }
  updatePixels();
}
</script>