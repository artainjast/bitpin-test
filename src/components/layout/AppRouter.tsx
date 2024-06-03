import { Outlet, createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import { ROUTES } from "../../constants/routes";
import { HomePage } from "../pages/Home";

const DetailsPage = lazy(() => import("../pages/Details"));

const ErrorBoundaryLayout = () => (
  <ErrorBoundary>
    <Outlet />
  </ErrorBoundary>
);

export const appRouter = createBrowserRouter([
  {
    element: <ErrorBoundaryLayout />,
    children: [
      {
        path: ROUTES.MAIN,
        element: <HomePage />,
      },
      {
        path: `${ROUTES.MARKET_DETAILS}/:marketId`,
        element: <DetailsPage />,
      },
    ],
  },
]);