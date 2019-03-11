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

// This is a modified version of the HSVtoRGB function.
// Improved to only use the hue variable.
function HuetoRGB(h) {
    let r, g, b, i, f, q, t;
    i = Math.floor(h * 6);
    f = h * 6 - i;
    q = (1 - f);
    t = (1 - (1 - f));
    switch (i % 6) {
        case 0: r = 1, g = t, b = 0; break;
        case 1: r = q, g = 1, b = 0; break;
        case 2: r = p, g = 1, b = t; break;
        case 3: r = 0, g = q, b = 1; break;
        case 4: r = t, g = 0, b = 1; break;
        case 5: r = 1, g = 0, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

function show(context) {
    let start = performance.now();
    let imgData = context.createImageData(context.canvas.width, context.canvas.height);
    if (document.getElementById("mode_hue").checked) {
        for (let x = map.length; x --> 0;) {
            for (let y = map[x].length; y --> 0;) {
                //let colour = HSVtoRGB(map[x][y] / detail, 1, 1);
                let colour = HuetoRGB(map[x][y] / detail);
                //Set each channel of the pixel to the correct value
                imgData.data[(y * (imgData.width * 4) + (x * 4)) + 0] = colour.r;
                imgData.data[(y * (imgData.width * 4) + (x * 4)) + 1] = colour.g;
                imgData.data[(y * (imgData.width * 4) + (x * 4)) + 2] = colour.b;
                imgData.data[(y * (imgData.width * 4) + (x * 4)) + 3] = 255;
            }

        }
    }
    else {
        for (let x = map.length; x --> 0;) {
            for (let y = map[x].length; y --> 0;) {
                let colour = (1 - (map[x][y] / (detail - 1))) * 255;
                //Set each channel of the pixel to the correct value
                imgData.data[(y * (imgData.width * 4) + (x * 4)) + 0] = colour;
                imgData.data[(y * (imgData.width * 4) + (x * 4)) + 1] = colour;
                imgData.data[(y * (imgData.width * 4) + (x * 4)) + 2] = colour;
                imgData.data[(y * (imgData.width * 4) + (x * 4)) + 3] = 255;
            }
        }
    }
    context.putImageData(imgData, 0, 0);
    console.log(`Drawing time: ${performance.now() - start}ms`);
}

function smooth(context) {
    let w = document.getElementById("flat").checked ? 1 : document.getElementById("sphere").checked ? 2 : 3;
    //Create copy of map so that the smoothing algo isn't
    //affected by the order in which pixels are smoothed
    let tMap = map.slice(0);
    let r = parseInt(document.getElementById("neighbour_range").value);
    let start = performance.now();
    for (let x = map.length; x --> 0;) {
        for (let y = map[x].length; y --> 0;) {
            //Sets pixel to average of neighbour pixels
            tMap[x][y] = getNeigbourAverage(map, x, y, r, w);
        }
    }
    console.log(`Calculation time: ${performance.now() - start}ms`);
    //Set map to the copy & redraw
    map = tMap;
    show(context);

}

function getNeigbourAverage(arr, x, y, r, worldMode) {
    let c = 0;
    switch (worldMode) {
        //Flat
        case 1:
            let n = ((8 + (r * 8)) * r / 2) + 1;
            for (let nX = -r; nX <= r; nX++) {
                for (let nY = -r; nY <= r; nY++) {
                    try {
                        let tX, tY;
                        tX = x + nX;
                        tY = y + nY;

                        //Don't count self or off-map tiles as neighbours
                        if ((tX === x && tY === y) || (tY < 0) || (tY >= arr[x].length) || (tX < 0) || (tX >= arr.length)) {
                            n--;
                            continue;
                        }
                        c += arr[tX][tY];
                    }
                    catch (e) {
                        alert(`${tX}, ${tY}, ${e}`);
                    }
                }
            }
            //Divide by number of neighbours
            return Math.round(c / n);
        //Sphere
        case 2:
            for (let nX = -r; nX <= r; nX++) {
                for (let nY = -r; nY <= r; nY++) {
                    try {
                        let tX, tY;
                        tX = x + nX;
                        tY = y + nY;

                        //Don't count self as neighbour
                        if (tX === x && tY === y) {
                            continue;
                        }

                        //Wrap around if goes off screen
                        if (tY < 0) {
                            tX -= Math.floor(arr.length / 2);
                            tY += arr[x].length;
                        }
                        else if (tY >= arr[x].length) {
                            tX -= Math.floor(arr.length / 2);

                            tY -= arr[x].length;
                        }

                        if (tX < 0) {
                            tX += arr.length;
                        }
                        else if (tX >= arr.length) {
                            tX -= arr.length;
                        }

                        c += arr[tX][tY];
                    }
                    catch (e) {
                        alert(`${tX}, ${tY}, ${e}`);
                    }
                }
            }
            //Divide by number of neighbours
            return Math.round(c / ((8 + (r * 8)) * r / 2));
        //Torus
        case 3:
            for (let nX = -r; nX <= r; nX++) {
                for (let nY = -r; nY <= r; nY++) {
                    try {
                        let tX, tY;
                        tX = x + nX;
                        tY = y + nY;

                        //Don't count self as neighbour
                        if (tX === x && tY === y) {
                            continue;
                        }

                        //Wrap around if goes off screen
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

                        c += arr[tX][tY];
                    }
                    catch (e) {
                        alert(`${tX}, ${tY}, ${e}`);
                    }
                }
            }
            //Divide by number of neighbours
            return Math.round(c / ((8 + (r * 8)) * r / 2));
    }
}

//Initial canvas setup
const canvas = document.createElement("canvas");
const ctx = canvas.getContext('2d');
let detail = 360;
ctx.canvas.width = window.innerWidth * 0.975;
ctx.canvas.height = window.innerHeight * 0.975;

function init() {
    // Generate map.
    genMap('random-noise');
}

let kSimplex = 0.001;

// type is a string that represents what map to generate
function genMap(type, url = -1) {
    setMapSize();

    map = []; // Create new 2D array populated with 'random' numbers.

    // Fill map.
    switch (type) {
        case "random-noise":
            for (let x = ctx.canvas.width; x --> 0;) {
                map[x] = new Array(ctx.canvas.height);
                for (let y = map[x].length; y --> 0;) {
                    map[x][y] = Math.floor(Math.random() * detail);
                }
            }
            break;

        case "simplex-noise":
            let simplex = new SimplexNoise();  // This is computationally difficult, maybe give new-seed button?
            for (let x = ctx.canvas.width; x --> 0;) {
                map[x] = new Array(ctx.canvas.height);
                for (let y = map[x].length; y --> 0;) {
                    map[x][y] = Math.floor((simplex.noise2D(x * kSimplex, y * kSimplex) + 1) / 2 * detail);  // This assigns an hsv value based on simplex noise.
                }
            }
            break;
    }

    show(ctx); // Draw map.
}

// Set important values to input values
function setMapSize() {
    detail = +document.getElementById("detail").value;
    ctx.canvas.width = document.getElementById("width_slider").value;
    ctx.canvas.height = document.getElementById("height_slider").value;
}

function updateSliders() {
    kSimplex = logScale(document.getElementById("kSimplex_slider").value);
    document.getElementById("kSimplex_display").innerHTML = `Simplex Konstant: ${kSimplex.toFixed(3)}`;
    document.getElementById("width_display").innerHTML = `Width: ${document.getElementById("width_slider").value}`;
    document.getElementById("height_display").innerHTML = `Height: ${document.getElementById("height_slider").value}`;
}

// Logartihmic scale (inverse exponential)
function logScale(val) {
    let minv = 0.000000001
    let maxv = 1
    //Clamp number between minv and maxv
    return Math.min(Math.max(1 / (Math.exp(val) - 1), minv), maxv);
}

function main() {
    // Add canvas to the document
    document.getElementById("doc").appendChild(canvas);

    // Set slider values to canvas size
    document.getElementById("height_slider").value = ctx.canvas.height;
    document.getElementById("width_slider").value = ctx.canvas.width;

    document.getElementById("kSimplex_display").value = kSimplex;

    init();
    updateSliders();
}

window.onload = function () { main(); }
