import '@testing-library/jest-dom';

// need to mock these two functions as Plotly runs in the browser, while tests run in Node
// see https://github.com/plotly/react-plotly.js/issues/115
window.HTMLCanvasElement.prototype.getContext = () => {};
window.URL.createObjectURL = () => {};
