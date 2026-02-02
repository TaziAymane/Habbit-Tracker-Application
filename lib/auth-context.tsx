import React, { createContext, useContext, useEffect, useState } from "react";
import { ID, Models } from "react-native-appwrite";
import { account } from "./appwrite";
type AuthContextType = {
    user : Models.User<Models.Preferences> | null ;
    isLoadingUser : boolean ;
    SignUp : (email : string, password: string)=>Promise<string | null>
    SignIn : (email : string, password: string)=>Promise<string | null>
    SignOut : ()=>Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined >(undefined)

export default function AuthProvider({children} : {children : React.ReactNode}) {   
    const [user, setUser] = useState< Models.User<Models.Preferences> | null >(null);
    const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true)
    useEffect(()=>{
        getUser();
    },[])
    const getUser = async ()=>{
        try {
            const session = await account.get();
            setUser(session)
        } catch (error) {
            setUser(null)
        } finally{
            setIsLoadingUser(false);
        }
    }


    const SignUp = async (email: string , password : string) =>{
        try{
            await account.create(ID.unique(), email, password);
            await SignIn( email, password);
            return null ;
        }catch(error){
            if(error instanceof Error){
                return error.message
            }

            return "An error occured signUp "
        }
    };

    const SignIn = async (email: string , password : string) =>{
        try{
            await account.createEmailPasswordSession(email, password);
            const session = await account.get();
            setUser(session);
            return null ;
        }catch(error){
            if(error instanceof Error){
                return error.message
            }

            return "An error occured signIn  "
        }
    };

    const SignOut = async ()=>{
        try {
            await account.deleteSession("current");
            setUser(null);
        } catch (error) {
            console.log(error);
            
        }
    }

    
    return (
    <AuthContext.Provider value={{ user ,isLoadingUser, SignIn, SignUp, SignOut}}>
        {children}
    </AuthContext.Provider>
    )
}

export function useAuth(){
    const context = useContext(AuthContext);
    if (context === undefined){
        throw new Error("useAuth must be inside of the AuthProvider");
    }

    return context ;
}