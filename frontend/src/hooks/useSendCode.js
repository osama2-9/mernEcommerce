import  { useState } from 'react'
import { BACKEND_API } from '../config/config';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import { toast } from 'react-toastify';

export const useSendCode = () => {
     const [isLoading, setIsLoading] = useState(false);
     const logged = useRecoilValue(userAtom)
 const [isModalOpen, setIsModalOpen] = useState(false);
 const handleOpenModel=()=>{
    setIsModalOpen(true)
 }
    const handleSendCode = async () => {
       setIsLoading(true);
       try {
           const res = await fetch(`${BACKEND_API}/users/sendPhoneVerificationCode`, {
               credentials: "include",
               method: "POST",
               headers: {
                   'Content-Type': "application/json"
               },
               body: JSON.stringify({
                   uid: logged.uid,
               }),
           });

           const data = await res.json();

           if (res.ok) {
               toast.success(data.message);  
           } else {
               toast.error(data.error || 'An error occurred'); 

           }
       } catch (error) {
           toast.error("Error while sending code: " + error.message);  
       } finally {
           setIsLoading(false);
           setIsModalOpen(false)
       }
   };
  return{
handleSendCode,isLoading,isModalOpen,handleOpenModel,setIsModalOpen
  }
}
