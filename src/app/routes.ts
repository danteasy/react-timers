import { createBrowserRouter, RouteObject } from "react-router-dom";

const routesConfig: RouteObject[] = [
    {
        path: "/",
        element: "sss",
    },
];

const routes = createBrowserRouter(routesConfig);

export default routes;
