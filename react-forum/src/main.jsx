import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Questions from "./pages/subpages/Questions.jsx";
import Responses from "./pages/subpages/Responses.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { QuestionAnswerProvider } from "./context/QuestionAnswerContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <AuthProvider>
        <QuestionAnswerProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route index="/home" element={<Home />} />
                        <Route path="/question" element={<Questions />} />
                        <Route path="/reponse" element={<Responses />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </QuestionAnswerProvider>
    </AuthProvider>
);
