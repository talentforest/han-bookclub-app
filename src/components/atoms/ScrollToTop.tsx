import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop(): null {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!pathname.includes("/bookclub/")) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
