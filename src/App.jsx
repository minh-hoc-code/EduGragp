import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import các trang (Pages)
import LandingPage from './pages/LandingPage';
import Features from './pages/Features';
import Templates from './pages/Templates';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateDesign from './pages/CreateDesign'; 
import Generating from './pages/Generating';
import Editor from './pages/Editor';

// Import hệ thống bảo vệ
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* =============
            PUBLIC ROUTES
            ============= */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/features" element={<Features />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> 
        
        {/* =========================================
            PRIVATE ROUTES (Bắt buộc phải đăng nhập)
            ========================================= */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/create" 
          element={
            <ProtectedRoute>
              <CreateDesign />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/generating" 
          element={
            <ProtectedRoute>
              <Generating />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/editor" 
          element={
            <ProtectedRoute>
              <Editor />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;