const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const scaleE = document.getElementById('scale');
let amplitude = document.getElementById('amplitude').value;
let frequency = document.getElementById('omega').value / 20000;
let phase = document.getElementById('fi').value * Math.PI;
ctx.translate(canvas.width / 2, canvas.height / 2);
ctx.scale(scaleE.value, scaleE.value);
ctx.font = "10px Sans-serif";

function drawAxes(ctx) {
    let width = ctx.canvas.width;
    let height = ctx.canvas.height;

    // Draw X axis
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.moveTo(-width/2, 0);
    ctx.lineTo(width, 0);
    ctx.stroke();

    // Draw Y axis
    ctx.beginPath();
    ctx.moveTo(0, -width/2);
    ctx.lineTo(0, height);
    ctx.stroke();

    // Draw numbers on X axis
    for (var x = -width/2; x < width; x += 50) {
        if (x == 0) ctx.fillText(0, x+5, 15);
        else ctx.fillText(x/10000, x, 0 + 15);
    }

    // Draw numbers on Y axis
    for (var y = -height/2; y < height; y += 50) {
        if (y == 0) continue;
        ctx.fillText(-y, 5, y);
    }
    ctx.fillText(amplitude, 5, -amplitude);
    ctx.fillText(-amplitude, 5, parseInt(amplitude));
}

function plotSine(ctx) {
    let width = ctx.canvas.width;
    // let height = ctx.canvas.height;

    drawAxes(ctx);

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(66,44,255)";    
    
    let x = -width/2;
    let y = 0;

    while (x < width) {
        y = - amplitude * Math.sin(2*x*Math.PI*frequency + phase*Math.PI);
        ctx.lineTo(x, y);
        // console.log(x, y);
        x = x + 1;
    }
    ctx.stroke();
}
plotSine(ctx);

function plotAmplitude(ctx, amplitude) {
    let width = ctx.canvas.width;
    // let height = ctx.canvas.height;

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.setLineDash([8, 8]);
    
    let y = -amplitude; // musí být záporné (nevím proč)
    ctx.moveTo(-width/2, y);
    ctx.lineTo(width, y);
    ctx.stroke();
}

plotAmplitude(ctx, amplitude);
plotAmplitude(ctx, -amplitude);

function drawXDashes(ctx, width, height, interval) {
    ctx.beginPath();
    for (let x = -width/2; x <= width; x += interval) {
        ctx.moveTo(x,-5);
        ctx.lineTo(x,5);
    }
    for (let y = -height/2; y <= height; y += interval) {
        ctx.moveTo(-5, y);
        ctx.lineTo(5, y);
    }
    ctx.stroke();
}

drawXDashes(ctx, canvas.width, canvas.height, 50);

function updateCanvas() {
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(scaleE.value, scaleE.value);
    amplitude = document.getElementById('amplitude').value;
    frequency = document.getElementById('omega').value / 20000;
    phase = document.getElementById('fi').value;
    plotSine(ctx);
    plotAmplitude(ctx, amplitude);
    plotAmplitude(ctx, -amplitude);
    drawXDashes(ctx, canvas.width, canvas.height, 50);
}

document.getElementById('width+').addEventListener('click', () => {
    canvas.width += 400; // fixní hodnota aby se sinusovka neposouvala vzhledem k ose y
    updateCanvas();
});
document.getElementById('width-').addEventListener('click', () => {
    canvas.width -= 400; // fixní hodnota aby se sinusovka neposouvala vzhledem k ose y
    updateCanvas();
});
document.getElementById('height+').addEventListener('click', () => {
    canvas.height += 100;
    updateCanvas();
});
document.getElementById('height-').addEventListener('click', () => {
    canvas.height -= 100;
    updateCanvas();
});
document.getElementById('amplitude').addEventListener('input', ()=>{
    canvas.height += 0; // přičítá nulu, aby sinusovka nezačala být čárkovaná (wtf JS)
    updateCanvas();
}
);
document.getElementById('omega').addEventListener('input', ()=>{
    canvas.height += 0; // přičítá nulu, aby sinusovka nezačala být čárkovaná (wtf JS)
    updateCanvas();
}
);
document.getElementById('fi').addEventListener('input', ()=>{
    canvas.height += 0; // přičítá nulu, aby sinusovka nezačala být čárkovaná (wtf JS)
    updateCanvas();
}
);
scaleE.addEventListener('input', () => {
    canvas.height += 0; // přičítá nulu, aby sinusovka nezačala být čárkovaná (wtf JS)
    updateCanvas();
});