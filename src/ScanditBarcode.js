import React, { Component } from "react";
import PropTypes from "prop-types";
import { configure, BarcodePicker as ScanditSDKBarcodePicker } from "scandit-sdk";

// Configure the library and activate it with a license key
const configurationPromise = configure(
  "AWjQHT4GH1suKd4clyAclO0HPe0zPEMNQBB20fxsIk7baoYMsHam4lxsHDGpEoN1T0/mhss6DKBqZMA5NnjqsidTkPNmSbb+liwhwaBYLkp4SG+2SHNiEGRcJdzfFP/3XkMOfR1EfCxZImk3G41w+8SvHajjBAyYFNTb5TCiFqpiInRTB/VYVVe7THOSqHQB2oWBLr9ibi7kelTmaEjUSXhbetIpH5wtMrPSYgVr/gNPqsG6gg+eqDXcW/wcM5Ugcgv3TZm8+l2vnoH0f3mQkNAx4Mefg0oPL6Xjb4TuUFBOgLsB9zMKAMHizNncKm7csnMvI6VzFCLKC5MhaGIZKXLKq6F2N7RacQj2/7q575IeiCY2gMnB23vpdYWbN1boHM6SNXEJYhBonYCUNX3uv4DTPByg6pFqt5b8CAJWn5av+1AEmh5xrcOp4vinwAv2CNbH3couL7R10y4sktkHsy7TlRV438EIKwdd9Dvv9sKnFbPoz5YjaAsLmbf7ihJq0LK0UXlKucRfQGgLSDfiBZbDsxqQIE3F3uvd7ZqWU6amWWSHV0KqULDq0Q3KCuBXew8dB5FfkcrZXCoQttJGTjN9P9nmKS2rZlrduEracHbBEFOqLwUQA71fPki14TEOJ9NfT3NDuhU95uoSVGh59JpRPiht8kwcUpY4UsvBWy1nyAgrXEOxhrsTbNWQn+QP7PRrqwVM80LIOtOF7gFOz0QyflplhlVVI2M+wMbS7Co6ApMrQgdRLMJEb3KTbTObd1GBZQD0Jcao8xgg5UJVjHUqcPnROEBXVd+WWJYA9GYq+0hNAkCPA5ThXf0="
  ,{
    engineLocation: "https://cdn.jsdelivr.net/npm/scandit-sdk@5.x/build",
  }
).catch((error) => {
  alert(error);
});

const style = {
  position: "absolute",
  top: "0",
  bottom: "0",
  left: "0",
  right: "0",
  margin: "auto",
  maxWidth: "480px",
  maxHeight: "320px",
};

class ScanditBarcode extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    playSoundOnScan: PropTypes.bool,
    vibrateOnScan: PropTypes.bool,
    scanningPaused: PropTypes.bool,
    guiStyle: PropTypes.string,
    videoFit: PropTypes.string,
    scanSettings: PropTypes.object,
    enableCameraSwitcher: PropTypes.bool,
    enableTorchToggle: PropTypes.bool,
    enableTapToFocus: PropTypes.bool,
    enablePinchToZoom: PropTypes.bool,
    accessCamera: PropTypes.bool,
    camera: PropTypes.object,
    cameraSettings: PropTypes.object,
    targetScanningFPS: PropTypes.number,
    onScan: PropTypes.func,
    onError: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    configurationPromise.then(() => {
      ScanditSDKBarcodePicker.create(this.ref.current, this.props).then((barcodePicker) => {
        this.barcodePicker = barcodePicker;
        if (this.props.onScan != null) {
          barcodePicker.on("scan", this.props.onScan);
        }
        if (this.props.onError != null) {
          barcodePicker.on("scanError", this.props.onError);
        }
      });
    });
  }

  componentWillUnmount() {
    if (this.barcodePicker != null) {
      this.barcodePicker.destroy();
    }
  }

  componentDidUpdate(prevProps) {
    // These are just some examples of how to react to some possible property changes

    if (JSON.stringify(prevProps.scanSettings) !== JSON.stringify(this.props.scanSettings)) {
      this.barcodePicker.applyScanSettings(this.props.scanSettings);
    }

    if (prevProps.visible !== this.props.visible) {
      this.barcodePicker.setVisible(this.props.visible);
    }
  }

  render() {
    return <div ref={this.ref} style={style} />;
  }
}

export default ScanditBarcode;