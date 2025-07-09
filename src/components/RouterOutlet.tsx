import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Login";
import Protected from "./Portected";
import Signup from "./Signup";
import App from "../App";

export default function RouterOutlet() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <App/>,
            children: [
                {
                    path: "/login",
                    element: (
                        <Protected authentication={false}>
                            <Login />
                        </Protected>
                    ),
                },
                {
                    path: "/signup",
                    element: (
                        <Protected authentication={false}>
                            <Signup />
                        </Protected>
                    ),
                },
            ]
        }
    ]);

    return <RouterProvider router={router}/>
}