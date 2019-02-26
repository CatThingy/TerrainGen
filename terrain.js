'use-strict';

let map = [];

function HSVtoRGB(h, s, v) {
    let r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}
function point(x, y, context) {
    context.fillRect(x, y, 1, 1);
}

function show(context) {
    for (let x = map.length; x --> 0;) {
        for (let y = map[x].length; y --> 0;) {
            let color = HSVtoRGB(map[x][y], 1, 1);
            context.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
            point(x, y, context);
        }
    }
}
function smooth(context) {
    for (let x = map.length; x --> 0;) {
        for (let y = map[x].length; y --> 0;) {
            map[x][y] = getNeigbourAverage(map, x, y);
        }
    }
    show(context);
}
function getNeigbourAverage(arr, x, y) {
    let c;
    let left = x - 1;
    let right = x + 1;
    let above = y - 1;
    let below = y + 1;

    if (above < 0) {
        above = arr[x].length - 1;
    }
    else if (below >= arr[x].length) {
        below = 0;
    }

    if (left < 0) {
        left = arr.length - 1;
    }
    else if (right >= arr.length) {
        right = 0;
    }

    c = arr[left][above] + arr[left][y] + arr[left][below] +
        arr[x][above] + arr[x][below] +
        arr[right][above] + arr[right][y] + arr[right][below];
    return c / 8;
}

//Initial canvas setup
const canvas = document.createElement("canvas");
const ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth * 0.975;
ctx.canvas.height = window.innerHeight * 0.975;

function init() {
    ctx.canvas.width = document.getElementById("width_slider").value;
    ctx.canvas.height = document.getElementById("height_slider").value;

    map = [];
    for (let x = ctx.canvas.width; x --> 0;) {
        map[x] = new Array(ctx.canvas.height);
        for (let y = map[x].length; y --> 0;) {
            map[x][y] = Math.random();
        }
    }
    show(ctx);
}

function updateSliders() {
    document.getElementById("width_display").innerHTML = `Width: ${document.getElementById("width_slider").value}`;
    document.getElementById("height_display").innerHTML = `Height: ${document.getElementById("height_slider").value}`;
}

function main() {

    //add canvas to the document
    document.getElementById("doc").appendChild(canvas);

    //Generate map
    for (let x = ctx.canvas.width; x --> 0;) {
        map[x] = new Array(ctx.canvas.height);
        for (let y = map[x].length; y --> 0;) {
            map[x][y] = Math.random();
        }
    }
    document.getElementById("height_slider").value = ctx.canvas.height;
    document.getElementById("width_slider").value = ctx.canvas.width;
    updateSliders();
    show(ctx);
}
window.onload = function () {
    main();
}