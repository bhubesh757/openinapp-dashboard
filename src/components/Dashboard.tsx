"use client"

import React, { useEffect } from 'react'
import Chart from './Chart'
import Charttwo from './Charttwo'
import Tabs from './Tabs'
import { signOut, useSession } from "next-auth/react"
import { useRouter } from 'next/navigation';


//dropdown menu

//adding modal
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

import {MagnifyingGlassIcon } from '@heroicons/react/24/solid'

import { Landmark , PlusCircle ,CircleDollarSign , ThumbsUp  , UserCircle} from 'lucide-react';
import { useAppContext } from '@/contexts/Provider'
import Link from 'next/link'

function Dashboard() {

    const { data: session, status } = useSession()
    //user id

    const {getLoggedInUser , getUserDetails ,logout ,getPicPreview }  = useAppContext();
    const [userDetails , setUserDetails] = useState({});
    const [profileModalState , setProfileModalState] = useState(false);
    const [userId , setUserId] = useState(" ");
    const [imagePreview, setImagePreview] = useState("");
    const router = useRouter();

    //getting th current user
    useEffect(() => {
        getCurrUser()
    } , [])

    const getCurrUser = async() => {
        let user = await getLoggedInUser();
        let userId = user.$id;
        // console.log(user);
        setUserId(userId);
        let userDetails = await getUserDetails(userId);
        console.log(userDetails);
        setUserDetails({...userDetails})
        
    }


    //modal
    const [isOpen , setIsOpen] = useState(true);

    function closeModal() {
        setIsOpen(false)
      }
    
      function openModal() {
        setIsOpen(true)
      }


      const handleLogout = async () => {
        await logout();
        router.push("/login");
      };

  return (
    <div className= "flex flex-col py-12 px-14 font-bold text-xl h-screen overflow-y-auto w-full bg-[#F8FAFF] " >
        
        <div className= "flex w-full  justify-between">
            <div>
            <h2>Dashboard</h2>
            </div>
            <div className="flex items-center space-x-5 flex-1 justify-end" >
            <form className="flex items-center space-x-4 bg-white rounded-full p-2 shadow-md  " >
                {/* search box */}
                <MagnifyingGlassIcon className = "h-6 w-6 text-gray-400" ></MagnifyingGlassIcon>
                <input className="text-lg" type= "text" placeholder = "Search" ></input>
            </form>
            <span className="text-lg" >
                Hi , {userDetails?.Name} 
            </span>
            <Link href = "/profile">
            <div className="rounded-full bg-gray-500 flex flex-col justify-center items-center text-gray-800 w-10 h-10 " >
            {!imagePreview && (
                <span>{userDetails && userDetails?.Name?.[0]}</span>
              )}
              {imagePreview && (
                <img
                  src={imagePreview}
                  className="w-full h-full object-cover object-center rounded-full"
                />
              )}
            </div>
            </Link>
            
            <button className="text-lg"
                // onClick={handleLogout}
                onClick={() => signOut()}
                > Sign out </button>
            </div>
            

        </div>
        {/* boxes */}
{/* Box-1 */}
        <div className="flex space-x-8 py-10" >
            <div className=" flex flex-col rounded-3xl shadow-xl border w-[300.32px] h-[120px] p-8 justify-center ">
                {/* logo */}
                {/* <div className = "w-50 h-50  rounded " >
                <Landmark size={32} color="#3cc952" />
                </div>
                <div className="flex flex-col  w-full  justify-end   " >
                <span className=" text-xs " > Total Revenues</span>
               <span>$2,129,430</span>
               <div className=" text-xs flex  rounded-3xl border w-[50px] h-[20px] justify-center   ">
                <span>+2.5%</span>
               </div>
                </div> */}

<div className="  flex flex-row items-end justify-between text-2xs font-lato">
        <div className="flex flex-col items-start justify-start gap-[2px]">
        <Landmark size={32} color="#3cc952" />
          <div className="relative inline-block text-xs ">Total Revenues</div>
            <b className="relative text-xl inline-block font-open-sans w-[124px]">
                $2,129,430
            </b>
        </div>
        <div className="relative rounded-15xl bg-honeydew w-[47px] h-6 overflow-hidden shrink-0 text-center text-3xs text-supportive-roshi-100 font-paragraph-text-md-s">
          <div className=" text-xs flex  rounded-3xl border w-[50px] h-[20px] justify-center  absolute  tracking-[0.5px] leading-[16px] uppercase font-semibold bg-[#E9F9EB] ">
            +1.7%
          </div>
        </div>
      </div> 
               
            </div>

            <div className=" flex flex-col rounded-3xl shadow-xl border w-[300.32px] h-[120px] p-8 justify-center ">
                {/* logo */}
                
                <div className="  flex flex-row items-end justify-between text-2xs font-lato">
        <div className="flex flex-col items-start justify-start gap-[2px]">
        <CircleDollarSign size={32} color="#3cc952" />
          <div className="relative inline-block text-xs ">Total Transactions</div>
            <b className="relative text-xl inline-block font-open-sans w-[124px]">
                1520
            </b>
        </div>
        <div className="relative rounded-15xl bg-honeydew w-[47px] h-6 overflow-hidden shrink-0 text-center text-3xs text-supportive-roshi-100 font-paragraph-text-md-s">
          <div className=" text-xs flex  rounded-3xl border w-[50px] h-[20px] justify-center  absolute  tracking-[0.5px] leading-[16px] uppercase font-semibold bg-[#E9F9EB] ">
            +1.4%
          </div>
        </div>
      </div> 
            </div>

            <div className=" flex flex-col rounded-3xl shadow-xl border w-[300.32px] h-[120px] p-8 justify-center ">
                {/* logo */}
                
                <div className="  flex flex-row items-end justify-between text-2xs font-lato">
        <div className="flex flex-col items-start justify-start gap-[2px]">
        <ThumbsUp size={32} color="#3cc952" />
          <div className="  text-xs ">Total Likes</div>
            <b className="relative text-xl inline-block font-open-sans w-[124px]">
                9721
            </b>
        </div>
        <div className="relative rounded-15xl bg-honeydew w-[47px] h-6 overflow-hidden shrink-0 text-center text-3xs text-supportive-roshi-100 font-paragraph-text-md-s">
          <div className=" text-xs flex  rounded-3xl border w-[50px] h-[20px] justify-center  absolute  tracking-[0.5px] leading-[16px] uppercase font-semibold bg-[#E9F9EB] ">
            +2.5%
          </div>
        </div>
      </div> 
            </div>

            <div className=" flex flex-col rounded-3xl shadow-xl border w-[300.32px] h-[120px] p-8 justify-center ">
                {/* logo */}
                
                <div className="  flex flex-row items-end justify-between text-2xs font-lato">
        <div className="flex flex-col items-start justify-start gap-[2px]">
        <UserCircle size={32} color="#3cc952" />
          <div className="relative inline-block text-xs ">Total Users</div>
            <b className="relative text-xl inline-block font-open-sans w-[124px]">
                9721
            </b>
        </div>
        <div className="relative rounded-15xl bg-honeydew w-[47px] h-6 overflow-hidden shrink-0 text-center text-3xs text-supportive-roshi-100 font-paragraph-text-md-s">
          <div className=" text-xs flex  rounded-3xl border w-[50px] h-[20px] justify-center  absolute  tracking-[0.5px] leading-[16px] uppercase font-semibold bg-[#E9F9EB] ">
            +2.5%
          </div>
        </div>
      </div> 
            </div>
        </div>
        <div className="rounded-lg shadow-xl border h-screen ">
        <div className="space-x-8 w-4/5 p-3  px-5 py-5 ">
            <span className="px-8 py-10  " >Activities</span>
            <span className=" text-xs flex flex-col  text-secondary-text font-montserrat">May-June 2021</span>

        <Chart></Chart>

        </div>
        </div>
        
        {/* Top products */}
        <div className="py-10 flex ">
        <div className="flex flex-col rounded-3xl shadow-xl border w-[480px] h-[256px] p-8  justify-center">
            
        <div className=" w-[482px] h-[256px] top-0 left-0">

        <div className="relative w-[480px] h-[256px] rounded-[20px]">
        <div className="relative w-[300px] h-[256px] p-8 top-2 bottom-9 right-5  justify-center">

        <Charttwo></Charttwo>

        </div>
          <div className="absolute w-[102px] h-[36px] top-[72px] left-[244px]">
            
            <div className="absolute w-[11px] h-[11px] top-[3px] left-0 bg-[#97d79e] rounded-[5.5px]" />
            <div className="absolute top-0 left-[21px] [font-family:'Montserrat-Bold',Helvetica] font-bold text-black text-[14px] tracking-[0] leading-[normal]">
              Basic Tees
            </div>
            <div className="absolute top-[22px] left-[21px] [font-family:'Lato-Regular',Helvetica] font-normal text-[#848484] text-[12px] tracking-[0] leading-[normal] whitespace-nowrap">
              55%
            </div>
          </div>
          <div className="absolute w-[99px] h-[15px] top-[31px] left-[327px]">
            <div className="absolute w-[97px] top-0 left-0 [font-family:'Montserrat-Regular',Helvetica] font-normal text-[#848484] text-[12px] tracking-[0] leading-[normal]">
              May - June 2021
            </div>
          </div>
          <div className="absolute w-[172px] h-[36px] top-[129px] left-[244px]">
            <div className="bg-[#f6dc7d] absolute w-[11px] h-[11px] top-[3px] left-0 rounded-[5.5px]" />
            <div className="absolute top-0 left-[21px] [font-family:'Montserrat-Bold',Helvetica] font-bold text-black text-[14px] tracking-[0] leading-[normal]">
              Custom Short Pants
            </div>
            <div className="absolute top-[22px] left-[21px] [font-family:'Lato-Regular',Helvetica] font-normal text-[#848484] text-[12px] tracking-[0] leading-[normal] whitespace-nowrap">
              31%
            </div>
          </div>
          <div className="absolute w-[132px] h-[36px] top-[186px] left-[244px]">
            <div className="bg-[#ee8383] absolute w-[11px] h-[11px] top-[3px] left-0 rounded-[5.5px]" />
            <div className="absolute top-0 left-[21px] [font-family:'Montserrat-Bold',Helvetica] font-bold text-black text-[14px] tracking-[0] leading-[normal]">
              Super Hoodies
            </div>
            <div className="absolute top-[22px] left-[21px] [font-family:'Lato-Regular',Helvetica] font-normal text-[#848484] text-[12px] tracking-[0] leading-[normal] whitespace-nowrap">
              14%
            </div>
          </div>
          <div className="absolute top-[10px] left-[50px] [font-family:'Montserrat-Bold',Helvetica] font-bold text-black text-[18px] tracking-[0] leading-[normal]">
            Top products
          </div>
        </div>
        </div>

        </div>
        <div className="px-12">
        <div className="flex flex-col rounded-3xl shadow-xl border w-[480px] h-[256px] p-8 justify-center items-center gap-[16px]">
            {/* add logo */}
            
           <PlusCircle 
           size={48} strokeWidth = "2" 
           color = "#999CA0" 
           fill = "#F5F5F5"  
           
           onClick = {openModal}
           />

        <div onClick={() => setProfileModalState(true)} className="relative leading-[24px] font-semibold">
            
            Add Profile
         </div>
          
        </div>
        </div>
        
        </div>
        
        {/* add Profile */}

        {/* for the modal */}

        <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                    
                  >
                    Add New Profile
                  </Dialog.Title>
                  
                  {/* Tabs */}
                  <Tabs
                  userDetails = {userDetails}
                  userId = {userId}
                  profileModalState={profileModalState}
                  ></Tabs>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
       
    </div>
  )
}

export default Dashboard