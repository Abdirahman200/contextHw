import React from "react";

const AuthContext = React.createContext({
    isLoggedIn: true,
    onLogout: () => {},
});

export default AuthContext;