import '../styles/globals.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import store from '../src/features/configureStore';
import Header from '../src/components/Layout/Header';
import Footer from '../src/components/Layout/Footer'
import { Provider } from 'react-redux';

config.autoAddCss = false

function MyApp({ Component, pageProps }) {
  return (
      <Provider store={store}>
        <Header></Header>
        <Component {...pageProps} />
        <Footer></Footer>
      </Provider>
    )
}

export default MyApp
