import React, { useEffect, useState } from 'react';
import style from "./CategoriesSlider.module.css";
import axios from 'axios';
import Slider from "react-slick";
import useCategories from '../../Hooks/useCategories';
import { Link } from 'react-router-dom';




export default function CategoriesSlider() {
  
  let {data, isError, isLoading,error} = useCategories();

  
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
    autoplay:true,
    autoplaySpeed:3000,
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

  <div className=" px-3 my-3">
    <h2 className='text-xl'>Shop Popular Categories</h2>
  <div className="slider-container">
    <Slider {...settings}>
      {data?.data?.data.map((category)=> <Link key={category._id} to={`/specificcategory/${category._id}/${category.name}`}><div >
        <img src={category.image} alt={category.slug} className='w-full h-[200px] object-cover'/>
        <h4 className='text-center'>{category.name}</h4>
      </div></Link>)}
    </Slider>
  </div>
  </div>
  
  </>
   
  
}
