import { lazy } from "react";
import { Route } from "react-router-dom";

const routes = [
  {
    path: "",
    element: lazy(() => import("../pages/HomeTemplate")),
    nested: [
      {
        path: "/",
        element: lazy(() => import("../pages/HomeTemplate/Home")),
      },
      {
        path: "info",
        element: lazy(() => import("../pages/HomeTemplate/Info")),
      },
      {
        path: "contact",
        element: lazy(() => import("../pages/HomeTemplate/Contact")),
      },
      {
        path: "coursecate/:cate",
        element: lazy(() => import("../pages/HomeTemplate/CourseCate")),
      },
      {
        path: "all-courses",
        element: lazy(() => import("../pages/HomeTemplate/AllCourses")),
      },
      {
        path: "detail-course/:maKhoaHoc",
        element: lazy(() => import("../pages/HomeTemplate/DetailCourse")),
      },
      {
        path: "seach/:keyword",
        element: lazy(() => import("../pages/HomeTemplate/SearchPage")),
      },
    ],
  },
  {
    path: "user",
    element: lazy(() => import("../pages/UserTemplate")),
    nested: [
      {
        path: "login",
        element: lazy(() => import("../pages/UserTemplate/Login")),
      },
      {
        path: "register",
        element: lazy(() => import("../pages/UserTemplate/Register")),
      },
      {
        path: "profile",
        element: lazy(() => import("../pages/UserTemplate/Profile")),
      },
    ],
  },
  {
    path: "admin",
    element: lazy(() => import("../pages/AdminTemplate")),
    nested: [],
  },
];

const renderRoutes = () => {
  return routes.map((route) => {
    if (route.nested) {
      return (
        <Route key={route.path} path={route.path} element={<route.element />}>
          {route.nested.map((item) => {
            return (
              <Route
                key={item.path}
                path={item.path}
                element={<item.element />}
              />
            );
          })}
        </Route>
      );
    } else {
      return (
        <Route key={route.path} path={route.path} element={<route.element />} />
      );
    }
  });
};

export default renderRoutes;
