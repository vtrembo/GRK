<script src="//cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.7/p5.js"></script>
<script>
let skyHeight = 400;
let grassXY = [];
let houseHeight = 180;
let houseWidth = 220;
let roofHeight = 550;

function setup() {
    createCanvas(800, 600);
    noLoop();
}
function draw() {
    for (let i = 0; i < 700; i++) {
        let x = floor(random(0, width));
        let y = floor(random(skyHeight, height));
        let randomColor = color(floor(random(0, 255)), floor(random(0, 255)), floor(random(0, 255)));
        if (!grassXY.includes(x)) {
            grassXY[x] = [];
        }
        grassXY[x][y] = randomColor;
    }
    for (let x = 0, xr = width; x < width; x++, xr--) {
        for (let y = 0, k = 1, j = height * 2; y < height; y++, k += 2, j -= 2) {
            let currentColor;
            if (y < skyHeight) {
                currentColor = color(200, 200, 255);
                if (y < skyHeight + houseHeight && y > skyHeight - houseHeight) {
                    if (x > width / 2 - houseWidth && x < width / 2 + houseWidth) {
                        currentColor = color(100, 50, 30);
                    }
                } else if (y < skyHeight + houseHeight + roofHeight && y > skyHeight - houseHeight - roofHeight) {
                    if ((x <= width / 2 && k > height - x) || (x > width / 2 && j < xr + height)) {
                        currentColor = color(255, 100, 100);
                    }
                }
            } else {
                if (grassXY[x] !== undefined && grassXY[x][y] !== undefined) {
                    currentColor = grassXY[x][y];
                } else {
                    currentColor = color(0, 100, 0);
                }
            }
            set(x, y, currentColor);
        }
    }
    updatePixels();
}
</script>