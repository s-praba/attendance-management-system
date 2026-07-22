import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Dashboard.css";

function Dashboard() {

  const [stats, setStats] = useState({
    total_employees: 0,
    active_employees: 0,
    present_today: 0,
    absent_today: 0
  });

  const [departmentStats, setDepartmentStats] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

  fetch("http://127.0.0.1:5000/dashboard-stats")

    .then((response) => response.json())

    .then((data) => {

      setStats(data);

    })

    .catch((error) => {

      console.error(
        "Error fetching dashboard statistics:",
        error
      );

    });


  fetch("http://127.0.0.1:5000/department-stats")

    .then((response) => response.json())

    .then((data) => {

      setDepartmentStats(data);

    })

    .catch((error) => {

      console.error(
        "Error fetching department statistics:",
        error
      );

    })

    .finally(() => {

      setLoading(false);

    });

}, []);

  const activePercentage =
    stats.total_employees > 0
      ? Math.round(
          (stats.active_employees /
            stats.total_employees) *
            100
        )
      : 0;


  return (

    <div className="container">


      {/* SIDEBAR */}

      <div className="sidebar">

        <div className="logo">

          <h1>
            Admin<span>Panel</span>
          </h1>

        </div>


        <div className="nav-menu">


          <div className="menu-heading">
            Main
          </div>


          <Link
            to="/dashboard"
            className="nav-item active"
          >

            <i className="fas fa-chart-pie"></i>

            <span>
              Dashboard
            </span>

          </Link>


          <Link
            to="/employee"
            className="nav-item"
          >

            <i className="fas fa-users"></i>

            <span>
              Employee
            </span>

          </Link>


          <Link
            to="/attendance"
            className="nav-item"
          >

            <i className="fas fa-calendar-check"></i>

            <span>
              Attendance
            </span>

          </Link>


          <Link
            to="/history"
            className="nav-item"
          >

            <i className="fas fa-clock-rotate-left"></i>

            <span>
              History
            </span>

          </Link>


          <div className="menu-heading">
            Admin
          </div>


          <a
            href="#"
            className="nav-item"
          >

            <i className="fas fa-cog"></i>

            <span>
              Settings
            </span>

          </a>


        </div>

      </div>


      {/* HEADER */}

      <div className="header">

        <div className="search-bar">

          <i className="fas fa-search"></i>

          <input
            type="text"
            placeholder="Search..."
          />

        </div>

      </div>


      {/* MAIN CONTENT */}

      <div className="main-content">


        <div className="page-title">


          <div>

            <div className="title">
              Dashboard
            </div>

            <p className="page-subtitle">
              Overview of your employee attendance system
            </p>

          </div>


          <div className="action-buttons">


            <button
              className="btn btn-outline"
            >

              <i className="fas fa-download"></i>

              Export

            </button>


            <Link
              to="/employee"
              className="btn btn-primary"
            >

              <i className="fas fa-plus"></i>

              Add Employee

            </Link>


          </div>


        </div>


        {/* STATISTICS */}

        <div className="stats-cards">


          {/* TOTAL EMPLOYEES */}

          <div className="stat-card">


            <div className="card-header">


              <div>


                <div className="card-value">

                  {loading
                    ? "..."
                    : stats.total_employees}

                </div>


                <div className="card-label">
                  Total Employees
                </div>


              </div>


              <div className="card-icon purple">

                <i className="fas fa-users"></i>

              </div>


            </div>


            <div className="card-change positive">

              <i className="fas fa-users"></i>

              <span>
                All employees
              </span>

            </div>


          </div>


          {/* ACTIVE EMPLOYEES */}

          <div className="stat-card">


            <div className="card-header">


              <div>


                <div className="card-value">

                  {loading
                    ? "..."
                    : stats.active_employees}

                </div>


                <div className="card-label">
                  Active Employees
                </div>


              </div>


              <div className="card-icon green">

                <i className="fas fa-user-check"></i>

              </div>


            </div>


            <div className="card-change positive">

              <i className="fas fa-arrow-up"></i>

              <span>
                {activePercentage}% of total employees
              </span>

            </div>


          </div>


          {/* PRESENT TODAY */}

          <div className="stat-card">


            <div className="card-header">


              <div>


                <div className="card-value">

                  {loading
                    ? "..."
                    : stats.present_today}

                </div>


                <div className="card-label">
                  Present Today
                </div>


              </div>


              <div className="card-icon blue">

                <i className="fas fa-calendar-check"></i>

              </div>


            </div>


            <div className="card-change positive">

              <i className="fas fa-arrow-up"></i>

              <span>
                Today's attendance
              </span>

            </div>


          </div>


          {/* ABSENT TODAY */}

          <div className="stat-card">


            <div className="card-header">


              <div>


                <div className="card-value">

                  {loading
                    ? "..."
                    : stats.absent_today}

                </div>


                <div className="card-label">
                  Absent Today
                </div>


              </div>


              <div className="card-icon orange">

                <i className="fas fa-user-xmark"></i>

              </div>


            </div>


            <div className="card-change negative">

              <i className="fas fa-arrow-down"></i>

              <span>
                Needs attention
              </span>

            </div>


          </div>


        </div>


        {/* DEPARTMENT STATISTICS */}

        <div className="table-card">


          <div className="card-title">

            <h3>

              <i className="fas fa-building"></i>

              Department-wise Employee Count

            </h3>

          </div>


          <table className="data-table">


            <thead>

              <tr>

                <th>
                  Department
                </th>

                <th>
                  Total Employees
                </th>

                <th>
                  Active Employees
                </th>

                <th>
                  Present Today
                </th>

              </tr>

            </thead>

          <tbody>

            {departmentStats.map((department) => (

              <tr key={department.department}>

                <td>
                  {department.department}
                </td>

                <td>
                  {department.total_employees}
                </td>

                <td>
                  {department.active_employees}
                </td>

                <td>
                  {department.present_today}
                </td>

              </tr>

            ))}

          </tbody>
            


          </table>


        </div>


      </div>


    </div>

  );

}


export default Dashboard;
