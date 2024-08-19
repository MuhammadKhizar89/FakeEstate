import Layout from "./routes/layout/layout";
import ListPage from "./routes/listPage/listPage";
import HomePage from "./routes/homePage/homePage";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link
} from "react-router-dom";
import SinglePage from "./routes/singlePage/SinglePage";
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
      }
    ]
  }
])

  return (
    <RouterProvider router={router} />
  );
}

export default App