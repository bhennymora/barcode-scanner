import './App.css';
import BarcodeTextField from './BarcodeTextField';

function App() {
  return (
    <div className="App">
      <div id="scanner-container" />
      <div>
        <p style={{ display: "inline-block" }}>Barcode: </p>
        <BarcodeTextField style={{ display: "inline-block" }} />
      </div>
    </div>
  );
}

export default App;
