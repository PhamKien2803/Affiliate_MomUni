// src/App.jsx
import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./page/Customer/HomePage";
import LoginAdminPage from "./page/Auth/LoginComponents";
import ForgotPassword from "./page/Auth/ForgotPassword";
import VerifyOTP from './page/Auth/VerifyOTP';
import ResetPassword from "./page/Auth/ResetPassword";
import AdminLayout from "./page/Admin/AdminLayout";
import PublicRoute from './routes/PublicRoute';
import { mainRoute } from "./routes/mainRoute";
import { routesAdmin } from "./routes/routes";
import PrivateRoute from "./routes/PrivateRoute";
import Blog from "./page/Customer/Blog";
import CategoryPage from './page/Customer/CategoryPage';
import ProductPage from './page/Customer/ProductPage';
import BlogDetail from "./page/Customer/BlogDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/hand" element={<CategoryPage />} />
        <Route path="/product/resurrection-duet" element={<ProductPage />} />
        <Route path="/admin-dashboard" element={<AdminLayout />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginAdminPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        {/* Private Routes */}
        {Object.entries(mainRoute).map(([role, routeList]) => (
          <Route key={role} element={<PrivateRoute allowedRoles={[role]} />}>
            {role === "admin" ? (
              <Route element={<AdminLayout />}>
                {routesAdmin.map(({ path, component: Component }) => (
                  <Route key={path} path={path} element={<Component />} />
                ))}
              </Route>
            ) : (
              routeList.map(({ path, component: Component }) => (
                <Route key={path} path={path} element={Component} />
              ))
            )}
          </Route>
        ))}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
