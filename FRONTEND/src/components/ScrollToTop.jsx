import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Remonte en haut à chaque changement de page
  }, [pathname]); // Se déclenche à chaque changement de route

  return null;
};

export default ScrollToTop;
