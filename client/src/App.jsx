import Layout from "./routes/layout/layout";
import ListPage from "./routes/listPage/listPage";
import HomePage from "./routes/homePage/homePage";
import ProfilePage from "./routes/profilePage/ProfilePage";
import {createBrowserRouter, RouterProvider, Route, Link} from "react-router-dom";
import SinglePage from "./routes/singlePage/SinglePage";
import Register from "./routes/register/Register";
import Login from "./routes/login/Login";
import ProtectedRoute from "./ProtectedRoute";
import NewPostPage from "./routes/newPostPage/NewPostPage";
import ProfileUpdatePage from "./routes/profileUpdatePage/ProfileUpdatePage";
import { listPageLoader, profilePageLoader, singlePageLoader } from "./lib/loaders";
import ErrorPage from "./routes/Error/ErrorPage";
import Contact from "./routes/contact/Contact";
function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    path: "/",
                    element: <HomePage />,
                },
                {
                    path: "/list",
                    element: <ListPage />,
                    loader:listPageLoader,
                    errorElement:<ErrorPage/>

                },
                {
                    path: "/:id",
                    element: <SinglePage />,
                    loader: singlePageLoader,
                    errorElement:<ErrorPage/>

                },
                {
                    path: "/profile",
                    element: (
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    ),
                    loader:profilePageLoader,
                    errorElement:<ErrorPage/>
                },
                {
                    path: "/profile/update",
                    element: (
                        <ProtectedRoute>
                            <ProfileUpdatePage />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/add",
                    element: (
                        <ProtectedRoute>
                            <NewPostPage />
                        </ProtectedRoute>
                    ),
                },
                {
                    path: "/register",
                    element: <Register />,
                },
                {
                    path: "/login",
                    element: <Login />,
                },
                {
                    path: "/contact",
                element:<Contact/>
                }
            ],
        },
        {
            path: "*",
            element: <ErrorPage />,
        }
    ]);

    return <RouterProvider router={router} />;
}

export default App;
