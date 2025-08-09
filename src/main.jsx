
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import ReactDOM from "react-dom/client";
import Layout from "./components/layout/Layout.jsx";
import Home from "./components/home/Home.jsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
   <Routes>
     <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
    </Route>
   </Routes>
  </BrowserRouter>
);
