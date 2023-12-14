import { Routes, Route, useNavigate } from "react-router-dom";
import DoctorPage from "../../pages/DoctorPage";
import Layout from "../layout/Layout";
import HomePage from "../../pages/HomePage";
import { useContext, useEffect } from 'react';
import AuthContext from "../../store/auth-context";
import AppointmentPage from "../../pages/AppointmentPage";
import PatientsListPage from "../../pages/PatientsListPage";

function DoctorRoutes() {

    return (
    <Layout title="PTMS | Doctor" role="doctor">
        <Routes>
            <Route path='/' element={<DoctorPage />} />
            <Route path='/appointments' element={<AppointmentPage />} />
            <Route path='/patients' element={<PatientsListPage />} />
        </Routes>
    </Layout>
    );
}

export default DoctorRoutes