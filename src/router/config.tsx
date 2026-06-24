import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import ServicesPage from "../pages/services/page";
import OurWorkPage from "../pages/ourwork/page";
import AboutPage from "../pages/about/page";
import FinancingPage from "../pages/financing/page";
import CareersPage from "../pages/careers/page";
import FranchisePage from "../pages/franchise/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/our-services",
    element: <ServicesPage />,
  },
  {
    path: "/our-work",
    element: <OurWorkPage />,
  },
  {
    path: "/about-us",
    element: <AboutPage />,
  },
  {
    path: "/financing",
    element: <FinancingPage />,
  },
  {
    path: "/careers",
    element: <CareersPage />,
  },
  {
    path: "/franchise",
    element: <FranchisePage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;