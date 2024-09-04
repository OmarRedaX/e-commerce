import React, { useContext, useEffect, useState } from 'react';
import style from "./Cart.module.css";
import { CartContext } from '../../Context/CartContext';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';



export default function Cart() {

  let {getLoggedUserCart,updateCartProductQuantity,deleteCartItem,clearUserCart , setnumberItems, numberItems} = useContext(CartContext);

  const [CartDetails, setCartDetails] = useState(null);
  
  const [cartNumber, setcartNumber] = useState(null);

  const [loading, setloading] = useState(false);

  const [currentId, setcurrentId] = useState(0);

  const [loadingOpen, setloadingOpen] = useState(false);

  const [loadingRemove, setloadingRemove] = useState(false);

  



  async function getCartItems(){
    
    let response =await getLoggedUserCart();

    if(response.data.status == "success"){
      console.log(response);
      
      setloading(false);
      setloadingOpen(false);
      setCartDetails(response.data.data);
      setcartNumber(response.data.numOfCartItems);
      
    }
  }


  async function updateProduct(id,count){
    setcurrentId(id)
    setloading(true);

    if(count == 0){
      deleteItem(id);
    }

    else{
      let response =await updateCartProductQuantity(id,count);


      if(response.data.status == "success"){
        setloading(false);
        setCartDetails(response.data.data);
        setcartNumber(response.data.numOfCartItems);
        toast.success("Product updated successfully",{
          style:{
            border:"1px solid green",
            color:"green",
            padding:"10px"
          }
        })
      }
      else{
        setloading(false);
        toast.error("Error")
      }
    }

    

  }


  async function deleteItem(productId) {
    setcurrentId(productId);
    setloadingRemove(true);
    let response =  await deleteCartItem(productId);
  
    if(response.data.status == "success"){
      setnumberItems(numberItems-1);
      setloadingRemove(false);
      setCartDetails(response.data.data);
      setcartNumber(response.data.numOfCartItems);
      toast.error("Product deleted successfully",{
        style:{
          border:"1px solid red",
          color:"red",
          padding:"10px"
        }
      })
    }
    
  }

  async function clearCart() {
    setloadingOpen(true);
    let response = await clearUserCart();
    getCartItems();
    if(response.data.message == "success"){
      setnumberItems(0);
      setloadingOpen(false);
      
      toast.error("All items deleted successfully",{
        style:{
          border:"1px solid red",
          color:"red",
          padding:"10px"
        }
      })
      
    }
   


  }


  useEffect(()=>{
    setloadingOpen(true);
    getCartItems();
  },[])


  return <>
  
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
</> : <>{CartDetails?.products.length >0 ? <>
<div className=" relative overflow-x-auto shadow-md sm:rounded-lg mt-10  ">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
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
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      {CartDetails?.products.map((product)=><><tr key={product.product.id} className="bg-white border-b  hover:bg-gray-50">
        {loadingRemove && currentId == product.product.id ?<><td></td><td></td><i className="fas fa-spinner fa-spin py-16 px-6"></i></>:<><td className="p-4">
          <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.product.title.split(" ").slice(0,2).join(" ")} />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 ">
          {product.product.title.split(" ").slice(0,2).join(" ")}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            {loading && currentId == product.product.id ?<button disabled className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 " type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button> : <button onClick={()=>updateProduct(product.product.id,product.count-1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 " type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button> }
            <div>
              {loading && currentId == product.product.id ? <>
                
                <i className="fas fa-spinner fa-spin"></i>
                     
                </> : <span>{product.count}</span>}
            </div>
            {loading && currentId == product.product.id ? <button disabled className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 " type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button> :<button onClick={()=>updateProduct(product.product.id,product.count+1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 " type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>}
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {product.price} <span className='text-emerald-600'>$</span> 
        </td>
        <td className="px-6 py-4">
          <span onClick={()=>deleteItem(product.product.id)} className="font-medium text-red-600  hover:underline cursor-pointer"><i class="fa-solid fa-trash-can text-lg"></i></span>
        </td></>}
      </tr></>)}

     
  
    </tbody>


  </table>

  <div className="flex justify-between items-center">

        {<Link to={`/checkout`}><td className="px- md:px-3"><button className='py-3 px-12 bg-emerald-600 text-white rounded'>Checkout</button></td></Link>}
       
       <td className="py-5  md:px-20"><span className="text-lg ">Subtotal ({cartNumber} items): <span className="text-black font-bold">{CartDetails?.totalCartPrice} EGP</span> </span></td>
      



     </div>
</div>

<div className='my-3'>
<span onClick={()=>clearCart()} className="font-medium text-red-600  hover:underline cursor-pointer md:ml-6 ml-1">Remove all items <i class="fa-solid fa-trash-can text-lg"></i></span>
</div>
</> :<> <h1 className='capitalize text-lg md:text-3xl text-emerald-500 font-bold text-center my-20'><i className="fa-solid fa-cart-shopping fa-spin mx-6"></i> No product added <i className="fa-solid fa-cart-shopping fa-spin fa-spin-reverse mx-6"></i></h1></>}</>}

    




  
  </>
   
  
}
