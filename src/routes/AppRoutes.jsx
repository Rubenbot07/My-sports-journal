import { useRoutes } from "react-router-dom";
import { routesConfig } from "./routesConfig";

export const AppRoutes = () => {
  return useRoutes(routesConfig);
};