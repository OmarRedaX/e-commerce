import React, { useEffect } from 'react';
import style from "./Brands.module.css";
import { Link } from 'react-router-dom';
import useBrands from '../../Hooks/useBrands';


export default function Brands() {

  let {data, isError, isLoading,error} = useBrands();
  console.log(data);

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
  {data?.data?.data?.map((brand)=><Link key={brand._id} to={`/specificbrand/${brand.name}`}><div className='m-7' >
      <img src={brand.image} alt={brand.slug} className='w-full md:h-[200px] object-cover'/>
      <h4 className='text-center'>{brand.name}</h4>
    </div></Link>)}
    </div>

</>
   
  
}
