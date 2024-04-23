import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import AppRouter from './router/Router';
import store from './common/store';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
