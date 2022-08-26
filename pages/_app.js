import '../styles/globals.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import store from '../src/features/configureStore';
import { Provider } from 'react-redux';

config.autoAddCss = false

function MyApp({ Component, pageProps }) {
  return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    )
}

export default MyApp
