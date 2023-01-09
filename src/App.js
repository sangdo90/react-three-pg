import "./App.css";
import { Canvas } from "@react-three/fiber";
import Cylinder3d from "./components/Cylinder3d";
import { Scroll, ScrollControls } from "@react-three/drei";
import { Items } from "./components/Items";
import { Stars } from "./components/Stars";
// import { Gallery } from "./components/Gallery";

function App() {
  return (
    <>
      {/* <div className="section">
        <Canvas
          orthographic
          camera={{ zoom: 80 }}
          gl={{ alpha: false, antialias: false, stencil: false, depth: false }}
          dpr={[1, 1.5]}
        >
          <color attach="background" args={["#f0f0f0"]} />
          <ScrollControls damping={6} pages={5}>
            <Items />
            <Scroll html style={{ width: "100%" }}>
              <h1
                style={{
                  position: "absolute",
                  top: `100vh`,
                  right: "20vw",
                  fontSize: "25em",
                  transform: `translate3d(0,-100%,0)`,
                }}
              >
                all
              </h1>
              <h1 style={{ position: "absolute", top: "180vh", left: "10vw" }}>
                hail
              </h1>
              <h1 style={{ position: "absolute", top: "260vh", right: "10vw" }}>
                thee,
              </h1>
              <h1 style={{ position: "absolute", top: "350vh", left: "10vw" }}>
                thoth
              </h1>
              <h1 style={{ position: "absolute", top: "450vh", right: "10vw" }}>
                her
                <br />
                mes.
              </h1>
            </Scroll>
          </ScrollControls>
        </Canvas>
      </div> */}
      <div className="section">
        {/* <div className="section-title">MADAPP</div> */}
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Stars />
        </Canvas>
      </div>

      {/* <div className="section">
        <Gallery />
      </div> */}
    </>
  );
}

export default App;
