import React from 'react';
import style from "./MainSlider.module.css";
import Slider from "react-slick";
import slider1 from "../../assets/slider-image-1.jpeg";
import slider2 from "../../assets/slider-image-2.jpeg";
import slider3 from "../../assets/slider-image-3.jpeg";
import slider4 from "../../assets/grocery-banner.png";
import slider5 from "../../assets/grocery-banner-2.jpeg";

export default function MainSlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:false,
    arrows:false,

    
  };

  return <>
  
    <div className="row mt-1">
      <div className='md:w-3/4 w-full'>
        <Slider {...settings}>
        <img src={slider3} alt="slider1" className='w-full md:h-[450px] sm:h-[200px]'/>
        <img src={slider5} alt="slider1" className='w-full md:h-[450px] sm:h-[200px]'/>

        </Slider>
       
      </div>
      <div className="w-1/4 ">
        <img src={slider2} alt="slider2" className='w-full md:h-[225px] sm:hidden md:block'/>
        <img src={slider1} alt="slider3" className='w-full md:h-[225px] sm:hidden md:block' />
      </div>
    </div>
  
    
   
  </>
}
