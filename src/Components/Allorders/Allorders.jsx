import React, { useContext, useEffect, useState } from "react";
import style from "./Allorders.module.css";
import axios from "axios";

export default function Allorders() {

  const [allOrders, setAllOrders] = useState([]);

  const [loadingOpen, setloadingOpen] = useState(false);



  async function getAllOrders() {
    
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/`);
    //console.log(data.data);
    setAllOrders(data.data);
    setloadingOpen(false);
  }


  useEffect(() => {
    setloadingOpen(true);
    getAllOrders();
  }, []);



  return (
    <>
      {loadingOpen? <>
        <div className='row'>
   <div className=" my-24 mx-auto">
      <div className="sk-chase">
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
      </div>
      </div>
      </div>  

</> : <>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">

        <table className="w-full text-sm text-left rtl:text-right text-gray-500">

          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
                <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                    Product
                </th>
                <th scope="col" className="px-6 py-3">
                    Qty
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
            </tr>
          </thead>

    <tbody>

    {allOrders.map((order) => <> {order.cartItems.map((item) => <>

        <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

            <td className="p-4">
                <img src={item.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt=""/>
            </td>

            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {item.product.title.split(" ").slice(0, 2).join(" ")}
            </td>
            
            <td className="px-6 py-4">
                <div className="flex items-center">
                    
                    <div>
                        <span  className=" w-14  text-gray-900 text-sm   px-2.5 py-1">{item.count}</span>
                    </div>
                    
                </div>

            </td>

            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {item.price} $
            </td> 
              </tr>
            </>
            )}  </> )}

 
    </tbody>

    </table>
</div>  

</>}


    </>
  );

}



  