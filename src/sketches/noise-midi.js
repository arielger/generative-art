import SimplexNoise from "simplex-noise";

const simplex = new SimplexNoise();

// 📚 Resources for this experiment

// What is OpenSimplex noise? -->  https://www.youtube.com/watch?v=Lv9gyZZJPE0
// Perlin noise --> http://web.archive.org/web/20160530124230/http://freespace.virgin.net/hugo.elias/models/m_perlin.htm

let configParams = {
  frequency: {
    value: 0.5,
    range: [0.5, 5],
  },
  amplitude: {
    value: 0.05,
    range: [0.05, 0.5],
  },
  strokeWeight: {
    value: 0.2,
    range: [0.2, 10],
  },
  backgroundFill: {
    value: 255,
    range: [255, 0],
  },
  velocity: {
    value: 3000,
    range: [3000, 100],
  },
  lines: {
    value: 5,
    range: [5, 20],
  },
  color1: {
    value: 0,
    range: [0, 1],
  },
  color2: {
    value: 0,
    range: [0, 1],
  },
};

/* MIDI CONFIGURATION (using Impact LX88+ keyboard) */

const CONFIGURATION_KNOB_RANGE = [30, 37];
const CONFIGURATION_VALUES_RANGE = [0, 127];
const CONFIGURATION_COMMAND_CODE = 191;

const handleMidiInput = (p) => (message) => {
  const [command, knobNumber, value] = message.data;

  if (
    command === CONFIGURATION_COMMAND_CODE &&
    knobNumber >= CONFIGURATION_KNOB_RANGE[0] &&
    knobNumber <= CONFIGURATION_KNOB_RANGE[1]
  ) {
    const configParamsKeys = Object.keys(configParams);
    // Map knob number to 0 to n number
    const knobIndex = knobNumber - CONFIGURATION_KNOB_RANGE[0];

    // Automatically change config param based on configParams order
    const configToChange = configParamsKeys[knobIndex];

    // If there is no config for the knob just return
    if (!configToChange) return;

    // Map knob value (1 to 127) to variable config range
    const mappedValue = p.map(
      value,
      ...CONFIGURATION_VALUES_RANGE,
      ...configParams[configToChange].range
    );
    configParams[configToChange].value = mappedValue;
  }
};

/******************/

let lineSteps = 200;

export default function sketch(p) {
  p.drawNoiseLine = function ({
    lineIndex,
    lines,
    time,
    frequency,
    amplitude,
  }) {
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

      const noise = simplex.noise3D(
        lineXInterpolation * frequency,
        lineYInterpolation * frequency,
        time
      );

      y += noise * amplitude;

      const fromColor = p.color(222, 16, 134);
      const toColor = p.color(50, 186, 234);
      p.stroke(p.lerpColor(fromColor, toColor, noise));

      p.vertex(x, y);
    }
    p.endShape();
  };

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);

    // p.mouseX = p.width / 2;
    // p.mouseY = p.height / 2;

    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

      function onMIDISuccess(midiAccess) {
        console.log(midiAccess);

        for (var input of midiAccess.inputs.values()) {
          input.onmidimessage = handleMidiInput(p);
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
    p.background(0, 0, 0, configParams.backgroundFill.value);
    p.noFill();
    p.strokeWeight(configParams.strokeWeight.value);
    const time = p.millis() / configParams.velocity.value;

    const lines = configParams.lines.value;

    // Uncomment code to activate mouse interaction
    // const frequency = p.lerp(frequencyRange[0], frequencyRange[1], p.mouseX / p.width);
    // const amplitude = p.lerp(amplitudeRange[0], amplitudeRange[1], p.mouseY / p.height);

    for (let index = 0; index < lines; index++) {
      p.drawNoiseLine({
        lineIndex: index,
        lines,
        time: time * 0.5,
        frequency: configParams.frequency.value,
        amplitude: configParams.amplitude.value * p.height,
      });
    }
  };
}
