import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props){

    const [cartId, setcartId] = useState(0);

    const [numberItems, setnumberItems] = useState(0);

    const [cartOwner, setcartOwner] = useState(0);

    let headers = {
        token:localStorage.getItem("userToken"),
    }

    function addProductToCart(productId){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{productId: productId},{headers})
        .then((res)=>res)
        .catch((err)=>err)
    }

    function getLoggedUserCart(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{headers})
        .then((res)=>{
            setcartOwner(res.data.data.cartOwner);
            setnumberItems(res.data.numOfCartItems);
            setcartId(res.data.data._id);
            return res;
        })
        .catch((err)=>err)
    }

    function updateCartProductQuantity(productId,newCount){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count:newCount},{headers})
        .then((res)=>res)
        .catch((err)=>err)
    }

    function deleteCartItem(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{headers})
        .then((res)=>res)
        .catch((err)=>err)
    }

    function clearUserCart(){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{headers})
        .then((res)=>res)
        .catch((err)=>err)
    }

    function Checkout(cartId,url,formData){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,{
            shippingAddress : formData
        },{headers})
        .then((res)=>res)
        .catch((err)=>err)
    }

    useEffect(()=>{
        getLoggedUserCart();
    },[])





    return <CartContext.Provider value={{addProductToCart, getLoggedUserCart ,updateCartProductQuantity ,deleteCartItem ,clearUserCart ,Checkout,cartId ,setnumberItems ,numberItems,cartOwner}}>
        {props.children}
    </CartContext.Provider>

}