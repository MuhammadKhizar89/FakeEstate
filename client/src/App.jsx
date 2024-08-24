import Layout from "./routes/layout/layout";
import ListPage from "./routes/listPage/listPage";
import HomePage from "./routes/homePage/homePage";
import ProfilePage from "./routes/profilePage/ProfilePage";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link
} from "react-router-dom";
import SinglePage from "./routes/singlePage/SinglePage";
import Register from "./routes/register/Register";
import Login from "./routes/login/Login";
import ProtectedRoute from "./ProtectedRoute";
function App() {
const router=createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/list",
        element: <ListPage />
      }
      ,{
        path: "/:id",
        element: <SinglePage />
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        )
      },
      {
        path: "/register",
        element: <Register/>
      },
      {
        path: "/login",
        element: <Login/>
      }
    ]
  }
])

  return (
    <RouterProvider router={router} />
  );
}

export default App