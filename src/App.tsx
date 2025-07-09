import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import authService from "./appwrite/auth.services";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/auth.slice";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLading] = useState(true);
  const dispatch = useDispatch()
  useEffect(() => {
    authService.getCurrentAccount()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        }
        else {
          dispatch(logout());
        }
      })
      .finally(() => setLading(false));
  })
  return !loading ? (
    <>

      <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
        <div className='w-full block'>
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </>
  ) : <h1 className="text-3xl text-center">hi from react</h1>;

}

export default App;
