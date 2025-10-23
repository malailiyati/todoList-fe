import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { TodoProvider } from "./context/TodoContext";
import { CategoryProvider } from "./context/CategoryContext";
import Router from "./Router";
import "antd/dist/reset.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CategoryProvider>
        <TodoProvider>
          <Router />
        </TodoProvider>
      </CategoryProvider>
    </BrowserRouter>
  </React.StrictMode>
);
