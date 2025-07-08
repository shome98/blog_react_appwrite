import "./App.css";
import Signup from "./components/Signup";
import AuthProvider from "./components/AuthProvider";
import Login from "./components/Login";

function App() {
  return (
    <>
      <h1 className="text-3xl text-center">hi from react</h1>
      <div className="w-40 mx-auto flex flex-row items-center"></div>
      <AuthProvider>
        <Signup />
        <Login/>
      </AuthProvider>
    </>
  );
}

export default App;
