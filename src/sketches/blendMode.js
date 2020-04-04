export default function sketch(p) {
  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);

    p.noLoop();
  };

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.draw = function () {
    p.background(0);
    p.fill(255);
    p.blendMode(p.DIFFERENCE);

    // Center of the screen
    const x = p.width / 2;
    const y = p.height / 2;
    const size = 200;

    p.rectMode(p.CENTER); // https://p5js.org/reference/#/p5/rectMode
    p.ellipse(x, y, size, size);
    p.translate(size / 2, 0);
    p.ellipse(x, y, size, size);
    p.translate(0, -size / 4);
    p.rect(x, y, size, size);
  };
}
