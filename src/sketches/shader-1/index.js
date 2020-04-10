// 📚 Resources for this experiment

// Getting started - shaders https://learnopengl.com/Getting-started/Shaders

let shader;

export default function sketch(p) {
  p.preload = function () {
    shader = p.loadShader(
      `${process.env.PUBLIC_URL}/shaders/vertexShader.vert`,
      `${process.env.PUBLIC_URL}/shaders/fragmentShader.frag`,
      () => {
        console.log("Success loading shaders");
      },
      () => {
        console.log("ERROR loading shaders");
      }
    );
  };

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
  };

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.draw = function () {
    p.shader(shader);
    p.rect(0, 0, p.windowWidth, p.windowHeight);
  };
}
