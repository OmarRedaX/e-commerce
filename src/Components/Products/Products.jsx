import React, { useContext, useEffect, useState } from 'react';
import style from "./Products.module.css";
import RecentProducts from '../RecentProducts/RecentProducts';

export default function Products() {
  

 useEffect(()=>{
  document.title= "products"
 },[])

  return <>
  
  <RecentProducts/>
   
  </>
   
  
}
