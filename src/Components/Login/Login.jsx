import React, { useContext, useEffect, useState } from 'react';
import style from "./Login.module.css";
import { useFormik } from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { UserContext } from '../../Context/UserContext';





export default function Login() {

  let {userLogin , setuserLogin} = useContext(UserContext);

  const navigate = useNavigate();

  const [ApiError, setApiError] = useState("");

  const [isLoading, setisLoading] = useState(false);


  function handleLogin(values){

    setisLoading(true);

    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
    .then((res)=>{
      setisLoading(false);
      if(res.data.message == "success"){
        console.log(res);
        
        localStorage.setItem("userToken",res.data.token);
        setuserLogin(res.data.token);
        navigate("/");
      }
    })
    .catch((res)=>{
      setisLoading(false);
      setApiError(res.response.data.message);})
  }


  // validation
  let myValidation = Yup.object().shape({
    email: Yup.string().email("invalid email").required("email is required"),
    password: Yup.string().matches(/^[A-Za-z0-9]{6,10}$/, "password should be between 6 & 10 character").required("password is required"),
  })


  // formik
  let formik = useFormik({

    initialValues: {
      email:"",
      password:"",
    },

    validationSchema:myValidation,
    onSubmit: handleLogin

  })



  return <>
  
  
  <div className='my-28 md:px-52'>

    

    <h2 className='font-bold text-3xl text-emerald-600 mb-11 text-center'>Login now</h2>

      <form onSubmit={formik.handleSubmit} className=" mx-auto">


        <div className="relative z-0 w-full mb-8 group">
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " />
            <label htmlFor="email" className="left-0 peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
            {formik.errors.email && formik.touched.email? (<div className="text-red-600 bg-red-200 mt-4 p-3 border border-red-400"><span>{formik.errors.email}</span></div>) : null}
        </div>

         <div className="relative z-0 w-full mb-8 group">
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "  />
            <label htmlFor="password" className="left-0 peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
            {formik.errors.password && formik.touched.password? (<div className="text-red-600 bg-red-200 mt-4 p-3 border border-red-400"><span>{formik.errors.password}</span></div>) : null}
        </div>  

        {ApiError ? <div className="w-1/2 mx-auto  bg-red-600 text-white font-bold rounded-lg p-3 mb-6 ">
          {ApiError}
          </div> : null}

        {isLoading ? <i className="fas fa-spinner fa-spin mt-11 "></i> : (<button type="submit" className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-6">Login</button>) }
         <p className="mt-4"><Link to={"/register"} className="text-sm font-medium text-emerald-500 hover:underline "> Create an account.</Link></p>
      
      </form>

  </div>

  
  </>
   
  
}
