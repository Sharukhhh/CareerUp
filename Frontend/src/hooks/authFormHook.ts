import { useState } from "react"

interface UserData {
    username: string;
    email: string;
    password: string;
    phone: string;
    role: string;
}

export const useAuthFormHook = () => {

    const [userData , setUserData] = useState<UserData>({
        username:'',
        email: '',
        password: '',
        phone: '',
        role: ''
    });
    const [isLoading , setIsLoading] = useState<boolean>(false);


    const handleChangeData = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name , value} = e.target;

        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    return {
        userData , handleChangeData , isLoading , setIsLoading
    }
}