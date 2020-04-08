import SimplexNoise from "simplex-noise";

const simplex = new SimplexNoise();

// Resources for this experiment
// What is OpenSimplex noise? -->  https://www.youtube.com/watch?v=Lv9gyZZJPE0
// Perlin noise --> http://web.archive.org/web/20160530124230/http://freespace.virgin.net/hugo.elias/models/m_perlin.htm

const frequencyRange = [0.5, 5];
const amplitudeRange = [0.1, 2];

const CONFIGURATION_COMMAND_CODE = 191;

let lineSteps = 200;

const handleMidiInput = (message) => {
  const [command, knobNumber, value] = message.data;
  // Only enable tried piano knobs
  if (
    command === CONFIGURATION_COMMAND_CODE &&
    knobNumber >= 30 &&
    knobNumber <= 37
  ) {
    lineSteps = value;
  }
};

export default function sketch(p) {
  p.drawNoiseLine = function ({ lineIndex, lines, time, frequency, amplitude }) {
    const lineYInterpolation = lineIndex / (lines - 1);

    p.beginShape();
    for (let index = 0; index < lineSteps; index++) {
      // From 0 to 1
      const lineXInterpolation = index / (lineSteps - 1);

      const x = p.lerp(0, p.width, lineXInterpolation);
      let y = p.lerp(
        lineYInterpolation * p.height,
        lineYInterpolation * p.height,
        lineXInterpolation
      );

      const noise =
        simplex.noise3D(
          lineXInterpolation * frequency + time,
          lineYInterpolation * frequency,
          time
        ) * amplitude;

      y += noise;

      p.vertex(x, y);
    }
    p.endShape();
  };

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);

    p.mouseX = p.width / 2;
    p.mouseY = p.height / 2;

    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

      function onMIDISuccess(midiAccess) {
        console.log(midiAccess);

        for (var input of midiAccess.inputs.values()) {
          input.onmidimessage = handleMidiInput;
        }
      }

      function onMIDIFailure() {
        console.log("Could not access your MIDI devices.");
      }
    } else {
      console.log("WebMIDI is not supported in this browser.");
    }

    p.frameRate(30);
  };

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.draw = function () {
    p.background(0);
    p.noFill();
    p.strokeWeight(3);
    p.stroke(255);

    const time = p.millis() / 1000;

    const lines = 10;

    const frequency = p.lerp(frequencyRange[0], frequencyRange[1], p.mouseX / p.width);
    const amplitude = p.lerp(amplitudeRange[0], amplitudeRange[1], p.mouseY / p.height);

    for (let index = 0; index < lines; index++) {
      p.drawNoiseLine({ lineIndex: index, lines, time: time * 0.5, frequency, amplitude: amplitude * p.height });
    }
  };
}
