export default function sketch(p) {
  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
  };

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.draw = function () {
    p.background(0);
    p.noFill();
    p.strokeJoin(p.ROUND); // https://p5js.org/reference/#/p5/strokeJoin
    p.stroke(255);

    // Make the stroke width relative to the canvas

    const dim = p.min(p.width, p.height);
    p.strokeWeight(dim * 0.0025);

    // Center of the screen
    const x = p.width / 2;
    const y = p.height / 2;
    const size = 200;

    p.rectMode(p.CENTER); // https://p5js.org/reference/#/p5/rectMode
    p.rect(x, y, size, size);
    p.ellipse(x, y, size, size);
    p.triangle(
      x,
      y - size / 2,
      x - size / 2,
      y + size / 2,
      x + size / 2,
      y + size / 2
    );
  };
}
