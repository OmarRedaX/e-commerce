import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Cart from './Components/Cart/Cart';
import Brands from './Components/Brands/Brands';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Categories from './Components/Categories/Categories';
import Products from './Components/Products/Products';
import Notfound from './Components/Notfound/Notfound';
import '@fortawesome/fontawesome-free/css/all.min.css';
import UserContextProvider from './Context/UserContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import CartContextProvider from './Context/CartContext';
import { Toaster } from 'react-hot-toast';
import SpecificCategory from './Components/SpecificCategory/SpecificCategory'
import SpecificBrand from './Components/SpecificBrand/SpecificBrand';
import Checkout from './Components/Checkout/Checkout';
import Allorders from './Components/Allorders/Allorders';
import WishList from './Components/WishList/WishList';
import WishListContextProvider from "./Context/WishListContext";



let query = new QueryClient();


let x = createBrowserRouter([
  {path:"",element:<Layout/>,children: [
    {index:true,element: <ProtectedRoute> <Home/> </ProtectedRoute> },
    {path:"cart",element:<ProtectedRoute> <Cart/> </ProtectedRoute>},
    {path:"brands",element:<ProtectedRoute> <Brands/> </ProtectedRoute>},
    {path:"specificbrand/:brand",element:<ProtectedRoute> <SpecificBrand/> </ProtectedRoute>},
    {path:"productdetails/:id/:category",element:<ProtectedRoute> <ProductDetails/> </ProtectedRoute>},
    {path:"specificcategory/:id/:category",element:<ProtectedRoute> <SpecificCategory/> </ProtectedRoute>},
    {path:"register",element:<Register/>},
    {path:"login",element:<Login/>} ,
    {path:"categories",element:<ProtectedRoute> <Categories/> </ProtectedRoute>},
    {path:"products",element:<ProtectedRoute> <Products/> </ProtectedRoute>},
    {path:"checkout",element:<ProtectedRoute> <Checkout/> </ProtectedRoute>},
    {path:"allorders",element:<ProtectedRoute> <Allorders/> </ProtectedRoute>},
    {path:"wishlist/productdetails/:id/:category",element:<ProtectedRoute> <ProductDetails/> </ProtectedRoute>},
    {path:"wishlist",element:<ProtectedRoute> <WishList/> </ProtectedRoute>},
    {path:"*",element:<Notfound/> },
  ]}
  
])

function App() {

  return<> 
  
  <UserContextProvider>
    <QueryClientProvider client={query}>
      <CartContextProvider>
        <WishListContextProvider>
          <RouterProvider router={x}></RouterProvider>
          <Toaster/>
        </WishListContextProvider>
      </CartContextProvider>
      <ReactQueryDevtools/>
    </QueryClientProvider> 
  </UserContextProvider>
  
  </>
}

export default App
