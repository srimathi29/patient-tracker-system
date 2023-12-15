import { Routes, Route, useNavigate } from "react-router-dom";
import DoctorPage from "../../pages/DoctorPage";
import Layout from "../layout/Layout";
import HomePage from "../../pages/HomePage";
import { useContext, useEffect } from 'react';
import AuthContext from "../../store/auth-context";
import HelpPage from "../../pages/HelpPage";
import PatientPage from "../../pages/PatientPage";
import PatientAppointmentPage from "../../pages/PatientAppointmentPage";
import { useParams } from "react-router-dom";
import AddRecordForm from "../common/AddRecordForm";

function PatientRoutes() {

    return (
        <Layout title="PTMS | Patient" role="patient">
            <Routes>
                <Route path='/' element={<PatientPage />} />
                <Route path='/appointments' element={<PatientAppointmentPage />} />
                {/* <Route path='/notifications' element={<NotificationPage />} /> */}
                <Route path='/help' element={<HelpPage />} />
                <Route path='/add-record' element={<AddRecordForm />} />
            </Routes>
        </Layout>
    );
}

export default PatientRoutes;


// // Higher-order component to wrap PatientDetailsPage
// function PatientDetailsRouteWrapper() {
//     const params = useParams();
//     return <PatientDetailsPage id={params.id} />;
// }