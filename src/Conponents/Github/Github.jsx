import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'

function Github() {
    const data = useLoaderData()
//     const [data , setData] = useState({})

//    useEffect( () => {
         
//     fetch('https://api.github.com/users/hiteshchoudhary')
//     .then( response => response.json())
//     .then(data => setData(data)   )     
     

//    }   , [])

  return (
    <div  className='bg-gray-400 text-black'>
    <div className='text-center '>Github Follwers:{data.followers} </div>
    <img src={data.avatar_url} alt="gi picture"  width={300} />
    </div>
  )
}

export default Github


export const githubInfoLoader = async () => {
  const response = await fetch('https://api.github.com/users/hiteshchoudhary')
   return  response.json()
}
