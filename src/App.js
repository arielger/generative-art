import React from "react";
import P5Wrapper from "react-p5-wrapper";
import "./App.css";

import shader1 from "./sketches/shader-1";
import noiseMidi from "./sketches/noise-midi";
import noise from "./sketches/noise";
import mouse from "./sketches/mouse";
import loop from "./sketches/loop";
import blendMode from "./sketches/blendMode";
import shapes from "./sketches/shapes";

const sketches = [shader1, noiseMidi, noise, mouse, loop, blendMode, shapes];

function App() {
  const showButton = false;

  const [currentSketch, setCurrentSketch] = React.useState(0);

  const moveToNextSketch = React.useCallback(() => {
    setCurrentSketch((currentSketch) =>
      currentSketch + 1 >= sketches.length ? 0 : currentSketch + 1
    );
  }, []);

  return (
    <div className="App">
      {showButton && (
        <button className="next-btn" onClick={moveToNextSketch}>
          Current sketch: {currentSketch + 1}/{sketches.length} | Next >>
        </button>
      )}
      <P5Wrapper sketch={sketches[currentSketch]} />
    </div>
  );
}

export default App;
