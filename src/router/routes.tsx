import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage";
import LoginPage from "../pages/LoginPage";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
        errorElement: <div>404</div>,
        children: [
            {
                path: "/login",
                element: <LoginPage />
            }
        ]
    }
])

export default routes