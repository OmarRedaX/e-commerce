import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';




export default function Checkout() {

  let {Checkout,cartId} = useContext(CartContext);


    // formik
    let formik = useFormik({

      initialValues: {
        details:"",
        phone:"",
        city:"",
      },
  
      onSubmit: ()=> handleCheckout(cartId, `http://localhost:5173`),
  
    });



  async function handleCheckout(cartId ,url){

    let {data} =await Checkout(cartId ,url, formik.values);
    // console.log(data.session.url);
    window.location.href = data.session.url;
  }







  return <>
  
  
  <div className='my-28 md:px-52'>

    

    <h2 className='font-bold text-3xl text-emerald-600 mb-11 text-center'>Checkout Now</h2>

      <form onSubmit={formik.handleSubmit} className=" mx-auto">


        <div className="relative z-0 w-full mb-8 group">
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.details} type="text" name="details" id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " />
            <label htmlFor="details" className="left-0 peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Details</label>
            {formik.errors.details && formik.touched.details? (<div className="text-red-600 bg-red-200 mt-4 p-3 border border-red-400"><span>{formik.errors.details}</span></div>) : null}
        </div>

         <div className="relative z-0 w-full mb-8 group">
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "  />
            <label htmlFor="phone" className="left-0 peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
            {formik.errors.phone && formik.touched.phone? (<div className="text-red-600 bg-red-200 mt-4 p-3 border border-red-400"><span>{formik.errors.phone}</span></div>) : null}
        </div>  

         <div className="relative z-0 w-full mb-8 group">
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.city} type="text" name="city" id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "  />
            <label htmlFor="city" className="left-0 peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
            {formik.errors.city && formik.touched.city? (<div className="text-red-600 bg-red-200 mt-4 p-3 border border-red-400"><span>{formik.errors.city}</span></div>) : null}
        </div>  

       

        <button type="submit" className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-6">Checkout</button>
      
      </form>

  </div>

  
  </>
   
  
}
