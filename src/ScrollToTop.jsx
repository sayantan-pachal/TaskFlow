import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        // Target the specific scrollable container instead of the window
        const scrollContainer = document.getElementById("main-scroll-container");
        if (scrollContainer) {
            scrollContainer.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
    }, [pathname]);

    return null;
}