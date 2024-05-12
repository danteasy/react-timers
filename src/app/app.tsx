import Navigation from "@/app/navigation";
import { Container } from "@mui/material";
import AppRoutes from "./routes";

const App: React.FC<React.PropsWithChildren> = () => {
    return (
        <div className="App pt-4 pb-14 ">
            <Container maxWidth="lg">
                <Navigation />
                <AppRoutes />
            </Container>
        </div>
    );
};

export default App;
