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
import { listPageLoader, singlePageLoader } from "./lib/loaders";
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
                },
                {
                    path: "/:id",
                    element: <SinglePage />,
                    loader: singlePageLoader,
                },
                {
                    path: "/profile",
                    element: (
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    ),
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
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
