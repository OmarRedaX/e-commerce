import React, { useContext, useEffect, useState } from 'react';
import style from "./RecentProducts.module.css";
import { Link } from 'react-router-dom';
import {useQuery} from "@tanstack/react-query";
import useProducts from '../../Hooks/useProducts';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { WishListContext } from "../../Context/WishListContext";




export default function RecentProducts() {

  let {data, isError, isLoading,error} = useProducts();

  let {addProductToCart,setnumberItems,numberItems} = useContext(CartContext);

  let { addToWishList,count,setCount } = useContext(WishListContext);

  const [loading, setloading] = useState(false);

  const [currentId, setcurrentId] = useState(0);
  const [currentIdWish, setcurrentIdWish] = useState(0);

  async function addToCart(id){

    setloading(true);
    setcurrentId(id);

    let response = await addProductToCart(id);

      if(response.data.status == "success"){
        setloading(false);
        setnumberItems(numberItems+1);

        toast.success(response.data.message,{
          duration: 2000,
          style:{
            border:"2px solid green",
            color:"green",
            padding:"10px"
          }
        });
      }
      else{
        setloading(false);
        toast.error(response.data.message,{
          style:{
            border:"2px solid red",
            color:"red",
            padding:"10px"
          }
        });
      }

  }

  async function addToWish(id) {

    setloading(true);
    setcurrentIdWish(id);

    let { data } = await addToWishList(id);

    //  console.log(data);
    if (data.status == "success") {
      setloading(false);
      setCount(count + 1)
      
      toast.success(data.message,{
        style:{
          border:"1px solid yellow",
          color:"green",
          padding:"10px"
        }
        });
    }
  }


  if(isError){
    return <h3>{error}</h3>
  }

  if(isLoading){
    return <>
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
    </>
  }



  return <>
  
    <div className="row">
      {data?.data?.data.map((product)=> (
        <div key={product.id} className="xl:w-1/6 md:w-1/4 ">

        
        
          <div className="product my-3 py-2 px-4">

            <Link to={`/productdetails/${product.id}/${product.category.name}`}>

              <img src={product.imageCover} className="w-full" alt={product.slug} />
              <h3 className=" text-emerald-500 mt-2">{product.category.name}</h3>
              <h3 className="font-semibold mb-1">{product.title.split(" ").slice(0,2).join(" ")}</h3>

              <div className='flex justify-between mt-2'>
                <span>{product.price} EGP</span>
                <span><i className='fas fa-star text-yellow-300'></i>{product.ratingsAverage}</span>
              </div>

            </Link>

            {loading && currentId == product.id ?  <button disabled className='btn mt-2 w-3/4 mx-1'><i className="fas fa-spinner fa-spin"></i></button> : <button onClick={()=>addToCart(product.id)}  className='btn mt-2 w-3/4 mx-1'>Add to cart</button>}
            {loading && currentIdWish == product.id ?  <button disabled className='btny mt-2 w-1/5 '><i className="fas fa-spinner fa-spin"></i></button> : <button  onClick={() => addToWish(product.id)}  className='btny mt-2 w-1/5'><i class="fa-solid fa-list"></i></button>}

          </div>

        

        </div>)) }

    </div>
  
  </>
   
  
}
