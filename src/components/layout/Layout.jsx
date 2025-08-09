import { Outlet } from "react-router";
import Navbar from "../navbar/Navbar";



const Layout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    );
};

export default Layout;