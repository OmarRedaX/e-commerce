import React, { useContext, useEffect, useState } from 'react';
import style from "./ProductDetails.module.css";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { WishListContext } from "../../Context/WishListContext";



export default function ProductDetails() {

  let { addToWishList,count,setCount } = useContext(WishListContext);

  const [currentIdWish, setcurrentIdWish] = useState(0);

  const [product, setproduct] = useState(null);

  const [realatedProduct, setrealatedProduct] = useState([]);

  let {id,category} = useParams();

  let {addProductToCart,setnumberItems ,numberItems} = useContext(CartContext);

  const [loading, setloading] = useState(false);

  const [currentId, setcurrentId] = useState(0);
  

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:2000,
  }

  var setting = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]

  };

  

  function getProduct(id){
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    .then((res)=>{
      setproduct(res.data.data)
    })
    .catch((res)=>{console.log(res);})
  }


  function getAllProducts(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    .then((res)=>{
      let related = res.data.data.filter((product)=>product.category.name == category);
      setrealatedProduct(related);
    })
  }


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


  useEffect(()=>{
    getProduct(id);
    getAllProducts();
  },[id,category])


  return <>
  
  
    <div className="row items-center mt-10">

      <div className="md:w-1/4 w-full">
        <Slider {...settings}>
        {product?.images.map((src)=><img src={src} className='w-full'/>)}
        </Slider>
      </div>

      <div className="md:w-3/4 p-4">
        <h3 className='font-semibold capitalize text-2xl'>{product?.title}</h3>
        <h4 className='text-gray-400 my-4'>{product?.description}</h4>
        <h4 className=' mt-4 font-semibold'>{product?.category.name}</h4>

        <div className='flex justify-between mt-8'>
            <span className='font-semibold'>{product?.price} EGP</span>
            <span ><i className='fas fa-star text-yellow-300 px-0.5'></i>{product?.ratingsAverage}</span>
        </div>

        {loading && currentId == product.id ?  <button disabled className='btn mt-2 w-3/4 mx-1'><i className="fas fa-spinner fa-spin"></i></button> : <button onClick={()=>addToCart(product.id)}  className='btn mt-2 w-3/4 mx-1'>Add to cart</button>}
          {loading && currentIdWish == product.id ?  <button disabled className='btny mt-2 w-1/5 '><i className="fas fa-spinner fa-spin"></i></button> : <button  onClick={() => addToWish(product.id)}  className='btny mt-2 w-1/5'><i class="fa-solid fa-list"></i></button>}

      </div>

    </div>

    <h2 className='font-bold md:text-2xl mt-52 px-5 text-xl'>Products related to this item</h2>

    <div className="slider-container">
      <Slider className='mb-6' {...setting}>
      { realatedProduct?.length > 0?  realatedProduct?.map((product)=> (
        <div key={product.id} className="md:w-1/6">

        
        
          <div className="product my-3 py- px-4">

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
          </div>)}

          </Slider>
          </div>
  
  </>
   
  
}
