import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/UserAuthentication/Login";
import SignUp from "./pages/UserAuthentication/SignUp";
import ForgotPassword from "./pages/UserAuthentication/ForgotPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import LeaderBoards from "./pages/LeaderBoards";
import Settings from "./pages/Settings";
import Collections from "./pages/MyCollections";
import MyProfile from "./pages/MyProfile";
import Users from "./pages/Users";
import CreateCollection from "./pages/CollectionManagement/CreateCollection";
import ViewCollection from "./pages/CollectionManagement/ViewCollection";
import ReviewCollection from "./pages/CollectionManagement/ReviewCollection";
import CardLearnSession from "./pages/CollectionManagement/CardLearnSession";
import "./App.scss";
import EditCollection from "./pages/CollectionManagement/EditCollection";
import SearchCollection from "./pages/SearchCollection";
import AlertToast from "./components/AlertToast";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingOverlay from "./components/LoadingOverlay";

function App() {
    return (
        <BrowserRouter>
            <ErrorBoundary>
                <LoadingOverlay>
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
                            <Route path="users" element={<Users />} />
                        </Route>
                        <Route path="login" element={<Login />} />
                        <Route path="landingPage" element={<LandingPage />} />
                        <Route path="register" element={<SignUp />} />
                        <Route path="reset-password" element={<ForgotPassword />} />
                    </Routes>
                    <AlertToast />
                </LoadingOverlay>
            </ErrorBoundary>
        </BrowserRouter>
    );
}

export default App;
