import { NavigateFunction } from "react-router-dom";

let navigate: NavigateFunction;

export const setNavigate = (nav: NavigateFunction) => {
  navigate = nav;
};

export const handleNavigation = (path: string) => {
  if (navigate) {
    navigate(path);
  }
};
