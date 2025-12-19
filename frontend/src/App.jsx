import React from "react";
import { useDispatch } from "react-redux";
import { signupaction } from "./store/actions/authActions";
import Login from "./components/Login/Login";
import SignUp from "./components/Signup/SignUp";

function App() {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [newUser, setNewUser] = React.useState(false);

  return (
    <div className="App">
      {!isLoggedIn ? (
        newUser ? (
          <SignUp setNewUser={setNewUser} newUser={newUser} />
        ) : (
          <Login setNewUser={setNewUser} newUser={newUser} />
        )
      ) : (
        <h1>Welcome to KitchenOS!</h1>
      )}
    </div>
  );
}

export default App;
