import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import AppRouter from './router/Router';
import store from './common/store';
import { Toaster } from './components/ui/sonner';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
        <Toaster />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
