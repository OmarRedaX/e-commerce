import React, { useContext } from 'react';
import style from "./Navbar.module.css";
import logo from "../../assets/freshcart-logo.svg";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from './../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';
import { WishListContext } from '../../Context/WishListContext';





export default function Navbar() {

  let navigate = useNavigate();
  let {userLogin,setuserLogin} = useContext(UserContext);
  let {numberItems} = useContext(CartContext);
  let {count} = useContext(WishListContext);


  function signout(){

    localStorage.removeItem("userToken");
    setuserLogin(null);
    navigate("/login")

  }
  
  return <>
  


  <nav className="bg-slate-200 border-gray-200 fixed top-0 left-0 right-0 z-50">
  
  <div className="flex flex-wrap items-center justify-between mx-auto py-4 px-5 md:px-20">

    <div className="flex items-center gap-5">

      {userLogin != null? <>
      
        <NavLink to="" className="flex items-center space-x-3 rtl:space-x-reverse">

          <img src={logo} className="h-8" alt="Fresh cart Logo" />

        </NavLink>
      
      </> : <>
      
        <NavLink to="/login" className="flex items-center space-x-3 rtl:space-x-reverse">

          <img src={logo} className="h-8" alt="Fresh cart Logo" />

        </NavLink>

      </>}

        {userLogin != null? <>
        
          <ul className="flex gap-4 sm:hidden md:flex font-medium mt-1">

            <li className="hover:text-emerald-500"><NavLink className="hover:text-emerald-500" to="">Home</NavLink></li>
            <li className="hover:text-emerald-500"><NavLink className="hover:text-emerald-500" to="cart">Cart</NavLink></li>
            <li className="hover:text-emerald-500"><NavLink className="hover:text-emerald-500" to="products">Products</NavLink></li>
            <li className="hover:text-emerald-500"><NavLink className="hover:text-emerald-500" to="categories">Categories</NavLink></li>
            <li className="hover:text-emerald-500"><NavLink className="hover:text-emerald-500" to="brands">Brands</NavLink></li>
            <li className="hover:text-emerald-500"><NavLink className="hover:text-emerald-500" to="allorders">Orders</NavLink></li>
            <li className="hover:text-emerald-500 px-2">
              <NavLink className='cursor-pointer hover:text-emerald-500' to="cart">
              <i className="fa-solid fa-cart-shopping relative cursor-pointer">
                <div className='absolute top-[-13px] right-[-13px] size-4 bg-red-600 rounded-full text-white flex items-center justify-center text-xs'>{numberItems}</div>
              </i>
              </NavLink>

            </li>

            <li className="hover:text-emerald-500 px-2">
              <NavLink className='cursor-pointer hover:text-emerald-500' to="wishlist">
              <i className="fa-solid fa-list relative cursor-pointer">
                <div className='absolute top-[-13px] right-[-13px] size-4 bg-red-600 rounded-full text-white flex items-center justify-center text-xs'>{count}</div>
              </i>
              </NavLink>

            </li>

          </ul>
        
        </>:null}
        
    </div>

    <button data-collapse-toggle="navbar-dropdown" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 " aria-controls="navbar-dropdown" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>

    <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">

      <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:space-x-6 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  ">

        <div className="icons">
          <ul className="flex flex-row gap-5 md:gap-0 justify-center font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:space-x-3 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  " >
            
            <li>
              <i className="fab fa-facebook"></i>
            </li>
            <li>
              <i className="fab fa-linkedin"></i>
            </li>
            <li>
              <i className="fab fa-youtube"></i>
            </li>
            <li>
              <i className="fab fa-tiktok"></i>
            </li>
            <li>
              <i className="fab fa-twitter"></i>
            </li>

          </ul>
        
        </div>

        <div className="menu md:hidden">

        {userLogin != null? <>
        
          <ul className="flex flex-row flex-wrap gap-5 md:gap-0 justify-center font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:space-x-3 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">

          <li className="hover:text-emerald-500"><NavLink className="hover:text-emerald-500" to="">Home</NavLink></li>
            <li className="hover:text-emerald-500"><NavLink className="hover:text-emerald-500" to="cart">Cart</NavLink></li>
            <li className="hover:text-emerald-500"><NavLink className="hover:text-emerald-500" to="products">Products</NavLink></li>
            <li className="hover:text-emerald-500"><NavLink className="hover:text-emerald-500" to="categories">Categories</NavLink></li>
            <li className="hover:text-emerald-500"><NavLink className="hover:text-emerald-500" to="brands">Brands</NavLink></li>
            <li className="hover:text-emerald-500"><NavLink className="hover:text-emerald-500" to="allorders">Orders</NavLink></li>
            <li className="hover:text-emerald-500 px-2">
              <NavLink className='cursor-pointer hover:text-emerald-500' to="cart">
              <i className="fa-solid fa-cart-shopping relative cursor-pointer">
                <div className='absolute top-[-13px] right-[-13px] size-4 bg-red-600 rounded-full text-white flex items-center justify-center text-xs'>{numberItems}</div>
              </i>
              </NavLink>

            </li>

            <li className="hover:text-emerald-500 px-2">
              <NavLink className='cursor-pointer hover:text-emerald-500' to="wishlist">
              <i className="fa-solid fa-list relative cursor-pointer">
                <div className='absolute top-[-13px] right-[-13px] size-4 bg-red-600 rounded-full text-white flex items-center justify-center text-xs'>{count}</div>
              </i>
              </NavLink>

            </li>

        </ul>
      
      </>:null}

        </div>


        <div className="links flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:space-x-4 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
    

          {userLogin != null?<>
            <li>
              <span onClick={signout} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-emerald-500  md:border-0  md:p-0 cursor-pointer text-center">SignOut</span>
            </li>
          </>:<>
            
            <li>
              <NavLink to="login" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-emerald-500  md:p-0 text-center">Login</NavLink>
            </li>
            <li>
              <NavLink to="register" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-emerald-500 md:border-0 md:p-0 text-center">Register</NavLink>
            </li>
            
          </>}
        
          
          
      
          </div>

      </ul>  
    
    </div>

  </div>

</nav>




  
  </>
   
  
}
