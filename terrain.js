'use-strict';

let map = [];

//Lookup table for hue to rgb
let hueRGB = [{ "r": 255, "g": 0, "b": 0 }, { "r": 255, "g": 4, "b": 0 }, { "r": 255, "g": 8, "b": 0 }, { "r": 255, "g": 13, "b": 0 }, { "r": 255, "g": 17, "b": 0 }, { "r": 255, "g": 21, "b": 0 }, { "r": 255, "g": 25, "b": 0 }, { "r": 255, "g": 30, "b": 0 }, { "r": 255, "g": 34, "b": 0 }, { "r": 255, "g": 38, "b": 0 }, { "r": 255, "g": 42, "b": 0 }, { "r": 255, "g": 47, "b": 0 }, { "r": 255, "g": 51, "b": 0 }, { "r": 255, "g": 55, "b": 0 }, { "r": 255, "g": 60, "b": 0 }, { "r": 255, "g": 64, "b": 0 }, { "r": 255, "g": 68, "b": 0 }, { "r": 255, "g": 72, "b": 0 }, { "r": 255, "g": 77, "b": 0 }, { "r": 255, "g": 81, "b": 0 }, { "r": 255, "g": 85, "b": 0 }, { "r": 255, "g": 89, "b": 0 }, { "r": 255, "g": 94, "b": 0 }, { "r": 255, "g": 98, "b": 0 }, { "r": 255, "g": 102, "b": 0 }, { "r": 255, "g": 106, "b": 0 }, { "r": 255, "g": 111, "b": 0 }, { "r": 255, "g": 115, "b": 0 }, { "r": 255, "g": 119, "b": 0 }, { "r": 255, "g": 123, "b": 0 }, { "r": 255, "g": 128, "b": 0 }, { "r": 255, "g": 132, "b": 0 }, { "r": 255, "g": 136, "b": 0 }, { "r": 255, "g": 140, "b": 0 }, { "r": 255, "g": 145, "b": 0 }, { "r": 255, "g": 149, "b": 0 }, { "r": 255, "g": 153, "b": 0 }, { "r": 255, "g": 157, "b": 0 }, { "r": 255, "g": 162, "b": 0 }, { "r": 255, "g": 166, "b": 0 }, { "r": 255, "g": 170, "b": 0 }, { "r": 255, "g": 174, "b": 0 }, { "r": 255, "g": 179, "b": 0 }, { "r": 255, "g": 183, "b": 0 }, { "r": 255, "g": 187, "b": 0 }, { "r": 255, "g": 191, "b": 0 }, { "r": 255, "g": 195, "b": 0 }, { "r": 255, "g": 200, "b": 0 }, { "r": 255, "g": 204, "b": 0 }, { "r": 255, "g": 208, "b": 0 }, { "r": 255, "g": 213, "b": 0 }, { "r": 255, "g": 217, "b": 0 }, { "r": 255, "g": 221, "b": 0 }, { "r": 255, "g": 225, "b": 0 }, { "r": 255, "g": 229, "b": 0 }, { "r": 255, "g": 234, "b": 0 }, { "r": 255, "g": 238, "b": 0 }, { "r": 255, "g": 242, "b": 0 }, { "r": 255, "g": 247, "b": 0 }, { "r": 255, "g": 251, "b": 0 }, { "r": 255, "g": 255, "b": 0 }, { "r": 251, "g": 255, "b": 0 }, { "r": 247, "g": 255, "b": 0 }, { "r": 242, "g": 255, "b": 0 }, { "r": 238, "g": 255, "b": 0 }, { "r": 234, "g": 255, "b": 0 }, { "r": 230, "g": 255, "b": 0 }, { "r": 225, "g": 255, "b": 0 }, { "r": 221, "g": 255, "b": 0 }, { "r": 217, "g": 255, "b": 0 }, { "r": 212, "g": 255, "b": 0 }, { "r": 208, "g": 255, "b": 0 }, { "r": 204, "g": 255, "b": 0 }, { "r": 200, "g": 255, "b": 0 }, { "r": 195, "g": 255, "b": 0 }, { "r": 191, "g": 255, "b": 0 }, { "r": 187, "g": 255, "b": 0 }, { "r": 183, "g": 255, "b": 0 }, { "r": 179, "g": 255, "b": 0 }, { "r": 174, "g": 255, "b": 0 }, { "r": 170, "g": 255, "b": 0 }, { "r": 166, "g": 255, "b": 0 }, { "r": 162, "g": 255, "b": 0 }, { "r": 157, "g": 255, "b": 0 }, { "r": 153, "g": 255, "b": 0 }, { "r": 149, "g": 255, "b": 0 }, { "r": 145, "g": 255, "b": 0 }, { "r": 140, "g": 255, "b": 0 }, { "r": 136, "g": 255, "b": 0 }, { "r": 132, "g": 255, "b": 0 }, { "r": 128, "g": 255, "b": 0 }, { "r": 123, "g": 255, "b": 0 }, { "r": 119, "g": 255, "b": 0 }, { "r": 115, "g": 255, "b": 0 }, { "r": 110, "g": 255, "b": 0 }, { "r": 106, "g": 255, "b": 0 }, { "r": 102, "g": 255, "b": 0 }, { "r": 98, "g": 255, "b": 0 }, { "r": 94, "g": 255, "b": 0 }, { "r": 89, "g": 255, "b": 0 }, { "r": 85, "g": 255, "b": 0 }, { "r": 81, "g": 255, "b": 0 }, { "r": 77, "g": 255, "b": 0 }, { "r": 72, "g": 255, "b": 0 }, { "r": 68, "g": 255, "b": 0 }, { "r": 64, "g": 255, "b": 0 }, { "r": 60, "g": 255, "b": 0 }, { "r": 55, "g": 255, "b": 0 }, { "r": 51, "g": 255, "b": 0 }, { "r": 47, "g": 255, "b": 0 }, { "r": 42, "g": 255, "b": 0 }, { "r": 38, "g": 255, "b": 0 }, { "r": 34, "g": 255, "b": 0 }, { "r": 30, "g": 255, "b": 0 }, { "r": 26, "g": 255, "b": 0 }, { "r": 21, "g": 255, "b": 0 }, { "r": 17, "g": 255, "b": 0 }, { "r": 13, "g": 255, "b": 0 }, { "r": 8, "g": 255, "b": 0 }, { "r": 4, "g": 255, "b": 0 }, { "r": 0, "g": 255, "b": 0 }, { "r": 0, "g": 255, "b": 4 }, { "r": 0, "g": 255, "b": 8 }, { "r": 0, "g": 255, "b": 13 }, { "r": 0, "g": 255, "b": 17 }, { "r": 0, "g": 255, "b": 21 }, { "r": 0, "g": 255, "b": 25 }, { "r": 0, "g": 255, "b": 30 }, { "r": 0, "g": 255, "b": 34 }, { "r": 0, "g": 255, "b": 38 }, { "r": 0, "g": 255, "b": 42 }, { "r": 0, "g": 255, "b": 47 }, { "r": 0, "g": 255, "b": 51 }, { "r": 0, "g": 255, "b": 55 }, { "r": 0, "g": 255, "b": 60 }, { "r": 0, "g": 255, "b": 64 }, { "r": 0, "g": 255, "b": 68 }, { "r": 0, "g": 255, "b": 72 }, { "r": 0, "g": 255, "b": 77 }, { "r": 0, "g": 255, "b": 81 }, { "r": 0, "g": 255, "b": 85 }, { "r": 0, "g": 255, "b": 89 }, { "r": 0, "g": 255, "b": 94 }, { "r": 0, "g": 255, "b": 98 }, { "r": 0, "g": 255, "b": 102 }, { "r": 0, "g": 255, "b": 106 }, { "r": 0, "g": 255, "b": 111 }, { "r": 0, "g": 255, "b": 115 }, { "r": 0, "g": 255, "b": 119 }, { "r": 0, "g": 255, "b": 123 }, { "r": 0, "g": 255, "b": 128 }, { "r": 0, "g": 255, "b": 132 }, { "r": 0, "g": 255, "b": 136 }, { "r": 0, "g": 255, "b": 140 }, { "r": 0, "g": 255, "b": 144 }, { "r": 0, "g": 255, "b": 149 }, { "r": 0, "g": 255, "b": 153 }, { "r": 0, "g": 255, "b": 157 }, { "r": 0, "g": 255, "b": 162 }, { "r": 0, "g": 255, "b": 166 }, { "r": 0, "g": 255, "b": 170 }, { "r": 0, "g": 255, "b": 174 }, { "r": 0, "g": 255, "b": 179 }, { "r": 0, "g": 255, "b": 183 }, { "r": 0, "g": 255, "b": 187 }, { "r": 0, "g": 255, "b": 191 }, { "r": 0, "g": 255, "b": 195 }, { "r": 0, "g": 255, "b": 200 }, { "r": 0, "g": 255, "b": 204 }, { "r": 0, "g": 255, "b": 208 }, { "r": 0, "g": 255, "b": 212 }, { "r": 0, "g": 255, "b": 217 }, { "r": 0, "g": 255, "b": 221 }, { "r": 0, "g": 255, "b": 225 }, { "r": 0, "g": 255, "b": 229 }, { "r": 0, "g": 255, "b": 234 }, { "r": 0, "g": 255, "b": 238 }, { "r": 0, "g": 255, "b": 242 }, { "r": 0, "g": 255, "b": 247 }, { "r": 0, "g": 255, "b": 251 }, { "r": 0, "g": 255, "b": 255 }, { "r": 0, "g": 251, "b": 255 }, { "r": 0, "g": 247, "b": 255 }, { "r": 0, "g": 242, "b": 255 }, { "r": 0, "g": 238, "b": 255 }, { "r": 0, "g": 234, "b": 255 }, { "r": 0, "g": 229, "b": 255 }, { "r": 0, "g": 225, "b": 255 }, { "r": 0, "g": 221, "b": 255 }, { "r": 0, "g": 217, "b": 255 }, { "r": 0, "g": 212, "b": 255 }, { "r": 0, "g": 208, "b": 255 }, { "r": 0, "g": 204, "b": 255 }, { "r": 0, "g": 200, "b": 255 }, { "r": 0, "g": 195, "b": 255 }, { "r": 0, "g": 191, "b": 255 }, { "r": 0, "g": 187, "b": 255 }, { "r": 0, "g": 183, "b": 255 }, { "r": 0, "g": 178, "b": 255 }, { "r": 0, "g": 174, "b": 255 }, { "r": 0, "g": 170, "b": 255 }, { "r": 0, "g": 166, "b": 255 }, { "r": 0, "g": 162, "b": 255 }, { "r": 0, "g": 157, "b": 255 }, { "r": 0, "g": 153, "b": 255 }, { "r": 0, "g": 149, "b": 255 }, { "r": 0, "g": 145, "b": 255 }, { "r": 0, "g": 140, "b": 255 }, { "r": 0, "g": 136, "b": 255 }, { "r": 0, "g": 132, "b": 255 }, { "r": 0, "g": 128, "b": 255 }, { "r": 0, "g": 123, "b": 255 }, { "r": 0, "g": 119, "b": 255 }, { "r": 0, "g": 115, "b": 255 }, { "r": 0, "g": 111, "b": 255 }, { "r": 0, "g": 106, "b": 255 }, { "r": 0, "g": 102, "b": 255 }, { "r": 0, "g": 98, "b": 255 }, { "r": 0, "g": 94, "b": 255 }, { "r": 0, "g": 89, "b": 255 }, { "r": 0, "g": 85, "b": 255 }, { "r": 0, "g": 81, "b": 255 }, { "r": 0, "g": 76, "b": 255 }, { "r": 0, "g": 72, "b": 255 }, { "r": 0, "g": 68, "b": 255 }, { "r": 0, "g": 64, "b": 255 }, { "r": 0, "g": 60, "b": 255 }, { "r": 0, "g": 55, "b": 255 }, { "r": 0, "g": 51, "b": 255 }, { "r": 0, "g": 47, "b": 255 }, { "r": 0, "g": 43, "b": 255 }, { "r": 0, "g": 38, "b": 255 }, { "r": 0, "g": 34, "b": 255 }, { "r": 0, "g": 30, "b": 255 }, { "r": 0, "g": 25, "b": 255 }, { "r": 0, "g": 21, "b": 255 }, { "r": 0, "g": 17, "b": 255 }, { "r": 0, "g": 13, "b": 255 }, { "r": 0, "g": 8, "b": 255 }, { "r": 0, "g": 4, "b": 255 }, { "r": 0, "g": 0, "b": 255 }, { "r": 4, "g": 0, "b": 255 }, { "r": 8, "g": 0, "b": 255 }, { "r": 13, "g": 0, "b": 255 }, { "r": 17, "g": 0, "b": 255 }, { "r": 21, "g": 0, "b": 255 }, { "r": 25, "g": 0, "b": 255 }, { "r": 30, "g": 0, "b": 255 }, { "r": 34, "g": 0, "b": 255 }, { "r": 38, "g": 0, "b": 255 }, { "r": 42, "g": 0, "b": 255 }, { "r": 47, "g": 0, "b": 255 }, { "r": 51, "g": 0, "b": 255 }, { "r": 55, "g": 0, "b": 255 }, { "r": 60, "g": 0, "b": 255 }, { "r": 64, "g": 0, "b": 255 }, { "r": 68, "g": 0, "b": 255 }, { "r": 72, "g": 0, "b": 255 }, { "r": 76, "g": 0, "b": 255 }, { "r": 81, "g": 0, "b": 255 }, { "r": 85, "g": 0, "b": 255 }, { "r": 89, "g": 0, "b": 255 }, { "r": 93, "g": 0, "b": 255 }, { "r": 98, "g": 0, "b": 255 }, { "r": 102, "g": 0, "b": 255 }, { "r": 106, "g": 0, "b": 255 }, { "r": 111, "g": 0, "b": 255 }, { "r": 115, "g": 0, "b": 255 }, { "r": 119, "g": 0, "b": 255 }, { "r": 123, "g": 0, "b": 255 }, { "r": 128, "g": 0, "b": 255 }, { "r": 132, "g": 0, "b": 255 }, { "r": 136, "g": 0, "b": 255 }, { "r": 140, "g": 0, "b": 255 }, { "r": 144, "g": 0, "b": 255 }, { "r": 149, "g": 0, "b": 255 }, { "r": 153, "g": 0, "b": 255 }, { "r": 157, "g": 0, "b": 255 }, { "r": 162, "g": 0, "b": 255 }, { "r": 166, "g": 0, "b": 255 }, { "r": 170, "g": 0, "b": 255 }, { "r": 174, "g": 0, "b": 255 }, { "r": 179, "g": 0, "b": 255 }, { "r": 183, "g": 0, "b": 255 }, { "r": 187, "g": 0, "b": 255 }, { "r": 191, "g": 0, "b": 255 }, { "r": 195, "g": 0, "b": 255 }, { "r": 200, "g": 0, "b": 255 }, { "r": 204, "g": 0, "b": 255 }, { "r": 208, "g": 0, "b": 255 }, { "r": 213, "g": 0, "b": 255 }, { "r": 217, "g": 0, "b": 255 }, { "r": 221, "g": 0, "b": 255 }, { "r": 225, "g": 0, "b": 255 }, { "r": 230, "g": 0, "b": 255 }, { "r": 234, "g": 0, "b": 255 }, { "r": 238, "g": 0, "b": 255 }, { "r": 242, "g": 0, "b": 255 }, { "r": 247, "g": 0, "b": 255 }, { "r": 251, "g": 0, "b": 255 }, { "r": 255, "g": 0, "b": 255 }, { "r": 255, "g": 0, "b": 251 }, { "r": 255, "g": 0, "b": 247 }, { "r": 255, "g": 0, "b": 242 }, { "r": 255, "g": 0, "b": 238 }, { "r": 255, "g": 0, "b": 234 }, { "r": 255, "g": 0, "b": 230 }, { "r": 255, "g": 0, "b": 225 }, { "r": 255, "g": 0, "b": 221 }, { "r": 255, "g": 0, "b": 217 }, { "r": 255, "g": 0, "b": 212 }, { "r": 255, "g": 0, "b": 208 }, { "r": 255, "g": 0, "b": 204 }, { "r": 255, "g": 0, "b": 200 }, { "r": 255, "g": 0, "b": 195 }, { "r": 255, "g": 0, "b": 191 }, { "r": 255, "g": 0, "b": 187 }, { "r": 255, "g": 0, "b": 183 }, { "r": 255, "g": 0, "b": 179 }, { "r": 255, "g": 0, "b": 174 }, { "r": 255, "g": 0, "b": 170 }, { "r": 255, "g": 0, "b": 166 }, { "r": 255, "g": 0, "b": 161 }, { "r": 255, "g": 0, "b": 157 }, { "r": 255, "g": 0, "b": 153 }, { "r": 255, "g": 0, "b": 149 }, { "r": 255, "g": 0, "b": 144 }, { "r": 255, "g": 0, "b": 140 }, { "r": 255, "g": 0, "b": 136 }, { "r": 255, "g": 0, "b": 132 }, { "r": 255, "g": 0, "b": 128 }, { "r": 255, "g": 0, "b": 123 }, { "r": 255, "g": 0, "b": 119 }, { "r": 255, "g": 0, "b": 115 }, { "r": 255, "g": 0, "b": 111 }, { "r": 255, "g": 0, "b": 106 }, { "r": 255, "g": 0, "b": 102 }, { "r": 255, "g": 0, "b": 98 }, { "r": 255, "g": 0, "b": 94 }, { "r": 255, "g": 0, "b": 89 }, { "r": 255, "g": 0, "b": 85 }, { "r": 255, "g": 0, "b": 81 }, { "r": 255, "g": 0, "b": 77 }, { "r": 255, "g": 0, "b": 72 }, { "r": 255, "g": 0, "b": 68 }, { "r": 255, "g": 0, "b": 64 }, { "r": 255, "g": 0, "b": 60 }, { "r": 255, "g": 0, "b": 55 }, { "r": 255, "g": 0, "b": 51 }, { "r": 255, "g": 0, "b": 47 }, { "r": 255, "g": 0, "b": 43 }, { "r": 255, "g": 0, "b": 38 }, { "r": 255, "g": 0, "b": 34 }, { "r": 255, "g": 0, "b": 30 }, { "r": 255, "g": 0, "b": 26 }, { "r": 255, "g": 0, "b": 21 }, { "r": 255, "g": 0, "b": 17 }, { "r": 255, "g": 0, "b": 13 }, { "r": 255, "g": 0, "b": 8 }, { "r": 255, "g": 0, "b": 4 }]

let simplex;

// function HSVtoRGB(h, s, v) {
//     let r, g, b, i, f, p, q, t;
//     if (arguments.length === 1) {
//         s = h.s, v = h.v, h = h.h;
//     }
//     i = Math.floor(h * 6);
//     f = h * 6 - i;
//     p = v * (1 - s);
//     q = v * (1 - f * s);
//     t = v * (1 - (1 - f) * s);
//     switch (i % 6) {
//         case 0: r = v, g = t, b = p; break;
//         case 1: r = q, g = v, b = p; break;
//         case 2: r = p, g = v, b = t; break;
//         case 3: r = p, g = q, b = v; break;
//         case 4: r = t, g = p, b = v; break;
//         case 5: r = v, g = p, b = q; break;
//     }
//     return {
//         r: Math.round(r * 255),
//         g: Math.round(g * 255),
//         b: Math.round(b * 255)
//     };
// }

function show(context) {
    let start = performance.now();
    let imgData = context.createImageData(context.canvas.width, context.canvas.height);
    if (document.getElementById("mode_hue").checked) {
        for (let x = map.length; x-- > 0;) {
            for (let y = map[x].length; y-- > 0;) {
                let colour = hueRGB[Math.round((map[x][y] / detail) * 360)];
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
    console.log(`Drawing time: ${performance.now() - start}ms`);
}

function smooth(context) {
    let w = document.getElementById("flat").checked ? 1 : document.getElementById("sphere").checked ? 2 : 3;
    //Create copy of map so that the smoothing algo isn't
    //affected by the order in which pixels are smoothed
    let tMap = map.map(arr => arr.slice());
    let r = parseInt(document.getElementById("neighbour_range").value);
    let start = performance.now();
    for (let x = map.length; x-- > 0;) {
        for (let y = map[x].length; y-- > 0;) {
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
    let start = performance.now();
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
                    map[x][y] = Math.floor((simplex.noise2D(x * kSimplex, y * kSimplex) + 1) / 2 * detail);  // This assigns an hsv value based on simplex noise.
                }
            }
            break;
    }
    console.log(`Generation time: ${performance.now() - start}ms`);
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
