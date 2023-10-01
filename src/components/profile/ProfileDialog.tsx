import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { useAppContext } from "@/contexts/Provider";
  import { Pencil } from "lucide-react";
  
  import React, { useEffect, useState } from "react";
  
  function ProfileDiaglog({
    profileModalState,
    setProfileModalState,
    userDetails,
    userId,
    getCurrUser,
  }) {
    console.log(userDetails);
    const [imagePreview, setImagePreview] = useState("");
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState(userDetails?.Name);
    const [email, setEmail] = useState(userDetails?.Email);
    // const [phone, setPhone] = useState(userDetails?.phone);
    const [instaId, setinstaId] = useState(userDetails?.Insta);
    const [youtubeId, setyoutubeId] = useState(userDetails?.Youtube);
    const [bio, setBio] = useState(userDetails?.Bio);
  
    const { storePic, updateUser, getPicPreview  } = useAppContext();
  
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
  
    const handleImagePreview = async (fileId) => {
      const url = await getPicPreview(fileId);
      setImagePreview(url);
    };
  
    const handleProfilePicChange = (e) => {
      const file = e.target.files[0];
  
      console.log(file);
  
      if (file) {
        const fileReader = new FileReader();
  
        fileReader.onloadend = () => {
          setImagePreview(fileReader.result);
        };
  
        fileReader.readAsDataURL(file);
      } else {
        setImagePreview("");
      }
    };
  

    //Save button
    const handleSaveProfile = async () => {
      if (!name) {
        alert("Name is mandatory");
        return;
      }
      setLoading(true);
      let profilePicFile = document.getElementById("profilePicId").files[0];
      let profileId = userDetails?.ProfilePic ?? "";
    if (profilePicFile) {
      profileId = await storePic(profilePicFile);
    }
      await updateUser(
        userId, 
        name,
        email,
        bio, 
        instaId,
        youtubeId,
        profileId
        );
      setLoading(false);
      await getCurrUser();
      setProfileModalState(false);
    };
  
    return (
      <Dialog open={profileModalState} onOpenChange={setProfileModalState}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Modify below fields to update your profile
            </DialogDescription>
            <div className="flex flex-col space-y-4 justify-center w-full mt-4">
              <div className="hover:bg-gray-500 w-32 h-32 rounded-full bg-gray-400 mt-5 mx-auto flex justify-center items-center flex-col relative">
                <input
                  type="file"
                  className="opacity-0 absolute left-0 top-0 w-full h-full cursor-pointer"
                  onChange={handleProfilePicChange}
                  id="profilePicId"
                />
                <Pencil />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    className="w-full h-full object-cover object-center rounded-full"
                  />
                )}
              </div>
              <div className="flex flex-col space-y-3 grow mt-5">
                <div className="flex flex-col space-y-2">
                  <label>Name</label>
                  <input
                    className="border p-2 rounded"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label>Email</label>
                  <input
                    className="border p-2 rounded"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="flex flex-col space-y-2">
                <label>Bio</label>
                <textarea
                  className="border p-2 rounded"
                  onChange={(e) => setBio(e.target.value)}
                  value={bio}
                ></textarea>
              </div>
  
                {/* <div className="flex flex-col space-y-2">
                  <label>Phone number</label>
                  <input
                    className="border p-2 rounded"
                    value={phone}
                    type = "number"
                    onChange={(e) => setPhone(e.target.value)}
                  ></input>
                </div> */}

                {/* social links */}
                <div className="flex flex-col space-y-2">
                  <label>Instagram Link</label>
                  <input
                    className="border p-2 rounded"
                    type="url"
                    value={instaId}
                    onChange={(e) => setinstaId(e.target.value)}
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <label>Youtube Link</label>
                  <input
                    className="border p-2 rounded"
                    type="url"
                    value={youtubeId}
                    onChange={(e) => setyoutubeId(e.target.value)}
                  />
                </div>
                
  
                <button
                  className="bg-gray-900 p-2 text-white"
                  onClick={handleSaveProfile}
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }
  
  export default ProfileDiaglog;