import React, { useState } from "react";
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import { User } from "./helpers/baseTypes";
import ProtectedRoute from "./components/ProtectedRoute";
import LeaderBoards from "./pages/LeaderBoards";
import Settings from "./pages/Settings";
import Collections from "./pages/Collections";
import MyProfile from "./pages/MyProfile";
import Users from "./pages/Users";
import { DUMMY_USER } from "./helpers/constants";
import CreateCollection from "./pages/CreateCollection";
import ViewCollection from "./pages/ViewCollection";

function App() {
    const [user, setUser] = useState<User | undefined>(undefined);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProtectedRoute user={user || DUMMY_USER} redirectPath={"login"} />}>
                    <Route index element={<Homepage />} />
                    <Route path="Settings" element={<Settings />} />
                    <Route path="collections">
                        <Route index element={<Collections />} />
                        <Route path="create" element={<CreateCollection />} />
                        <Route path=":id" element={<ViewCollection />} />
                    </Route>
                    <Route path="profile" element={<MyProfile />} />
                    <Route path="leaderboard" element={<LeaderBoards />} />
                    <Route path="users" element={<Users />} />
                </Route>
                <Route path="login" element={<Login setUser={setUser} />} />
                <Route path="/landingPage" element={<LandingPage />} />
                <Route path="register" element={<SignUp setUser={setUser} />} />
                <Route path="reset-password" element={<ForgotPassword />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
