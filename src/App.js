import React from "react";
import P5Wrapper from "react-p5-wrapper";
import styles from "./App.module.css";

import shader1 from "./sketches/shader-1";
import noiseMidi from "./sketches/noise-midi";
import noise from "./sketches/noise";
import mouse from "./sketches/mouse";
import loop from "./sketches/loop";

const sketches = [
  {
    title: "mouse interaction",
    sketch: mouse,
  },
  {
    title: "shapes",
    sketch: loop,
  },
  {
    title: "midi",
    sketch: noiseMidi,
  },
  {
    title: "noise",
    sketch: noise,
  },
  {
    title: "shader test",
    sketch: shader1,
  },
];

function App() {
  const [currentSketch, setCurrentSketch] = React.useState(null);

  return (
    <div className={styles.container}>
      {typeof currentSketch === "number" ? (
        <>
          <button
            className={styles.goBackBtn}
            onClick={() => setCurrentSketch(null)}
          >
            take me back
          </button>
          <P5Wrapper sketch={sketches[currentSketch].sketch} />
        </>
      ) : (
        <div className={styles.intro}>
          <h1>🌎 / generative art </h1>
          {sketches.map(({ title, sketch }, i) => (
            <div className={styles.sketchItem}>
              <h2>{title}</h2>
              <button onClick={() => setCurrentSketch(i)}>
                show me now!!!
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
