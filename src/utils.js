/**
 * Credits to https://github.com/DavidDurman/FlexiColorPicker and raphaeljs
 * Modifications done by this repository contributors
 */

/**
 * Convert HSV representation to RGB HEX string.
 * Credits to http://www.raphaeljs.com
 */
export const hsv2rgb = hsv => {
  var R, G, B, X, C;
  var h = (hsv.h % 360) / 60;

  C = hsv.v * hsv.s;
  X = C * (1 - Math.abs((h % 2) - 1));
  R = G = B = hsv.v - C;

  h = ~~h;
  R += [C, X, 0, 0, X, C][h];
  G += [X, C, C, X, 0, 0][h];
  B += [0, 0, X, C, C, X][h];

  var r = Math.floor(R * 255);
  var g = Math.floor(G * 255);
  var b = Math.floor(B * 255);
  return {
    r: r,
    g: g,
    b: b,
  };
};

/**
 * Convert RGB representation to HSV.
 * r, g, b can be either in <0,1> range or <0,255> range.
 * Credits to http://www.raphaeljs.com
 */
export const rgb2hsv = rgb => {
  var r = rgb.r;
  var g = rgb.g;
  var b = rgb.b;

  if (rgb.r > 1 || rgb.g > 1 || rgb.b > 1) {
    r /= 255;
    g /= 255;
    b /= 255;
  }

  var H, S, V, C;
  V = Math.max(r, g, b);
  C = V - Math.min(r, g, b);
  H =
    C == 0
      ? null
      : V == r
      ? (g - b) / C + (g < b ? 6 : 0)
      : V == g
      ? (b - r) / C + 2
      : (r - g) / C + 4;
  H = (H % 6) * 60;
  S = C == 0 ? 0 : C / V;
  return { h: H, s: S, v: V };
};

export const hsv2hex = hsv => {
  const rgbHex = hsv2rgb(hsv);
  return '#' + (16777216 | rgbHex.b | (rgbHex.g << 8) | (rgbHex.r << 16)).toString(16).slice(1);
};

export const rgb2hex = hsv => hsv2hex(rgb2hsv(rgb));
export const hex2rgb = hex => ({
  r: parseInt(hex.substr(1, 2), 16),
  g: parseInt(hex.substr(3, 2), 16),
  b: parseInt(hex.substr(5, 2), 16),
});
export const hex2hsv = hex => rgb2hsv(hex2rgb(hex));
