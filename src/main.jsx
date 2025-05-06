import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { router } from "./router/routes.js";
import { RouterProvider } from 'react-router';
import { Provider } from "@/components/ui/provider"
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>

)
