
"use client"
import React, { useState } from 'react'

//importting the icons
import {
  LayoutDashboard,
  BadgeDollarSign,
  CalendarCheck,
  Users,
  Settings

 } from "lucide-react";


const navLinks = [
  {
    name : 'Dashboard',
    icons: LayoutDashboard,
  },
  {
    name : 'Transaction',
    icons: BadgeDollarSign,
  },
  {
    name : 'Schedules',
    icons: CalendarCheck,
  },
  {
    name : 'Users',
    icons: Users,
  },
  {
    name : 'Settings',
    icons: Settings,
  },

]

function NavigationBar() {

  //create a state
  const [activenav , setActivenav] = useState(0);
  return (
    <div className="px-10 py-12 flex flex-col rounded-lg border-2 border-r-2 w-1/5 h-screen bg-[#4285F4]">
      
      <div className= " logo-div flex space-x-3 items-center" >
        <img src= "https://play-lh.googleusercontent.com/9jzJZF1uvEQ2YefrYKoPLMExTrebur0o3Cj0HDUg_HckyQylMJ-uNFpuUpwvD9GYTJ8=w240-h480-rw" className="w-10 h-10"  > 
        </img>
        <h1 className= "text-white body-font font-body w-123 h-43 font-bold top-0 left-0 text-xl " >Board</h1>
      </div>
      

      <div className='mt-10 flex flex-col space-y-8 text-white'>
        {
          navLinks.map((item , index) => 
          <div key = {index} className = {
            "flex space-x-3 p-2 rounded " 
            +(activenav == index ? 
            "bg-[#ffff] text-black font-semibold " : " ") 
            } 
            onClick = {() => setActivenav(index)}
            >
            <item.icons/> 
            <span> {item?.name} </span>
           </div> )
        }
      </div>

      

      
    </div>
  )
}

export default NavigationBar