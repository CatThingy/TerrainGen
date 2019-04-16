'use-strict';

let DEBUG = false;

let g_kSimplex = 0.001;

let map = [];
let simplex;

function show(context) {
    let start = performance.now();
    let imgData = context.createImageData(context.canvas.width, context.canvas.height);
    if (document.getElementById("mode_hue").checked) {
        for (let x = map.length; x-- > 0;) {
            for (let y = map[x].length; y-- > 0;) {
                // This operation converts the scaled colour number into a readable one (sometimes performs rasterization.)
                let colour = hueRGB[Math.round((map[x][y] / detail) * 359)]; // if there are 360 possible values (0-359) for 
                //                                                              1 as a case it must be multiplied by 359.
                //Set each channel of the pixel to the correct value
                imgData.data[(y * (imgData.width * 4) + (x * 4)) + 0] = colour.r;
                imgData.data[(y * (imgData.width * 4) + (x * 4)) + 1] = colour.g;
                imgData.data[(y * (imgData.width * 4) + (x * 4)) + 2] = colour.b;
                imgData.data[(y * (imgData.width * 4) + (x * 4)) + 3] = 255;
            }
        }
    }
    else {
        for (let x = map.length; x-- > 0;) {
            for (let y = map[x].length; y-- > 0;) {
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
    if (DEBUG) { console.log(`Drawing time: ${performance.now() - start}ms`); }
}

function smooth(context) {
    let worldType = document.getElementById("flat").checked ? 1 : document.getElementById("sphere").checked ? 2 : 3;

    // Create copy of map so that the smoothing alg isn't
    // affected by the order in which pixels are smoothed.
    let mapCopy = map.map(arr => arr.slice());
    let range = parseInt(document.getElementById("neighbour_range").value);
    let start = performance.now();
    for (let x = map.length; x-- > 0;) {
        for (let y = map[x].length; y-- > 0;) {
            // Sets pixel to average of neighbour pixels
            mapCopy[x][y] = getNeigbourAverage(map, x, y, range, worldType);
        }
    }
    if (DEBUG) { console.log(`Calculation time: ${performance.now() - start}ms`); }

    //Set map to the copy & redraw
    map = mapCopy;
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

// Initial canvas setup
const canvas = document.createElement("canvas");
const ctx = canvas.getContext('2d');
let detail = 360;
ctx.canvas.width = window.innerWidth * 0.97;
ctx.canvas.height = window.innerHeight;

function init() {
    genMap('random-noise'); // Generate the map.
}

// let g_img = new Image();
// g_img.crossOrigin = "Anonymous";  // VERY IMPORTANT

// type is a string that represents what map to generate
function genMap(type) {
    if (DEBUG) { var start = performance.now(); }
    setMapSize();

    map = []; // Create new 2D array populated with 'random' numbers.

    // Fill map.
    switch (type) {
        case "random-noise":
            for (let x = ctx.canvas.width; x-- > 0;) {
                map[x] = new Array(ctx.canvas.height);
                for (let y = map[x].length; y-- > 0;) {
                    map[x][y] = Math.floor(Math.random() * detail);
                }
            }
            break;

        case "simplex-noise":
            if (document.getElementById("reseed_simplex").checked) {
                simplex = new SimplexNoise();
            }

            for (let x = ctx.canvas.width; x-- > 0;) {
                map[x] = new Array(ctx.canvas.height);
                for (let y = map[x].length; y-- > 0;) {
                    // This assigns an hsv value based on simplex noise.
                    // This operation produces a *detail scaled* colour number.
                    map[x][y] = Math.floor((simplex.noise2D(x * g_kSimplex, y * g_kSimplex) + 1) / 2 * detail);
                }
            }
            break;
        case "web-img":  /// Sorry in advace, I don't know the proper way to format callbacks so here you go. ///
            //Image loading
            var tmpImg = new Image();
            tmpImg.crossOrigin = "Anonymous";
            let link = document.getElementById("link_input").value;
            // Feature detection
            if (!window.XMLHttpRequest) { alert("Unfortunately, your browser doesn't support loading images from a URL."); return; }

            //Regex to see if the image url is valid - not replacement for testing if image exists
            //Removed because it had false negatives
            /* if (!link.match(/^(?:https?:\/\/)?(?:[\w]+\.)(?:\.?[\w]{2,})+\/.+\.(?:png|bmp|jpe?g|ico)/i)) {
                alert("Please make sure the image URL is valid.");
                return;
            }*/

            // TODO: make sure image exists first. case if not: give warning.
            // Also TODO: if this proxy breaks or dies, look for another one.
            let url = "https://cors-anywhere.herokuapp.com/" + link
            var dataAxis = document.getElementById("axis_hue").checked ? "Hue" : document.getElementById("axis_saturation").checked ? "Saturation" : "Lightness"
            let xhr = new XMLHttpRequest();
            xhr.open('get', url);
            //xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');  //TODO: do i need this?
            //                                                               no
            xhr.responseType = 'blob';
            xhr.onload = function () {
                let fr = new FileReader();
                fr.onload = function () {
                    if (DEBUG) { console.log(`Generation time: ${performance.now() - start}ms`); }
                    tmpImg.src = this.result;  // This gets the data from the loaded image and sets it to the image variable.
                    setTimeout(loadImg(tmpImg, dataAxis, DEBUG ? start : null), 100);  //load image after background refresh
                };
                fr.readAsDataURL(xhr.response); // async call
            };
            xhr.send();  // Actually request the image and wait for callbacks to be triggered.
            break;
        case "img-file":
            var tmpImg = new Image();
            tmpImg.crossOrigin = "Anonymous";
            var dataAxis = document.getElementById("axis_hue").checked ? "Hue" : document.getElementById("axis_saturation").checked ? "Saturation" : "Lightness"
            let files = document.getElementById("file_input").files;
            let fr = new FileReader();
            fr.onload = function () {
                if (DEBUG) { console.log(`Generation time: ${performance.now() - start}ms`); }
                tmpImg.src = this.result;
                setTimeout(loadImg(tmpImg, dataAxis, DEBUG ? start : null), 100) ;
            };
            fr.readAsDataURL(files[0]);
            break;
    }
    if (DEBUG && type != "web-img") { console.log(`Generation time: ${performance.now() - start}ms`); }

    switch (type) {
        case "random-noise":
        case "simplex-noise":
            show(ctx);  // Update map.
            return;
        case "web-img":
            // Map gets updated in load function.
            return;
    }
}

// Set important values to input values
function setMapSize() {
    detail = +document.getElementById("detail").value;
    ctx.canvas.width = document.getElementById("width_slider").value;
    ctx.canvas.height = document.getElementById("height_slider").value;
}

function updateSliders() {
    g_kSimplex = logScale(document.getElementById("kSimplex_slider").value);
    document.getElementById("kSimplex_display").innerHTML = `Noise Size Modifier: ${(+document.getElementById("kSimplex_slider").value).toFixed(3)}`;
    document.getElementById("width_display").innerHTML = `Width: ${document.getElementById("width_slider").value}`;
    document.getElementById("height_display").innerHTML = `Height: ${document.getElementById("height_slider").value}`;
}

// Logartihmic scale (inverse exponential)
function logScale(val) {
    let minv = 0.000000001
    let maxv = 1
    // Clamp number between minv and maxv
    return Math.min(Math.max(1 / (Math.exp(val) - 1), minv), maxv);
}

function main() {
    // Add canvas to the document
    document.getElementById("doc").appendChild(canvas);
    ctx.canvas.style.marginLeft = '1%'
    // Set slider values to canvas size
    document.getElementById("height_slider").value = ctx.canvas.height;
    document.getElementById("width_slider").value = ctx.canvas.width;

    document.getElementById("kSimplex_display").value = g_kSimplex;

    init();
    updateSliders();
}

function loadImg(img, axis, time_since_start) {
    if (img.width <= 0) { alert("Please ensure the image is valid, then try again."); return; }
    //Prevent errors from a canvas that's too small
    ctx.canvas.width = document.getElementById("width_slider").value = img.width;
    ctx.canvas.height = document.getElementById("height_slider").value = img.height;

    // I have to go draw the image to canvas first, just to get the image's pixel data.
    // Fails on Firefox if resistFingerprinting is enabled
    ctx.drawImage(img, 0, 0);  // Draw img to canvas.
    let tmpImageData;
    try {
        tmpImageData = ctx.getImageData(0, 0, img.width, img.height);  // get img data from canvas.
    } catch (e) {  //case: security error, img on diff domain.
        console.log(e);
    }

    let step = 4;
    if (DEBUG) { console.log(axis); }
    updateSliders();
    //Use hue/saturation/lightness as data
    for (let x = 0; x < img.width * step; x += step) {
        map[x / step] = new Array(img.height);
        for (let y = 0; y < img.height * step; y += step) {
            map[x / step][y / step] = Math.floor(window[`rgbTo${axis}`](
                tmpImageData.data[img.width * y + x],
                tmpImageData.data[img.width * y + x + 1],
                tmpImageData.data[img.width * y + x + 2]) * detail);
        }
    }
    if (DEBUG) { console.log(`Canvas updated with web-img in ${performance.now() - time_since_start} ms!`); }
    show(ctx); // Draw map.
}

window.onload = function () { main(); }
