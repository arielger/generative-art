function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export default function sketch(p) {
  p.drawNoiseLine = function ({ lineIndex, lines }) {
    const lineYInterpolation = lineIndex / (lines - 1);
    const lineSteps = 10;

    p.beginShape();
    for (let index = 0; index < lineSteps; index++) {
      // From 0 to 1
      const lineXInterpolation = index / (lineSteps - 1);

      const x = p.lerp(0, p.width, lineXInterpolation);
      let y = p.lerp(0, p.height, lineYInterpolation);

      y += getRandomInt(100);

      p.vertex(x, y);
    }
    p.endShape();
  };

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);

    p.mouseX = p.width / 2;
    p.mouseY = p.height / 2;

    p.frameRate(15);
  };

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.draw = function () {
    p.background(0);
    p.noFill();
    p.strokeWeight(1);
    p.stroke(255);

    const lines = 10;

    for (let index = 0; index < lines; index++) {
      p.drawNoiseLine({ lineIndex: index, lines });
    }
  };
}
