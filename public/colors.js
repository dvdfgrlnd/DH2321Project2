var Colors = {};
Colors.names = {
    darkorchid: "#9932cc",
    gold: "#ffd700",
    lightblue: "#add8e6",
    navy: "#000080",
    orange: "#ffa500",
    fuchsia: "#ff00ff",
    maroon: "#800000",
    lime: "#00ff00",
    darkkhaki: "#bdb76b",
    violet: "#800080",
    darkblue: "#00008b",
    darkcyan: "#008b8b",
    darkgreen: "#006400",
    red: "#ff0000",
    darkmagenta: "#8b008b",
    darkolivegreen: "#556b2f",
    lightcyan: "#e0ffff",
    darkorange: "#ff8c00",
    darkred: "#8b0000",
    darksalmon: "#e9967a",
    darkviolet: "#9400d3",
    darkgrey: "#a9a9a9",
    silver: "#c0c0c0",
    green: "#008000",
    aqua: "#00ffff",
    brown: "#a52a2a",
    black: "#000000",
    khaki: "#f0e68c",
    indigo: "#4b0082",
    lightgreen: "#90ee90",
    blue: "#0000ff",
    lightgrey: "#d3d3d3",
    lightpink: "#ffb6c1",
    lightyellow: "#ffffe0",
    magenta: "#ff00ff",
    olive: "#808000",
    pink: "#ffc0cb",
    purple: "#800080",
    white: "#ffffff",
    yellow: "#ffff00"
};
function generateColors(names) {
    var r = {}; // hold the generated colors
    var count = 0;
    for (var prop in Colors.names) {
        r[names[count++]]=(Colors.names[prop]);
        if (count >= names.length)
            break;
    }
    return r;
}