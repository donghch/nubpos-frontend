import { createBrowserRouter } from "react-router";

import App from "../App.jsx"
import AdminPanel from "@/admin/AdminPanel.jsx";
import SalePanel from "@/user/SalePanel.jsx";
import InventoryView from "@/admin/views/InventoryView.jsx";
import AnalyticsView from "@/admin/views/AnalyticsView.jsx";

export const router = createBrowserRouter(
    [
        { path: "/", Component: App },
        {
            path: "/admin",
            Component: AdminPanel,
            children: [
                { path: "inventory", Component: InventoryView },
                { path: "analytics", Component: AnalyticsView },
            ]
        },
        { path: "/sale", Component: SalePanel },
    ]
);