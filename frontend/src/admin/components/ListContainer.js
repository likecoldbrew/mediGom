import { useParams } from 'react-router-dom';
import AllUsersList from "../pages/list/AllUsersList";
import PatientList from "../pages/list/PatientList";
import DoctorList from "../pages/list/DoctorList";
import AdminList from "../pages/list/AdminList";

const DetailContainer = () => {
    const { type } = useParams();

    switch (type) {
        case "all":
            return <AllUsersList />;
        case "patient":
            return <PatientList />;
        case "doctor":
            return <DoctorList />;
        case "admin":
            return <AdminList />;
    }
};

export default DetailContainer;