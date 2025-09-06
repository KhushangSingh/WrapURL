import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "./routeTree.js"
import AuthPage from "../pages/AuthPage.jsx"

export const homePageRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: AuthPage,
})
