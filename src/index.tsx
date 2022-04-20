import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import app from "./firebase";
console.log(app);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
