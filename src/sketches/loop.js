export default function sketch(p) {
  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
  };

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.draw = function () {
    const figures = 10;
    p.background(0, 0, 0, 10);
    p.noFill();
    p.stroke(255);

    const time = p.millis() / 1000;
    const duration = 5;

    // Center of the screen
    const x = p.width / 2;
    const y = p.height / 2;
    const size = 50;

    p.rectMode(p.CENTER); // https://p5js.org/reference/#/p5/rectMode

    for (let index = 0; index < figures; index++) {
      const playhead =
        (time / duration + p.map(index, 0, figures - 1, 0, 1)) % 1;
      const anim = p.sin(playhead * p.PI * 2);

      const positiveAnim = anim * 0.5 + 0.5;

      p.push();
      p.strokeWeight(positiveAnim * 5);
      p.translate(
        x + anim * size * 5,
        y + p.map(index, 0, figures - 1, -5, 5) * size
      );
      p.rotate(playhead * p.PI * 2 * index);
      p.rect(0, 0, size, size, (positiveAnim * size) / 2);
      p.pop();
    }
  };
}
