"use client"; // Needed because Redux hooks are client-side

import { Provider } from "react-redux";
import { store } from "./store";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}