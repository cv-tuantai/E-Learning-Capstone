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
    ],
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
