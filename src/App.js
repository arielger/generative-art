import React from "react";
import P5Wrapper from "react-p5-wrapper";
import "./App.css";

import noise2 from "./sketches/noise2";
import noise from "./sketches/noise";
import mouse from "./sketches/mouse";
import loop from "./sketches/loop";
import blendMode from "./sketches/blendMode";
import shapes from "./sketches/shapes";

const sketches = [noise2, noise, mouse, loop, blendMode, shapes];

function App() {
  const [currentSketch, setCurrentSketch] = React.useState(0);

  const moveToNextSketch = React.useCallback(() => {
    setCurrentSketch((currentSketch) =>
      currentSketch + 1 >= sketches.length ? 0 : currentSketch + 1
    );
  }, []);

  return (
    <div className="App">
      <button className="next-btn" onClick={moveToNextSketch}>
        Current sketch: {currentSketch + 1}/{sketches.length} | Next >>
      </button>
      <P5Wrapper sketch={sketches[currentSketch]} />
    </div>
  );
}

export default App;
