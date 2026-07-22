import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { useState } from "react";

import Login from "./components/Login";

import Dashboard from "./components/Dashboard";

import Employee from "./components/Employee";

import Attendance from "./components/Attendance";

import History from "./components/History";


// =========================
// PROTECTED ROUTE
// =========================

function ProtectedRoute({ children, isLoggedIn }) {

  if (!isLoggedIn) {

    return <Navigate to="/login" />;

  }

  return children;

}


// =========================
// APP
// =========================

function App() {


  const [isLoggedIn, setIsLoggedIn] = useState(

    localStorage.getItem("user") !== null

  );


  function handleLogin() {

    setIsLoggedIn(true);

  }


  function handleLogout() {

    localStorage.removeItem("user");

    setIsLoggedIn(false);

  }


  return (

    <BrowserRouter>


      <Routes>


        {/* =========================
            LOGIN PAGE
        ========================= */}

        <Route

          path="/login"

          element={

            isLoggedIn ? (

              <Navigate to="/dashboard" />

            ) : (

              <Login

                onLogin={handleLogin}

              />

            )

          }

        />


        {/* =========================
            DEFAULT PAGE
        ========================= */}

        <Route

          path="/"

          element={

            <Navigate

              to={

                isLoggedIn

                  ? "/dashboard"

                  : "/login"

              }

            />

          }

        />


        {/* =========================
            DASHBOARD
        ========================= */}

        <Route

          path="/dashboard"

          element={

            <ProtectedRoute

              isLoggedIn={isLoggedIn}

            >

              <Dashboard />

            </ProtectedRoute>

          }

        />


        {/* =========================
            EMPLOYEE
        ========================= */}

        <Route

          path="/employee"

          element={

            <ProtectedRoute

              isLoggedIn={isLoggedIn}

            >

              <Employee />

            </ProtectedRoute>

          }

        />


        {/* =========================
            ATTENDANCE
        ========================= */}

        <Route

          path="/attendance"

          element={

            <ProtectedRoute

              isLoggedIn={isLoggedIn}

            >

              <Attendance />

            </ProtectedRoute>

          }

        />


        {/* =========================
            HISTORY
        ========================= */}

        <Route

          path="/history"

          element={

            <ProtectedRoute

              isLoggedIn={isLoggedIn}

            >

              <History />

            </ProtectedRoute>

          }

        />


        {/* =========================
            INVALID URL
        ========================= */}

        <Route

          path="*"

          element={

            <Navigate

              to={

                isLoggedIn

                  ? "/dashboard"

                  : "/login"

              }

            />

          }

        />


      </Routes>


    </BrowserRouter>

  );

}


export default App;