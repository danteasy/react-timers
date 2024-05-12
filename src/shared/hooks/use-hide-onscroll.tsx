import { useEffect, useRef, useState } from "react";

export const useHideOnScroll = (initialVisible = true) => {
    const [isVisible, setIsVisible] = useState(initialVisible);

    const prevScroll = useRef<number>(0);

    useEffect(() => {
        const handleScroll = (event: Event) => {
            const diff = 50;
            const currentScrollY = window.scrollY;
            const deltaY = currentScrollY - prevScroll.current;
            if (deltaY > diff) {
                setIsVisible(false);
                prevScroll.current = currentScrollY;
            } else if (deltaY * -1 > diff) {
                setIsVisible(true);
                prevScroll.current = currentScrollY;
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return isVisible;
};
