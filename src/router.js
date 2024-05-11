import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Edit from "./components/Edit";
import Header from "./Header";

export default createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        path: "/",
        element: <App />,
        children: [
          {
            path: ":id",
            element: <App />,
          },
        ],
      },
      {
        path: "/insert",
        element: <Edit method="insert" />,
      },
      {
        path: "/update",
        element: <Edit method="update" />,
        children: [
          {
            path: ":id",
            element: <Edit method="update" />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <h1>페이지를 찾을 수 없습니다.</h1>,
  },
]);
