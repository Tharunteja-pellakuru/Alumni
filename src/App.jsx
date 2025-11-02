import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ModalProvider, useModal } from "./context/ModalContext";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginPopup from "./components/LoginPopup";
import RegisterPopup from "./components/RegisterPopup";
import Home from "./pages/Home";
import Directory from "./pages/Directory";
import Events from "./pages/Events";
import Stories from "./pages/Stories";
import Gallery from "./pages/Gallery";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

const AppContent = () => {
  const {
    isLoginOpen,
    isRegisterOpen,
    openLogin,
    openRegister,
    closeLogin,
    closeRegister,
  } = useModal();
  const isModalOpen = isLoginOpen || isRegisterOpen;

  return (
    <>
      <div
        className={`flex flex-col min-h-screen transition-all duration-300 ${
          isModalOpen ? "blur-sm" : ""
        }`}
      >
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/directory" element={<Directory />} />
            <Route path="/events" element={<Events />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/alumni/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>

      {/* Modal Popups */}
      <LoginPopup
        isOpen={isLoginOpen}
        onClose={closeLogin}
        onSwitchToRegister={openRegister}
      />
      <RegisterPopup
        isOpen={isRegisterOpen}
        onClose={closeRegister}
        onSwitchToLogin={openLogin}
      />
    </>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <ModalProvider>
          <AppContent />
        </ModalProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
