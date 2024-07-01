import React, { useEffect } from 'react';
import { getlocal } from '../helpers/auth';
import jwtDecode from 'jwt-decode'; // Corrected import
import HomePage from '../pages/HomePage';
import OverViewPage from '../admin/AdminPages/OverViewPage';
import { useNavigate } from 'react-router-dom';

const PrivateRouter = ({ children, ...rest }) => {
    const response = getlocal(); // Removed argument
    const navigate = useNavigate();

    useEffect(() => {
        if (!response) {
            navigate("/login");
        }
    }, [response, navigate]);

    if (response) {
        const decoded = jwtDecode(response);
        if (decoded.is_admin) {
            console.log("Admin page");
            return (
                <div>
                    <OverViewPage title={'ADMIN PAGE'} />
                </div>
            );
        } else {
            console.log("User page");
            return (
                <div>
                    <HomePage title={'HOME PAGE'} />
                </div>
            );
        }
    } else {
        return null;
    }
};

export default PrivateRouter;
