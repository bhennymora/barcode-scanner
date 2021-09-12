import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { ScanSettings, Barcode } from "scandit-sdk";
import QuaggaBarcode from "./QuaggaBarcode";
import ScanditBarcode from "./ScanditBarcode"
import './App.css';

export default function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/quagga">Quagga Barcode</Link>
            </li>
            <li>
              <Link to="/scandit">Scandit Barcode</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/quagga">
            <div id="scanner-container" />
            <div>
              <p style={{ display: "inline-block" }}>Barcode: </p>
              <QuaggaBarcode style={{ display: "inline-block" }} />
			      </div>
          </Route>
          <Route exact path="/scandit">
            <div id="scandit-barcode-result" />
            <ScanditBarcode 
              playSoundOnScan={true}
              vibrateOnScan={true}
              scanningPaused={false}
              videoFit={false}
              accessCamera={true}
              scanSettings={
                new ScanSettings({
                  enabledSymbologies: ["qr", "ean8", "ean13", "upca", "upce", "code128", "code39", "code93", "itf"],
                  codeDuplicateFilter: 1000
                })
              }
              onScan={scanResult => {
                document.getElementById("scandit-barcode-result").innerHTML = scanResult.barcodes.reduce(function(
                  string,
                  barcode
                ) {
                  return string + Barcode.Symbology.toHumanizedName(barcode.symbology) + ": " + barcode.data + "<br>";
                },
                "");
              }}
              onError={error => {
                console.error(error.message);
              }}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
