import { useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Index from "./views/core/Index";
import Detail from "./views/core/Detail";
import Search from "./views/core/Search";
import Category from "./views/core/Category";
import About from "./views/pages/About";
import Contact from "./views/pages/Contact";
import Register from "./views/auth/Register";
import Login from "./views/auth/Login";
import Logout from "./views/auth/Logout";
import ForgotPassword from "./views/auth/ForgotPassword";
import CreatePassword from "./views/auth/CreatePassword";
import Dashboard from "./views/dashboard/Dashboard";
import Posts from "./views/dashboard/Posts";
import AddPost from "./views/dashboard/AddPost";
import EditPost from "./views/dashboard/EditPost";
import Comments from "./views/dashboard/Comments";
import Notifications from "./views/dashboard/Notifications";
import ErrorBoundary from "./utils/ErrorBoundary ";
import MainWrapper from "./layouts/MainWrapper";
import PrivateRoute from "./layouts/PrivateRoute";
import PublicRoute from "./layouts/PublicRoute";
import ErrorPage from "./views/pages/ErrorPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LIbrary from "./views/dashboard/LIbrary";
import Stats from "./views/dashboard/Stats";
import ProfileLayout from "./views/dashboard/ProfileLayout";
import NotFound from "./views/pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary>
            <MainWrapper>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/post/:slug" element={<Detail />} />
                <Route path="/category/:slug" element={<Category />} />
                <Route path="/search" element={<Search />} />

                <Route path="/error" element={<ErrorPage />} />

                <Route element={<PublicRoute />}>
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                </Route>

                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/create-password" element={<CreatePassword />} />
                <Route path="/profile/:username" element={<ProfileLayout />} />

                {/* Dashboard */}
                <Route element={<PrivateRoute />}>
                  <Route path="/library" element={<LIbrary />} />
                  <Route path="/stats" element={<Stats />} />
                  <Route path="/logout" element={<Logout />} />

                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/posts" element={<Posts />} />
                  <Route path="/add-post" element={<AddPost />} />
                  <Route path="/edit-post/:id" element={<EditPost />} />
                  <Route path="/comments" element={<Comments />} />
                  <Route path="/notifications" element={<Notifications />} />
                </Route>

                {/* Pages */}
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </MainWrapper>
          </ErrorBoundary>
        </QueryClientProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
