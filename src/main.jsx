import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginRegister from './components/LoginRegister/LoginRegister';
import MainPage from './components/MainPage/MainPage';
import './main.scss';
import { Provider } from 'react-redux';
import store from './States/store';

const router = createBrowserRouter([
  {
    path: '/LoginRegister',
    element: <LoginRegister />,
  },

  {
    path: '/',
    element: <MainPage />,
  },
]);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
