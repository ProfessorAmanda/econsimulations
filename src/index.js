import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'katex/dist/katex.min.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import { unregister } from './registerServiceWorker';

unregister();

ReactDOM.render(<App />, document.getElementById("root")); // eslint-disable-line
// registerServiceWorker();
