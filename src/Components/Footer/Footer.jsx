import React from 'react';
import style from "./Footer.module.css";
import amazon from "../../assets/amazonPay.png";
import american from "../../assets/americanExpress.png";
import mastercard from "../../assets/mastercard.png";
import paypal from "../../assets/paypal.png";
import appleStore from "../../assets/appleStore.png";
import googlePlay from "../../assets/googlePlay.png"

export default function Footer() {
  return <>
  
    <div className='bg-slate-200 border-gray-200 absolute left-0 right-0 px-10 py-12 '>

      <h2 className='text-3xl py-2'>Get the FreshCart app</h2>
      <p className='text-gray-400 pb-4'>we will send you a link, open it on your phone to download the app</p>
      
      <form className="mx-auto">
        <div className="relative">
          
          <div className='flex flex-wrap'>

            <div className='w-4/5'>
              <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full ps-2 p-2.5 " placeholder="name@example.com" />
            </div>

            <div className='md:w-1/5 w-full'>
            <button disabled className='bg-emerald-600 text-white py-2 2xl:px-14 2xl:mx-8 mt-3 md:mt-0 md:px-8 px-20 '>Share App Link</button>
            </div>
             
          </div>
          
        </div>
      </form>

      <div className='mt-10 border-t border-b border-gray-300 md:flex justify-between items-center'>

        <div className='py-6 flex gap-4 items-center'>
          <span>Payment Partners</span>
          <img src={amazon} alt="amazon" className='w-10 cursor-pointer'/>
          <img src={american} alt="american" className='w-6 cursor-pointer'/>
          <img src={mastercard} alt="mastercard" className='w-6 cursor-pointer'/>
          <img src={paypal} alt="paypal" className='w-6 cursor-pointer'/>
        </div>


        <div className='flex flex-wrap gap-2 items-center mr-28'>
          <span>Get deliveries with FreshCart</span>
          <img src={appleStore} alt="appleStore" className='w-24 cursor-pointer' />
          <img src={googlePlay} alt="googlePlay" className='w-[89px] cursor-pointer'/>
        </div>

      </div>



    </div>
    
  
  </>
   
  
}
