import { Route, Routes, BrowserRouter } from "react-router-dom";
import Index from "./views/core/Index";
import Detail from "./views/core/Detail";
import Search from "./views/core/Search";
import Category from "./views/core/Category";
import Contact from "./views/pages/Contact";
import Register from "./views/auth/Register";
import Login from "./views/auth/Login";
import Logout from "./views/auth/Logout";
import ForgotPassword from "./views/auth/ForgotPassword";
import CreatePassword from "./views/auth/CreatePassword";
import Posts from "./views/admin/Posts";
import CreatePost from "./views/admin/CreatePost";
import EditPost from "./views/admin/EditPost";
import Comments from "./views/admin/Comments";
import Notifications from "./views/admin/Notifications";
import ErrorBoundary from "./utils/ErrorBoundary ";
import MainWrapper from "./layouts/MainWrapper";
import PrivateRoute from "./layouts/PrivateRoute";
import PublicRoute from "./layouts/PublicRoute";
import ErrorPage from "./views/pages/ErrorPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Stats from "./views/admin/Stats";
import NotFound from "./views/pages/NotFound";
import ProfilePage from "./views/pages/ProfilePage";
import HelpCenter from "./views/pages/Help";
import AccountSettings from "./views/pages/AccountSettings";

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
                <Route path="/profile/:username" element={<ProfilePage />} />

                {/* Dashboard */}
                <Route element={<PrivateRoute />}>
                  <Route path="/stats" element={<Stats />} />
                  <Route path="/logout" element={<Logout />} />

                  <Route path="/post" element={<Posts />} />
                  <Route path="/new-post" element={<CreatePost />} />
                  <Route path="/edit-post/:id" element={<EditPost />} />

                  <Route path="/comments" element={<Comments />} />
                  <Route path="/notifications" element={<Notifications />} />
                </Route>

                {/* Pages */}
                <Route path="/contact" element={<Contact />} />
                <Route path="/settings" element={<AccountSettings />} />
                <Route path="/help" element={<HelpCenter />} />

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
