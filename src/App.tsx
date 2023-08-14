import Button from "./components/atom/button/Button";
import FlyUpload from "./components/template";

function App() {
  const testCloud = (
    <div>
      <center>
        <Button>Click to Upload</Button>
      </center>
    </div>
  );

  return (
    <FlyUpload apiKey="uf_69d199474935482a90d7257e00b9cf06">
      {testCloud}
    </FlyUpload>
  );
}

export default App;
