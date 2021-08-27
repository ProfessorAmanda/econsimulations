import '@testing-library/jest-dom';

// need to mock these two functions as Plotly runs in the browser, while tests run in Node
// see https://github.com/plotly/react-plotly.js/issues/115
window.HTMLCanvasElement.prototype.getContext = () => {};  // eslint-disable-line
window.URL.createObjectURL = () => {};  // eslint-disable-line

// tests with jsx-highcharts weren't working - grabbed this from the jsx-highcharts repo, tests run now?
const nodeCrypto = require('crypto');
window.crypto = {
  getRandomValues: function (buffer) {
    return nodeCrypto.randomFillSync(buffer);
  }
};
