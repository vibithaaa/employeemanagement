import * as React from "react";
import { createContext, useEffect, useState } from "react";
// import { sp } from "../../../spauth";
import axios from "axios";


export interface User {



    image?: File;
    Id?: number;
    Title?: string;
    first_name?: string
    email?: string;
    designation?: string;
    City?:string;
    ImageUrl?: string;
    Gender?:string;
    DOB?:string;
    Phone?:string;
    
    
}
interface UserContextType {
    users: User[];
    addUser: (newUser: User) => void;
    deleteUser: (Id: number|undefined) => void;
    updateUser: (updatedUser: User) => void;
}
interface UserProvideProps {
    children : React.ReactNode;
}

export const UserContext = createContext<UserContextType>({
    users: [],
    addUser: () => { },
    deleteUser: () => { },
    updateUser: () => { },
});

export const UserProvider: React.FC<UserProvideProps> = ({ children }) => {
    const [users, setUsers] = useState<User[]>([]);
  
  

//getuser

    useEffect(() => {
        const fetchUsers = async()=>{
            const response =await axios.get("http://localhost:3001/api/users");
            setUsers(response.data.users);
        };
        fetchUsers();
    }, [])


    //add user
    const addUser = async(newUser:User)=>{
        const response= await axios.post(
            "http://localhost:3001/api/adduser",
            newUser
        );
        console.log(response)
    };

    //Delete user

    const deleteUser= async(Id:any)=>{
        const response = await axios.delete(
            `http://localhost:3001/api/delete/${Id}`
        );
        console.log(response);
    };

    const updateUser = async(newUser:User)=>{
        const response = await axios.put(
            `http://localhost:3001/api/updateUser`,
            newUser
        );
        console.log(response);
    };

    return (
        <UserContext.Provider 
        value={{
             users,
              addUser,
               deleteUser,
                updateUser,
                 }}
                 >
            {children}
        </UserContext.Provider>
    );

};














