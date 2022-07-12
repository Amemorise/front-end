import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import LeaderBoards from "./pages/LeaderBoards";
import Settings from "./pages/Settings";
import Collections from "./pages/Collections";
import MyProfile from "./pages/MyProfile";
import Users from "./pages/Users";
import CreateCollection from "./pages/CreateCollection";
import ViewCollection from "./pages/ViewCollection";
import ReviewCollection from "./pages/ReviewCollection";
import CardLearnSession from "./pages/CardLearnSession";
import "./App.scss";
import EditCollection from "./pages/EditCollection";
import SearchCollection from "./pages/SearchCollection";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProtectedRoute />}>
                    <Route path="home" element={<Homepage />} />
                    <Route path="Settings" element={<Settings />} />
                    <Route path="collections">
                        <Route index element={<Collections />} />
                        <Route path="create" element={<CreateCollection />} />
                        <Route path=":id">
                            <Route index element={<ViewCollection />} />
                            <Route path="review" element={<ReviewCollection />} />
                            <Route path="start" element={<CardLearnSession />} />
                            <Route path="edit" element={<EditCollection />} />
                        </Route>
                    </Route>
                    <Route path="profile" element={<MyProfile />} />
                    <Route path="search" element={<SearchCollection />} />
                    <Route path="leaderboard" element={<LeaderBoards />} />
                    <Route path="users" element={<Users />} />{" "}
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="landingPage" element={<LandingPage />} />
                <Route path="register" element={<SignUp />} />
                <Route path="reset-password" element={<ForgotPassword />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
