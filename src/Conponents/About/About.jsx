import React from 'react'
import {  FaFacebook, FaInstagramSquare, FaTwitter } from 'react-icons/fa';

export default function About() {
    return (
       <div className='mt-[15em] border-2  w-[400px] p-5 mx-auto rounded-lg'>

       <div className='social-section flex flex-row content-center justify-start m-2 gap-2  items-center mb-5'>


        <div className='social-icon '>

         <FaFacebook className='text-xl text-[#3b5998]' /> 

        </div>

        <div className='social-text'>

            <h4 className='text-lg capitalize '>this message is for facebook</h4>
            
            </div>




       </div>



       <div className='social-section flex flex-row content-center justify-start m-2 gap-2  items-center  mb-5'>


<div className='social-icon'>

 <FaTwitter  className='text-xl text-[#00acee]' /> 

</div>

<div className='social-text'>

    <h4 className='text-lg capitalize '>this message is for twitter</h4>
    
    </div>




</div>


<div className='social-section flex flex-row content-center justify-start m-2  gap-2  items-center mb-5'>


<div className='social-icon'>

 <FaInstagramSquare className='text-xl text-[#e95950]' /> 

</div>

<div className='social-text'>

    <h4 className='text-lg capitalize '>this message is for instagram</h4>
    
    </div>




</div>
       
       
       </div>
    );
}