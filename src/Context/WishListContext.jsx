import axios from "axios";
import React, { useEffect, useState } from "react";
import { createContext } from "react";

export let WishListContext = createContext();

export default function WishListContextProvider(props) {
    
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  const [count, setCount] = useState(0)



  function addToWishList(productId) {

    return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId: productId,},{headers,})
        .then((res) => {return res})
        .catch((res) => res);
  }


  function getAllWishList(){

  return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers,})
    .then((res) => {
        // console.log(res.data.count);
        setCount(res.data.count)
      return res;
    })
    .catch((res) => res)
  }


  function removeProductFromWishList(id){
  return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{headers,})
    .then((res) => res)
    .catch((res) => res)
  }

  useEffect(()=>{
    getAllWishList();
},[])


  return (
    <WishListContext.Provider value={{addToWishList,getAllWishList,count,setCount,removeProductFromWishList}}>
      {props.children}
    </WishListContext.Provider>
  );

}