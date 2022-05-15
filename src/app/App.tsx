import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./layout/Navbar";
import NotFoundPage from "./layout/pages/NotFoundPage";
import HomePage from "./layout/pages/HomePage";
import BookmarksPage from "./layout/pages/BookmarksPage";
import LoadingComponent from "../features/shared/LoadingComponent";
import BtnBackToTop from "../features/shared/BtnBackToTop";
import Footer from "./layout/Footer";

function App() {
    return (
        <Router>
            <div className="container">
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/bookmarks" element={<BookmarksPage />} />
                    <Route path="/notfound" element={<NotFoundPage />} />
                    <Route path="/spinner" element={<LoadingComponent />} />
                    {/* 
                        i put catch all route last because when its on netlify
                        it doesn't work, but locally it does, i think its due to 
                        how they process subdomains , nothing else makes sense.
                    */}
                    <Route
                        path="/*"
                        element={<NotFoundPage message="No such path." />}
                    />
                </Routes>
                <BtnBackToTop />
                <Footer />
            </div>
        </Router>
    );
}

export default App;
