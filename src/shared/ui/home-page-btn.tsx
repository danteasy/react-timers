import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import React from "react";
type Props = React.ComponentProps<typeof Button>;

export const HomePageBtn: React.FC<Props> = props => {
    return (
        <Link to="/">
            <Button
                color="primary"
                variant="text"
                size="small"
                sx={{
                    padding: "0",
                    margin: "0",
                }}
                {...props}
                startIcon={<ArrowLeftIcon fontSize="small" />}
            >
                Home
            </Button>
        </Link>
    );
};
