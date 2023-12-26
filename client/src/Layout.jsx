import { Outlet } from "react-router-dom";
import Header from "./Header";
export default function Layout() {
    return (
        <div className="bg-page-gradient">
            <Header />
            <Outlet />
        </div>
    );
}