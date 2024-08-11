/* eslint-disable no-unused-vars */

import { useRecoilValue } from "recoil"
import PeroductsReport from "../../components/PeroductsReport"
import Sidebar from "../../components/Sidebar"
import Tabs from "../../components/Tabs"
import userAtom from "../../atoms/userAtom"
import { Navigate } from "react-router-dom"


const Admin = () => {
    const user = useRecoilValue(userAtom)
    if (!user) {
        return <Navigate to={'/'} />
    }


    return (
        <>
            <Tabs />
            <PeroductsReport />





        </>
    )
}

export default Admin
