import React from "react";
import Quagga from "quagga"; // ES6
import "./App.css";

var _scannerIsRunning = false;

class QuaggaBarcode extends React.Component {
  constructor(props) {
    super(props);
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (_scannerIsRunning) {
      Quagga.stop();
    } else {
      this.startScanner();
    }
  }

  startScanner() {
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector("#scanner-container"),
          constraints: {
            width: 480,
            height: 320,
            facingMode: "environment"
          }
        },
        decoder: {
          readers: [
            "code_128_reader",
            "ean_reader",
            "ean_8_reader",
            "code_39_reader",
            "code_39_vin_reader",
            "codabar_reader",
            "upc_reader",
            "upc_e_reader",
            "i2of5_reader"
          ],
          debug: {
            showCanvas: true,
            showPatches: true,
            showFoundPatches: true,
            showSkeleton: true,
            showLabels: true,
            showPatchLabels: true,
            showRemainingPatchLabels: true,
            boxFromPatches: {
              showTransformed: true,
              showTransformedBox: true,
              showBB: true
            }
          }
        }
      },
      function(err) {
        if (err) {
          alert("You need a camera to scan barcodes.");
          console.log(err);
          document.querySelector("#scanner-container").innerHTML = "";

          return;
        }

        console.log("Initialization finished. Ready to start");
        Quagga.start();

        // Set flag to is running
        //_scannerIsRunning = true;
      }
    );

    Quagga.onProcessed(function(result) {
      var drawingCtx = Quagga.canvas.ctx.overlay,
        drawingCanvas = Quagga.canvas.dom.overlay;

      if (result) {
        if (result.boxes) {
          drawingCtx.clearRect(
            0,
            0,
            parseInt(drawingCanvas.getAttribute("width")),
            parseInt(drawingCanvas.getAttribute("height"))
          );
          result.boxes
            .filter(function(box) {
              return box !== result.box;
            })
            .forEach(function(box) {
              Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                color: "green",
                lineWidth: 2
              });
            });
        }

        if (result.box) {
          Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
            color: "#00F",
            lineWidth: 2
          });
        }

        if (result.codeResult && result.codeResult.code) {
          Quagga.ImageDebug.drawPath(
            result.line,
            { x: "x", y: "y" },
            drawingCtx,
            { color: "red", lineWidth: 3 }
          );
        }
      }
    });

    Quagga.onDetected(function(result) {
      Quagga.stop();
      document.querySelector("#text-input").value = result.codeResult.code;
      document.querySelector("#scanner-container").innerHTML = "";
      console.log(
        "Barcode detected and processed : [" + result.codeResult.code + "]",
        result
      );
    });
  }

  render() {
    return (
      <div style={{ display: "inline-block" }}>
        <input type="text" id="text-input" />
        <button onClick={this.handleClick}> Scan </button>
      </div>
    );
  }
}

export default QuaggaBarcode;
