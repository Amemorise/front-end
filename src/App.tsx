import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Homepage from "./pages/Homepage";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import { User } from "./helpers/baseTypes";
import Navbar from "./components/Navbar";

interface ProtectedRouteProps {
    user?: User;
    redirectPath: string;
    children?: Element;
}
const ProtectedRoute = (props: ProtectedRouteProps) => {
    const { user, redirectPath, children } = props;
    if (!user) {
        return <Navigate to={redirectPath} replace />;
    }

    return children ? (
        <>{children}</>
    ) : (
        <>
            {/*Todo #change back for proper functioning*/}
            <Navbar user={user} />
            <Outlet />
        </>
    );
};

function App() {
    const [user, setUser] = useState<User | undefined>(undefined);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <ProtectedRoute
                            user={{ displayName: "Kofi Twum-Ampofo", email: "peterperfect96@gmail.com", emailVerified: true, photoURL: "https://lh3.googleusercontent.com/a-/AOh14GhVrrHKLdSo9ieDv4xhjPyvoKXYnTMguODKYuE0og=s96-c" }}
                            redirectPath={"login"}
                        />
                    }
                >
                    <Route path="/" element={<LandingPage />} />
                    <Route path="home" element={<Homepage />} />
                </Route>
                <Route path="login" element={<Login setUser={setUser} />} />
                <Route path="register" element={<SignUp setUser={setUser} />} />
                <Route path="reset-password" element={<ForgotPassword />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
