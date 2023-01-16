import React, { Component } from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="*" element={<NotFound />} />
        </Route>,
    ),
);

class AppRouter extends Component {
    render() {
        return <RouterProvider router={router} />;
    }
}

export default AppRouter;
