/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom"
import { useRecoilValue } from "recoil"
import userAtom from "../atoms/userAtom"
import USidebar from "../components/USidebar"
import UserTabs from "../components/UserTabs"
import UserlastOrders from "../components/UserlastOrders"
import Address from "./Address"


const DashBored = () => {
   

    return (
        <>
            <USidebar />
            <UserTabs />
            <UserlastOrders />
            



        </>
    )
}

export default DashBored
