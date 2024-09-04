import React, { useEffect, useState } from 'react';
import style from "./Categories.module.css";
import axios from 'axios';
import useCategories from '../../Hooks/useCategories';
import { Link } from 'react-router-dom';

export default function Categories() {

  let {data, isError, isLoading,error} = useCategories();
  
  
  if(isError){
    return <h3>{error}</h3>
  }

  if(isLoading){
    return <>
    <div className='row'>
       <div className=" my-36 mx-auto">
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
  
    <div className='row my-4'>
    {data?.data?.data?.map((category)=><Link key={category._id} to={`/specificcategory/${category._id}/${category.name}`}><div className='m-7' >
        <img src={category.image} alt={category.slug} className='w-full md:h-[200px] object-cover'/>
        <h4 className='text-center'>{category.name}</h4>
      </div></Link>)}
      </div>
  
  </>
   
  
}
