"use client"
import React ,{useContext , createContext}  from 'react'
import  {ID , Client , Account , Databases , Storage } from "appwrite"
import { useRouter } from "next/navigation";
import { getSession } from 'next-auth/react'; // Import getSession
import {useSession} from "next-auth/react"
import { SessionProvider } from "next-auth/react"
import { data } from '@/components/Chart';
// import { createSecureServer } from 'http2';


const AppContext = createContext(null);

function Provider({children}) {

    const router = useRouter();
    const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject(process.env.NEXT_PUBLIC_PROJECT_ID);               // Your project ID

    const account = new Account(client);
    //database
    const database = new Databases(client);
    //storage
    const storage = new Storage(client);

     //Login
     const login = async (email , password) => {
        try{
            const response = await account.createEmailSession(
                email,
                 password);
                 alert("you are logged in successfully")
                 router.push("/");
        }
        catch (err) {
            alert(err); 
        }
     }
    // Signup
    const  signup = async ( name ,  email , password) => {
      try {
        const response = await account.create(
            ID.unique(), 
            email, password , name ) ; 

            console.log(response);
            //creating a random id
            let id = response.$id;
            await createUser(id , name , email);
            alert("Account created successfully")
            router.push("/login");
      }
      catch (err){
        alert(err)
      }
    };



      ///which stores the profile pic
      const storePic = async (file) => {
        try {
          const response = await storage.createFile(
            process.env.NEXT_PUBLIC_BUCKET_ID,
            ID.unique(),
            file
          );
          return response.$id;
        } catch (err) {
          alert(err);
        }
      };

      //fucntion store the links in the datbase
      const updateUser = async (
        id,
        name,
        email,
        bio ,
        profilePic,
        instaId,
        youtubeId
        ) =>  {
          try {
            await database.updateDocument(
              process.env.NEXT_PUBLIC_DATABASE_ID,
              process.env.NEXT_PUBLIC_USER_COLLECTION_ID,
              id ,
              {
                Name: name,
                Bio: bio,
                ProfilePic: profilePic,
                Email: email,
                Insta : instaId,
                Youtube : youtubeId
              }
            );
          }
          catch (err) {
            alert(err)
          }
      };


      const createUser = async (
        id,
        fullName,
        emailAddress,
        bio = "",
        profilePic = "",
        instaId = "",
        youtubeId = ""
      ) => {
        try {
          const response = await database.createDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID,
            process.env.NEXT_PUBLIC_USER_COLLECTION_ID,
            id,
            {
              Name: fullName,
              Bio: bio,
              ProfilePic: profilePic,
              Email: emailAddress,
              Insta : instaId,
              Youtube : youtubeId
            }
          );
        } catch (err) {
          alert(err);
        }
      };


    // const createUser = async (
    //     id,
    //     name,
    //     email ,
    //     phone ="" ,  
    //     profilepic = "",
    //     instalink =" " ,
    //     youtubelink = " "
    //   ) => {
    //     try {
    //       const response = await database.createDocument(
    //         process.env.NEXT_PUBLIC_DATABASE_ID,
    //         process.env.NEXT_PUBLIC_USER_COLLECTION_ID,
    //         id,
    //         {
    //           Name: name,
    //             email: email,
    //             phone : phone,
    //             profilepic : profilepic,
    //             youtubelink : instalink,
    //             YoutubeLink : youtubelink
    //         }
    //       );
    //     } catch (err) {
    //       alert(err);
    //     }
    //   };

      //getting the user login id
      const getLoggedInUser = async () => {
        try {
          const user = await account.get();
          return user;
        } catch (err) {
          router.push("/");
          return null ;
        }
      };

      //userdetails from the login page
      const getUserDetails = async (id) => {
        try {
            const user = await database.getDocument(
                process.env.NEXT_PUBLIC_DATABASE_ID,
                process.env.NEXT_PUBLIC_USER_COLLECTION_ID,
                id
            );
            return user;
        }
        catch (err) {
            alert(err)
        }
      };

    //   getting the session
    // const { data: session } = useSession();

    const checkSession = () => {
      return session;
    };

    //Whcih stores the data of the user which entered  name , phone , email
    
    //Profile
    const getPicPreview = async (fileId) => {
      try {
        const response = await storage.getFilePreview(
          process.env.NEXT_PUBLIC_BUCKET_ID,
          fileId
        );
        return response.href;
      } catch (err) {
        alert(err);
      }
    };

    const logout = async () => {
      await account.deleteSession("current");
    };
  

    const exposedValues = {
        signup,
        login,
        getLoggedInUser,
        getUserDetails,
        checkSession,
        storePic,
        updateUser,
        getPicPreview,
        logout
    }

  return (
    <SessionProvider>
         <AppContext.Provider value = {exposedValues} >{children}</AppContext.Provider>
    </SessionProvider>
   
  )
}

export default Provider;


export const useAppContext = () => useContext(AppContext);