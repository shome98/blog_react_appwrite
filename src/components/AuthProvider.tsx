import { Provider } from "react-redux";
import store from "../store/store";
import type React from "react";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>
}