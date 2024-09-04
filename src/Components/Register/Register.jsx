import React, { useContext, useState } from 'react';
import style from "./Register.module.css";
import { useFormik } from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { UserContext } from '../../Context/UserContext';




export default function Register() {

  let {userLogin , setuserLogin} = useContext(UserContext);

  const navigate = useNavigate();

  const [ApiError, setApiError] = useState("");

  const [isLoading, setisLoading] = useState(false);


  function handleRegister(values){

    setisLoading(true);

    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
    .then((res)=>{
      setisLoading(false);
      if(res.data.message == "success"){
        localStorage.setItem("userToken",res.data.token);
        setuserLogin(res.data.token)
        navigate("/");
      }
    })
    .catch((res)=>{
      setisLoading(false);
      setApiError(res.response.data.message);})
  }


  // validation
  let myValidation = Yup.object().shape({
    name: Yup.string().min(3,"min length is 3").max(10,"max length is 10").required("name is required"),
    email: Yup.string().email("invalid email").required("email is required"),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/,"invalid phone number").required("phone is required"),
    password: Yup.string().matches(/^[A-Za-z0-9]{6,10}$/, "password should be between 6 & 10 character").required("password is required"),
    rePassword: Yup.string().oneOf([Yup.ref("password")],"rePassword and password not the same").required("rePassword is required")
  })


  // formik
  let formik = useFormik({

    initialValues: {
      name:"",
      email:"",
      phone:"",
      password:"",
      rePassword:""
    },

    validationSchema:myValidation,
    onSubmit: handleRegister

  })





  return <>
  
  
  <div className='my-28 md:px-52'>

    

    <h2 className='font-bold text-3xl text-emerald-600 mb-11'>Register now</h2>

      <form onSubmit={formik.handleSubmit} className=" mx-auto">

        <div className="relative z-0 w-full mb-8 group">
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "  />
            <label htmlFor="name" className="left-0 peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Full name</label>
            {formik.errors.name && formik.touched.name? (<div className="text-red-600 bg-red-200 mt-4 p-3 border border-red-400"><span>{formik.errors.name}</span></div>) : null}
        </div>

        <div className="relative z-0 w-full mb-8 group">
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " />
            <label htmlFor="email" className="left-0 peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
            {formik.errors.email && formik.touched.email? (<div className="text-red-600 bg-red-200 mt-4 p-3 border border-red-400"><span>{formik.errors.email}</span></div>) : null}
        </div>

         <div className="relative z-0 w-full mb-8 group">
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "  />
            <label htmlFor="phone" className="left-0 peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number</label>
            {formik.errors.phone && formik.touched.phone? (<div className="text-red-600 bg-red-200 mt-4 p-3 border border-red-400"><span>{formik.errors.phone}</span></div>) : null}
        </div>  

         <div className="relative z-0 w-full mb-8 group">
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "  />
            <label htmlFor="password" className="left-0 peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
            {formik.errors.password && formik.touched.password? (<div className="text-red-600 bg-red-200 mt-4 p-3 border border-red-400"><span>{formik.errors.password}</span></div>) : null}
        </div>  

        <div className="relative z-0 w-full mb-8 group">
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="password" name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "  />
            <label htmlFor="rePassword" className="left-0 peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
            {formik.errors.rePassword && formik.touched.rePassword? (<div className="text-red-600 bg-red-200 mt-4 p-3 border border-red-400"><span>{formik.errors.rePassword}</span></div>) : null}
        </div>

        

        {ApiError ? <div className="w-1/2 mx-auto  bg-red-600 text-white font-bold rounded-lg p-3 mb-6 ">
          {ApiError}
          </div> : null}

        {isLoading ? <i className="fas fa-spinner fa-spin mt-11 "></i> : (<button type="submit" className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mt-6">Register</button>) }
        <p id="helper-text-explanation" className="mt-4 text-sm text-gray-500">Already have an account? <Link to={"/login"} className="font-medium text-emerald-500 hover:underline "> Login</Link>.</p>
      
      </form>

  </div>

  
  </>
   
  
}
