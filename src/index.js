import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { 
  createBrowserRouter, 
  RouterProvider 
} from 'react-router-dom';

import store from './store';

import Template from './components/template/template.component';
import ProductDetail from './pages/product-detail/productDetail.component';
import ProductList from './pages/product-list/productList.component';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Template />,
    children: [
      {
        index: true,
        element: <ProductList />,
      },
      {
        path:'productDetail/:id',
        element: <ProductDetail />,
      }
    ]
  }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
);
