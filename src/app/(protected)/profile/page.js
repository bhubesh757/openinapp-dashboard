"use client"
import React , {useState , useEffect}  from 'react'
import { useAppContext } from '@/contexts/Provider'
import ProfileDiaglog from '@/components/profile/ProfileDialog';
import Image from 'next/image'
function UsersPage() {


  const {getLoggedInUser , getUserDetails }  = useAppContext();
  const [userDetails , setUserDetails] = useState({});
  const [profileModalState , setProfileModalState] = useState(false);
  const [userId , setUserId] = useState(" ");
  const [imagePreview, setImagePreview] = useState("");
  
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
      // console.log(userDetails);
      setUserDetails({...userDetails})
      
  }


  return (
    <div>

      <div className= "flex flex-col py-12 px-14 font-bold text-xl h-screen overflow-y-auto w-full bg-[#F8FAFF] " >
      <div className= "flex w-full  justify-between">
            <div>
            <h2> User Profile Page</h2>
            
            </div>
            <div className="flex items-center space-x-5 flex-1 justify-end" >
            <form className="flex items-center space-x-4 bg-white rounded-full p-2 shadow-md  " >
                {/* search box */}
                {/* <MagnifyingGlassIcon className = "h-6 w-6 text-gray-400" ></MagnifyingGlassIcon> */}
                <input type= "text" placeholder = "Search" ></input>
            </form>
            <span>
                Hi
            </span>
            <div className="rounded-full bg-gray-500 flex flex-col justify-center items-center text-gray-800 w-10 h-10 " >
            {!imagePreview && (
                <span>{userDetails && userDetails?.Name?.[0]}</span>
              )}
              {imagePreview && (
                <Image
                  src={imagePreview}
                  className="w-full h-full object-cover object-center rounded-full"
                />
              )}
            </div>
            </div>
        </div>
        
        {/* page */}

        <>
          <div className="flex space-x-6 mx-auto my-28 items-center">
            <div className="w-32 h-32 rounded-full bg-white flex flex-col justify-center items-center text-gray-800">
              {/* Profile pic */}
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
            <div className="flex flex-col space-y-3">
              <h2> {userDetails?.Name} </h2>
              <span className="text-gray-400 text-xs">
                {userDetails?.Email}
              </span>
              <span className="text-gray-400 text-xs">
                {userDetails?.Bio}
              </span>
              <span className="text-gray-400 text-xs">
                {userDetails?.Insta}
              </span>
              <span className="text-gray-400 text-xs">
                {userDetails?.Youtube}
              </span>
              {/* <p className="text-gray-400">{userDetails?.Bio}</p> */}
              <span
                className="text-sm text-cyan-500 cursor-pointer"
                onClick={() => setProfileModalState(true)}
              >
                Edit Profile
              </span>
            </div>
          </div>
        </>

        <ProfileDiaglog
        profileModalState={profileModalState}
        setProfileModalState={setProfileModalState}
        userDetails = {userDetails}
        userId = {userId}
        getCurrUser = {getCurrUser}
      />

       </div>
       
       
    </div>
  )
}

export default UsersPage