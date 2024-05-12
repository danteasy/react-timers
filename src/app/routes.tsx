import { Route, Routes } from "react-router-dom";
import { Home } from "@/pages/home";
import { Overview } from "@/pages/overview";
import { PlaybackPage } from "@/pages/playback";
import { TrashBin } from "@/pages/trash-bin";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/trash" element={<TrashBin />} />
            <Route path="/overview/:timerId" element={<Overview />} />
            <Route path="/playback/:timerId" element={<PlaybackPage />} />
        </Routes>
    );
};

export default AppRoutes;
