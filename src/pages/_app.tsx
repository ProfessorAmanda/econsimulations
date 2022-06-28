import type { AppProps } from 'next/app'
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'katex/dist/katex.min.css';
import '../styles/dark-unica.css'; // for HighCharts in ScatterPlot
import '../styles/MarzEg.css'; // for react-collapse in Collapsable
import PropTypes from 'prop-types';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}


MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired
}
