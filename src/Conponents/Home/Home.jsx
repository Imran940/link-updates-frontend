import React from 'react'
import {Link} from 'react-router-dom'

export default function Home() {
    return (
        <div className="m-10">

            <div className='mt-[15em] flex flex-row justify-center	'>

            <input type="text" id="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-[50%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " placeholder="https://www.link.com/" required />
            <Link
                            className="inline-flex text-white items-center px-6 py-3 font-medium bg-orange-700 rounded-r-lg
                            hover:opacity-75"
                            to="/"
                        >
                           
                           Push
                        </Link>

          
            </div>
        </div>
    );
}
