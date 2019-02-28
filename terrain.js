'use-strict';

let map = [];
let test;
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

function show(context) {
    let imgData = context.createImageData(context.canvas.width, context.canvas.height);
    if (document.getElementById("mode_hue").checked) {
        for (let x = map.length; x --> 0;) {
            for (let y = map[x].length; y --> 0;) {
                let colour = HSVtoRGB(map[x][y] / detail, 1, 1);
                imgData.data[(y * (imgData.width * 4) + (x * 4)) + 0] = colour.r;
                imgData.data[(y * (imgData.width * 4) + (x * 4)) + 1] = colour.g;
                imgData.data[(y * (imgData.width * 4) + (x * 4)) + 2] = colour.b;
                imgData.data[(y * (imgData.width * 4) + (x * 4)) + 3] = 255;
                // context.fillStyle = `rgb(${colour.r}, ${colour.g}, ${colour.b})`;
                // point(x, y, context);
            }

        }
    }
    else {
        for (let x = map.length; x --> 0;) {
            for (let y = map[x].length; y --> 0;) {
                let colour = (1 - (map[x][y] / (detail - 1))) * 255;
                imgData.data[(y * (imgData.width * 4) + (x * 4)) + 0] = colour;
                imgData.data[(y * (imgData.width * 4) + (x * 4)) + 1] = colour;
                imgData.data[(y * (imgData.width * 4) + (x * 4)) + 2] = colour;
                imgData.data[(y * (imgData.width * 4) + (x * 4)) + 3] = 255;
                // context.fillStyle = `rgb(${colour}, ${colour}, ${colour})`;
                // point(x, y, context);
            }
        }
    }
    context.putImageData(imgData, 0, 0);
}
function smooth(context) {
    let tMap = map;

    for (let x = map.length; x --> 0;) {
        for (let y = map[x].length; y --> 0;) {
            tMap[x][y] = getNeigbourAverage(map, x, y, parseInt(document.getElementById("neighbour_range").value));
        }
    }
    map = tMap;
    show(context);
}
function getNeigbourAverage(arr, x, y, r) {
    let c = 0;
    for (let nX = -r; nX <= r; nX++) {
        for (let nY = -r; nY <= r; nY++) {
            try {
                var tX, tY;
                tX = x + nX;
                tY = y + nY;

                if (tX == x && tY == y) {
                    continue;
                }

                if (tY < 0) {
                    tY += arr[x].length;
                }
                else if (tY >= arr[x].length) {
                    tY -= arr[x].length;
                }

                if (tX < 0) {
                    tX += arr.length;
                }
                else if (tX >= arr.length) {
                    tX -= arr.length;
                }

                c += arr[tX][tY]
            }
            catch{
                alert(`${tX}, ${tY}`);
            }
        }
    }
    // if (above < 0) {
    //     above = arr[x].length - 1;
    // }
    // else if (below >= arr[x].length) {
    //     below = 0;
    // }

    // if (left < 0) {
    //     left = arr.length - 1;
    // }
    // else if (right >= arr.length) {
    //     right = 0;
    // }

    // c = arr[left][above] + arr[left][y] + arr[left][below] +
    //     arr[x][above] + arr[x][below] +
    //     arr[right][above] + arr[right][y] + arr[right][below];
    let div_factor = 0;
    for (let i = r + 1; i --> 0;) {
        div_factor += i * 8;
    }
    return Math.round(c / (div_factor));
}

//Initial canvas setup
const canvas = document.createElement("canvas");
const ctx = canvas.getContext('2d');
let detail = 360;
ctx.canvas.width = window.innerWidth * 0.975;
ctx.canvas.height = window.innerHeight * 0.975;

function init() {
    detail = +document.getElementById("detail").value;
    ctx.canvas.width = document.getElementById("width_slider").value;
    ctx.canvas.height = document.getElementById("height_slider").value;

    map = [];
    for (let x = ctx.canvas.width; x --> 0;) {
        map[x] = new Array(ctx.canvas.height);
        for (let y = map[x].length; y --> 0;) {
            map[x][y] = Math.floor(Math.random() * detail);
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

    init();
    document.getElementById("height_slider").value = ctx.canvas.height;
    document.getElementById("width_slider").value = ctx.canvas.width;
    updateSliders();
}
window.onload = function () {
    main();
}