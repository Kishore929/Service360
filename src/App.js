import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, useLocation, Navigate } from 'react-router-dom';
import {
    LoginPage,
    RegisterPage,
    ForgotPassword,
    ResetPassword,
    ModifyUsers,
    ManageUsers,
    Projects,
    MainHomeLayout,
    ProjectDetails,
    HomePageContent,
    WebIndexLayout,
    WebPageContent,
    DisplayClickMePage
} from './Components/com_index';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';



const App = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [name, setName] = useState('');  // Using state for name
    

    const handleLogin = (userName) => {
        setName(userName); 
        setIsLoggedIn(true); // Update login state
    };

    // Wrapper for dynamic ModifyUsers
    const ModifyUsersWrapper = () => {
        const { selectedCom } = useParams();
        return <ModifyUsers selectedCom={selectedCom} />;
    };

    // Wrapper for dynamic Projects
    const ProjectsWrapper = () => {
        const { selectedCom } = useParams();
        return <Projects selectedCom={selectedCom} />;
    };

    // Wrapper for ProjectDetails with query params

    const Project_Details = () => {
        // const location = useLocation();
        const { projectId, selectedCom } = useParams(); // Extract projectId and component from the URL
        const id = parseInt(projectId);
        console.log({ id, selectedCom });
        return <ProjectDetails projectId={id} selectedCom={selectedCom} />;
    };


    return (
        <Router>
            <div className="root-content-app">
                {/* Routes */}
                <Routes>
                    {/* Initial WebIndex Route */}
                    <Route
                        path="/"
                        element={
                            isLoggedIn ? <Navigate to="/home" replace /> : <WebIndexLayout />
                        }
                    />

                    <Route path="/" element={<WebIndexLayout />}>
                        {/* Login/Register/Forgot Password */}
                        <Route index element={<WebPageContent />} />
                        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/reset-password" element={<ResetPassword />} />
                    </Route>

                    {/* Main Home Layout */}
                    {isLoggedIn && (
                        <Route path="/home" element={<MainHomeLayout />}>
                            {/* Home Page Content */}
                            <Route index element={<HomePageContent user={name} />} />

                            {/* Modify Users */}
                            <Route path="modifyUsers" element={<ModifyUsers />} />
                            <Route path="display" element={<DisplayClickMePage />} />
                            <Route
                                path="modifyUsers/:selectedCom"
                                element={<ModifyUsersWrapper />}
                            />

                            {/* Manage Users */}
                            <Route path="manageUsers" element={<ManageUsers />} />

                            {/* Projects */}
                            <Route path="projects" element={<Projects />} />
                            <Route
                                path="projects/:selectedCom"
                                element={<ProjectsWrapper />}
                            />

                            {/* Project Details */}

                            <Route
                                path="projects/ProjectDetails/:selectedCom/:projectId"
                                element={<Project_Details />}
                            />

                            <Route
                                path="projects/ProjectDetails/*"
                                element={<Project_Details />}
                            />

                        </Route>
                    )}

                    {/* Redirect to login if not logged in */}
                    <Route
                        path="*"
                        element={<Navigate to={isLoggedIn ? '/home' : '/login'} replace />}
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
