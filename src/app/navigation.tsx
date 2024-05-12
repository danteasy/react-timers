import { useEffect, useState } from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import HomeIcon from "@mui/icons-material/Home";
import { useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useHideOnScroll } from "@/shared/hooks/use-hide-onscroll";

const NAVIGATION_PATHES = ["/", "/trash"];

const Navigation = () => {
    const { pathname } = useLocation();
    const [currentValue, setCurrentValue] = useState(
        +pathname.startsWith("/trash")
    );

    const navigate = useNavigate();
    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
    const isVisible = useHideOnScroll();
    const isShownOnCurrentPage = NAVIGATION_PATHES.includes(pathname);

    useEffect(() => {
        setCurrentValue(+pathname.startsWith("/trash"));
    }, [pathname]);

    return (
        <>
            {isShownOnCurrentPage ? (
                isMobile && isVisible ? (
                    <Paper
                        sx={{
                            position: "fixed",
                            bottom: 0,
                            left: 0,
                            width: "100vw",
                            zIndex: "20",
                            backgroundColor: "white",
                        }}
                        elevation={3}
                    >
                        <BottomNavigation showLabels value={currentValue}>
                            <BottomNavigationAction
                                label="Home"
                                icon={<HomeIcon />}
                                onClick={() => {
                                    setCurrentValue(0);
                                    navigate("/");
                                }}
                            />
                            <BottomNavigationAction
                                label="Trash"
                                icon={<DeleteIcon />}
                                onClick={() => {
                                    setCurrentValue(1);
                                    navigate("/trash");
                                }}
                            />
                        </BottomNavigation>
                    </Paper>
                ) : (
                    <BottomNavigation
                        showLabels
                        value={currentValue}
                        onChange={(event, newValue) => {
                            setCurrentValue(newValue);
                        }}
                    >
                        <BottomNavigationAction
                            label="Home"
                            icon={<HomeIcon />}
                            onClick={() => navigate("/")}
                        />
                        <BottomNavigationAction
                            label="Trash"
                            icon={<DeleteIcon />}
                            onClick={() => navigate("/trash")}
                        />
                    </BottomNavigation>
                )
            ) : null}
        </>
    );
};

export default Navigation;
