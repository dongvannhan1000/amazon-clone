import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Layout from './pages/Layout.jsx'
import Home from './pages/Home.jsx'
// import Checkout from './pages/Checkout.jsx'
// import Orders from './pages/Orders.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <Layout />,
        children: [
          { index: true, element: <Home /> },
          // { path: "checkout", element: <Checkout /> },
          // { path: "orders", element: <Orders /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)