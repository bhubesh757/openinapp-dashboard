"use client"
  import React, { useEffect } from "react";
  import { useState , useRef } from 'react'
import { Tab } from '@headlessui/react'
import {userForm} from "src/components/userForm.tsx"
import {useNavigate} from 'react-router-dom';
import { useAppContext } from "@/contexts/Provider";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }


  

function Tabs( {userDetails , userId  ,profileModalState,
  setProfileModalState  } ) {


  //back 
  // const navigate = useNavigate();
  // const goBack = () => {
	// 	navigate(-1);
	// }

  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading , setLoading] = useState(false);
  const {socialLinks ,updateData ,updateUser ,getCurrUser } = useAppContext();

  const [name, setName] = useState(userDetails?.Name);
  const [email, setEmail] = useState(userDetails?.Email);
    // const [phone, setPhone] = useState(userDetails?.phone);
  const [instaId, setinstaId] = useState(userDetails?.Insta);
  const [youtubeId, setyoutubeId] = useState(userDetails?.Youtube);

  useEffect(() => {
    if (profileModalState) {
      setName(userDetails?.Name);
      setEmail(userDetails?.Email);
      // setPhone(userDetails?.phone);
      setinstaId(userDetails?.Insta);
      setyoutubeId(userDetails?.Youtube);
      if (userDetails?.profilepic) {
        handleImagePreview(userDetails?.ProfilePic);
      }
    } else {
      setName("");
      setEmail("");
      // setPhone("");
      setinstaId("");
      setyoutubeId("");
    }
  }, [profileModalState]);

  const tabsRef = useRef([]);

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      tabsRef.current[currentIndex - 1].click();
    }
  };

  const handleNextClick = () => {
    if (currentIndex < tabsRef.current.length - 1) {
      setCurrentIndex(currentIndex + 1);
      tabsRef.current[currentIndex + 1].click();
    }
  };


  //saving to the database
  const handleSavedata = async () => {
      setLoading(true);
      await updateUser(
        userId, 
        name,
        email,
        instaId,
        youtubeId,
        );
      setLoading(false);
      // await getCurrUser();
      // setProfileModalState(false);
  }

  //tabs
  const tabData = [
    {
      label: 'Basic',
      content: (
        <div>
          {/* Basic tab content */}
          {/* ... */}
          <button
            type="button"
            onClick={handleNextClick}
            className="px-8 py-2 bg-[#3E84F8] rounded-3xl text-white"
          >
            Next
          </button>
        </div>
      ),
    },
    {
      label: 'Social',
      content: (
        <div>
          {/* Social tab content */}
          {/* ... */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handlePrevClick}
              className="px-8 py-2 bg-[#3E84F8] rounded-3xl text-white"
            >
              Back
            </button>
            <button
              type="button"
              // onClick={handleSaveClick}
              className="px-8 py-2 bg-[#3E84F8] rounded-3xl text-white"
            >
              Save
            </button>
          </div>
        </div>
      ),
    },
  ];


  

  
    const [categories] = useState({
        Basic: [
          {
            id: 2,
            name: "bhubesh",
            email: 'bhubesh@gmail.com',
            phonenum: 3,
            title: "The worst advice we've ever heard about coffee",
            date: '4d ago',
            commentCount: 1,
            shareCount: 2,
          },
          {
            id: 2,
            name: "bhubesh",
            email: 'bhubesh@gmail.com',
            phonenum: 3,
            title: "The worst advice we've ever heard about coffee",
        date: '4d ago',
        commentCount: 1,
        shareCount: 2,
          },
        ],
        Social: [
          {
            id : 1,
            instaid : "",
            youtubeid : "",
           
          },
          {
            id : 2,
            instaid : "",
            youtubeid : "",
           
          },
        ],
        
      })

  return (
    <div className="w-full max-w-md px-2 py-16 sm:px-0">
      <Tab.Group  >
        
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {category}
            </Tab>
          ))}

        </Tab.List>

        



        <Tab.Panels >
        
          {/* Basic */}
        <Tab.Panel  >
          
          <div className="flex flex-col " >
            <div className="flex flex-col space-y-3 p-2" >
            <h1 className="float-col">Enter Name* </h1>

            {/* <span className="flex-row" > (Optional)</span> */}
            <div className="flex flex-col" >
            <input 
            value={userDetails?.Name}
            type = "text"
            placeholder='Eg. John Doe'
            className="w-full border border-gray-300 rounded-md outline-none p-2"
            >
            </input>

            </div>

          </div>
          <div className="flex flex-col space-y-3 p-2" >
            <h1 className="float-col">Enter Email* </h1>

            {/* <span className="flex-row" > (Optional)</span> */}
            <div className="flex flex-col" >
            <input 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type = "text"
            placeholder='Eg. John@xyz.com'
            className="w-full border border-gray-300 rounded-md outline-none p-2"
            >
            </input>

            </div>

          </div>
          
          <div className="flex flex-col space-y-3 p-2" >
            <h1 className="float-col">Enter Phone* </h1>

            {/* <span className="flex-row" > (Optional)</span> */}
            <div className="flex flex-col" >
            <input 
            id = "phoneNum"
            type = "text"
            placeholder='Eg.  9123456789'
            className="w-full border border-gray-300 rounded-md outline-none p-2"
            >
            </input>

            </div>

          </div>

          <div className=" justify-end items-center p-2 flex-1 space-x-5 " >
          <button
          type="submit"
          onClick={handleNextClick}
           className=" flex  px-8 py- p-2 bg-[#3E84F8] rounded-3xl   items-center text-white "
          >
           Next
          </button>
          </div>
          {/* <div className= "" > */}
         
          {/* </div> */}
          

        </div>
          

        </Tab.Panel  >
        {/* Social */}
        <Tab.Panel >
          <div className="flex flex-col space-y-3 p-3" >

          <div className="flex flex-row space-x-3" >
            <h1 className="float-col">Instagram Link  </h1>
             <span>(Optional)</span>
            </div>

            {/* <span className="flex-row" > (Optional)</span> */}
            <div className="flex flex-col" >
            <input 
            value={userDetails?.Insta}
            type = "text"
            placeholder='Eg. ..instagram.com/username'
            className="w-full border border-gray-300 rounded-md outline-none p-2"
            id = "instaid"
            >
            </input>
            </div>

          </div>

          <div className="flex flex-col space-y-3 p-3" >
          <div className="flex flex-row space-x-2" >
            <h1 className="float-col">Youtube Link  </h1>
             <span>(Optional)</span>
            </div>
           
            <input 
            value={userDetails?.Youtube}
            type = "text"
            placeholder='Eg. ..youtebe/username'
            className="  w-full border border-gray-300 rounded-md outline-none p-2 px-3 space-x-5 align-super"
            id = "youtubeid"
            >
            </input>
          </div>

          <div className="flex  col space-x-5 justify-end p-3 px-80" >
          <div className=" justify-end items-center p-2 flex-1 space-x-3 " >
          <button
          type="submit"
          onClick={handlePrevClick}
           className=" flex  px-8 py- p-2 bg-[#3E84F8] rounded-3xl   items-center text-white "
          >
           Back
          </button>
          </div>

          <div className=" justify-end items-center p-2 flex-1 space-x-3 " >
          <button
          type="submit"
           className=" flex  px-8 py- p-2 bg-[#3E84F8] rounded-3xl   items-center text-white "
           onClick={handleSavedata}
          >
           Save
          </button>
          </div>

          </div>
        </Tab.Panel>
        
      </Tab.Panels>


        
      </Tab.Group>
    </div>
  )
}

export default Tabs