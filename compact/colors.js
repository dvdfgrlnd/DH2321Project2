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
function generateHSVColors(names)
{
    var i = 360 / (names.length - 1); // distribute the colors evenly on the hue range
    var r = []; // hold the generated colors
    for (var x=0; x<names.length; x++)
    {
        r[names[x]]=hsv2rgb(hsvToRgb(i * x, 200, 100)); // you can also alternate the saturation and value for even more contrast between the colors
    }
    return r;
}
var hsv2rgb = function(hsv) {
    console.log(hsv);
  var h = hsv[0], s = hsv[1], v = hsv[2];
  var rgb, i, data = [];
  if (s === 0) {
    rgb = [v,v,v];
  } else {
    h = h / 60;
    i = Math.floor(h);
    data = [v*(1-s), v*(1-s*(h-i)), v*(1-s*(1-(h-i)))];
    switch(i) {
      case 0:
        rgb = [v, data[2], data[0]];
        break;
      case 1:
        rgb = [data[1], v, data[0]];
        break;
      case 2:
        rgb = [data[0], v, data[2]];
        break;
      case 3:
        rgb = [data[0], data[1], v];
        break;
      case 4:
        rgb = [data[2], data[0], v];
        break;
      default:
        rgb = [v, data[0], data[1]];
        break;
    }
  }
  return '#' + rgb.map(function(x){ 
    return ("0" + Math.round(x*255).toString(16)).slice(-2);
  }).join('');
};
function hsvToRgb(h, s, v) {
	var r, g, b;
	var i;
	var f, p, q, t;
 
	// Make sure our arguments stay in-range
	h = Math.max(0, Math.min(360, h));
	s = Math.max(0, Math.min(100, s));
	v = Math.max(0, Math.min(100, v));
 
	// We accept saturation and value arguments from 0 to 100 because that's
	// how Photoshop represents those values. Internally, however, the
	// saturation and value are calculated from a range of 0 to 1. We make
	// That conversion here.
	s /= 100;
	v /= 100;
 
	if(s == 0) {
		// Achromatic (grey)
		r = g = b = v;
		return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
	}
 
	h /= 60; // sector 0 to 5
	i = Math.floor(h);
	f = h - i; // factorial part of h
	p = v * (1 - s);
	q = v * (1 - s * f);
	t = v * (1 - s * (1 - f));
 
	switch(i) {
		case 0:
			r = v;
			g = t;
			b = p;
			break;
 
		case 1:
			r = q;
			g = v;
			b = p;
			break;
 
		case 2:
			r = p;
			g = v;
			b = t;
			break;
 
		case 3:
			r = p;
			g = q;
			b = v;
			break;
 
		case 4:
			r = t;
			g = p;
			b = v;
			break;
 
		default: // case 5:
			r = v;
			g = p;
			b = q;
	}
 
	return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}