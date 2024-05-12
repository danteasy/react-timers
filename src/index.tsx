import ReactDOM from "react-dom/client";
import "@/app/global.css";
import { Provider as StoreProvider } from "react-redux";
import store, { persistor } from "@/app/store/store";
import { BrowserRouter } from "react-router-dom";
import App from "./app/app";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <StoreProvider store={store}>
        <BrowserRouter>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </BrowserRouter>
    </StoreProvider>
);
