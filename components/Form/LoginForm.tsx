'use client'
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAxios } from '@/components/services/http.service';
import {useDispatch} from '@/components/store/index'
import {setUserDetails} from '@/components/store/reducers/auth/authReducer'
const validationSchema = Yup.object({

  email: Yup.string()
    .required('Please enter your email')
    .email('Please enter a valid email'),

  password: Yup.string()
    .required('Please enter your password')
    .min(8, 'Password should be at least 8 characters'),
 
});

const initialValues = {
 
    email: '',
  
    password: '',
   
  };
const LoginForm = () => {
    const { post } = useAxios()
    const dispatch=useDispatch()
  return (
    <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={(values, {resetForm}) => {
        post('/login', values)
        .then((response) => {
          const result:any = response.data
          dispatch(setUserDetails({token:result?.token,userData:result?.user}))
          console.log(result,"success")
          resetForm()
        })
        .catch((error) => {
            const errorMessage = error.response.data.message
           console.log(errorMessage,"error")
           resetForm()
        })
    }}
  >
    {({ }) => (
      <Form >
         <div className="">
           
              <div>
                  <Field type="email" name='email' className="focus:outline-none border-b bg-white text-black w-full pb-2 border-sky-400 placeholder-gray-500 my-8"  placeholder="Eamil Adress "/>
                  <ErrorMessage
                name="email"
                component="div"
                className="text-red-500"
              />
             </div>
            
             <div className="">
                 <Field type="password" name='password' className="focus:outline-none  bg-white text-black border-b w-full pb-2 border-sky-400 placeholder-gray-500 mb-8"  placeholder="Password " />
                 <ErrorMessage
                name="password"
                component="div"
                className="text-red-500"
              />
             </div>
           
             <div className="flex justify-center my-6">
                 <button className=" rounded-full  p-3 w-full sm:w-56   bg-gradient-to-r from-sky-600  to-teal-300 text-white text-lg font-semibold " >
                     Create Account
                 </button>
             </div>
             <div className="flex justify-center ">
                 <p className="text-gray-500">Already have an acount? </p>
                 <a href="/login" className="text-sky-600 pl-2"> Sign In</a>
             </div>
         </div>
         </Form>
             )}
         </Formik>
  )
}

export default LoginForm