import { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider = ({ children }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const openLogin = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  };

  const openRegister = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };

  const closeLogin = () => {
    setIsLoginOpen(false);
  };

  const closeRegister = () => {
    setIsRegisterOpen(false);
  };

  const closeAll = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        isLoginOpen,
        isRegisterOpen,
        openLogin,
        openRegister,
        closeLogin,
        closeRegister,
        closeAll,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

