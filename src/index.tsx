import React from "react";
import ReactDOM from "react-dom/client";
import "@/app/global.css";
import App from "@/app/app";
import { Provider as StoreProvider } from "react-redux";
import store from "@/app/store/store";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <StoreProvider store={store}>
        <App />
    </StoreProvider>
);
