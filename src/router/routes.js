import { createBrowserRouter } from "react-router";

import App from "../App.jsx"
import AdminPanel from "@/admin/AdminPanel.jsx";
import SalePanel from "@/user/SalePanel.jsx";

export const router = createBrowserRouter(
    [
        { path: "/", Component: App },
        { path: "/admin", Component: AdminPanel },
        { path: "/sale", Component: SalePanel },
    ]
);