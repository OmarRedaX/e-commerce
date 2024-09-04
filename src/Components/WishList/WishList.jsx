import React, { useContext, useEffect, useState } from 'react'
import style from "./WishList.module.css"
import { WishListContext } from '../../Context/WishListContext'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'

export default function WishList() {

  let {getAllWishList,count,setCount} = useContext(WishListContext);

  const [allList, setAllList] = useState([]);

  const [loading, setloading] = useState(false);


  let { addProductToCart, setnumberItems, numberItems } = useContext(CartContext);

  let { removeProductFromWishList } = useContext(WishListContext);

  const [currentId, setcurrentId] = useState(0);

  const [loadingRemove, setloadingRemove] = useState(false);




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


  async function getWishList(){

    let {data} = await getAllWishList()
    // console.log(data);
    setAllList(data.data)
  }



  async function removeFromWishList(id) {

    setloadingRemove(true);
    setcurrentId(id);

    let {data} = await removeProductFromWishList(id)
    // console.log(data);

    if(data.status == "success"){
      setloadingRemove(false);
      setCount(count - 1)
      toast.error(data.message,{
          style:{
            border:"2px solid red",
            color:"red",
            padding:"10px"
          }
        });
    }
    
    else{
      setloadingRemove(false);
      toast.error(data.message)
    }
  }



  useEffect(() => {
    getWishList()
  } , [allList])
  
  

  return <>
      
  <div className="row">
    {allList?.length != 0? <>{allList?.length > 0? allList?.map((product)=> (
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
          {loadingRemove && currentId == product.id ?  <button disabled className='btnr mt-2 w-1/5 '><i className="fas fa-spinner fa-spin"></i></button> : <button  onClick={() => removeFromWishList(product.id)}  className='btnr mt-2 w-1/5'><i class="fa-solid fa-trash-can"></i></button>}

        </div>

      

      </div>)) : (  
          <div className=" mt-72 mx-auto">
          <div className="sk-chase">
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
          </div>
          </div>) }</>  : <>
          <h1 className='capitalize text-base md:text-3xl text-emerald-500 font-bold text-center my-20 mx-auto'><i className="fa-solid fa-cart-shopping fa-spin md:mx-6 "></i> No products in the wishlist <i className="fa-solid fa-cart-shopping fa-spin fa-spin-reverse md:mx-6"></i></h1>
          </>}

  </div>

  </>
}