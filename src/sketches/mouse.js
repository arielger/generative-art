export default function sketch(p) {
  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);

    p.mouseX = p.width / 2;
    p.mouseY = p.height / 2;
  };

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.draw = function () {
    p.background(0);
    p.noFill();
    p.stroke(255);
    p.strokeWeight(1);

    const dt = p.deltaTime / 1000;

    const blockSize = 500;
    const gridSize = 10;
    const cellSize = blockSize / gridSize;

    const gridStartX = p.width / 2 - blockSize / 2;
    const gridStartY = p.height / 2 - blockSize / 2;

    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        p.push();
        p.stroke(255);
        p.translate(
          gridStartX + x * cellSize + cellSize / 2,
          gridStartY + y * cellSize + cellSize / 2
        );
        console.log(
          "atan2:",
          p.mouseY - gridStartY + y * cellSize + cellSize / 2,
          p.mouseX - gridStartX + x * cellSize + cellSize / 2
        );
        console.log("p.mouseY:", p.mouseY);
        console.log(
          "gridStartY + y * cellSize + cellSize / 2:",
          gridStartY + y * cellSize + cellSize / 2
        );
        p.rotate(
          p.atan2(
            p.mouseY - (gridStartY + y * cellSize + cellSize / 2),
            p.mouseX - (gridStartX + x * cellSize + cellSize / 2)
          )
        );
        p.line(
          -cellSize * 0.25,
          -cellSize * 0.25,
          cellSize * 0.25,
          cellSize * 0.25
        );
        p.pop();
        p.stroke(255, 255, 255, 25);
        p.rect(
          gridStartX + x * cellSize,
          gridStartY + y * cellSize,
          cellSize,
          cellSize
        );
      }
    }
  };
}
