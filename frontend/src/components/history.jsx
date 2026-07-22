import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Dashboard.css";

function History() {
const [attendance, setAttendance] = useState([]);
const [searchTerm, setSearchTerm] = useState("");
const [dateFilter, setDateFilter] = useState("");
const [statusFilter, setStatusFilter] = useState("All");
const [loading, setLoading] = useState(true);

useEffect(() => {
fetch("http://127.0.0.1:5000/attendance")
.then((response) => response.json())
.then((data) => {
setAttendance(data);
setLoading(false);
})
.catch((error) => {
console.error("Error fetching attendance:", error);
setLoading(false);
});
}, []);

const filteredAttendance = attendance.filter((record) => {
const employeeName = record.employee_name || "";

const matchesSearch = employeeName
  .toLowerCase()
  .includes(searchTerm.toLowerCase());

const matchesDate =
  dateFilter === "" ||
  record.attendance_date === dateFilter;

const matchesStatus =
  statusFilter === "All" ||
  record.status === statusFilter;

return (
  matchesSearch &&
  matchesDate &&
  matchesStatus
);

});

return ( 
<div className="container">

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
        className="nav-item"
      >
        <i className="fas fa-chart-pie"></i>
        <span>Dashboard</span>
      </Link>

      <Link
        to="/employee"
        className="nav-item"
      >
        <i className="fas fa-users"></i>
        <span>Employee</span>
      </Link>

      <Link
        to="/attendance"
        className="nav-item"
      >
        <i className="fas fa-calendar-check"></i>
        <span>Attendance</span>
      </Link>

      <Link
        to="/history"
        className="nav-item active"
      >
        <i className="fas fa-clock-rotate-left"></i>
        <span>History</span>
      </Link>

      <div className="menu-heading">
        Admin
      </div>

      <a
        href="#"
        className="nav-item"
      >
        <i className="fas fa-cog"></i>
        <span>Settings</span>
      </a>

    </div>

  </div>


  <div className="header">

    <div className="search-bar">

      <i className="fas fa-search"></i>

      <input
        type="text"
        placeholder="Search..."
      />

    </div>

  </div>


  <div className="main-content">

    <div className="page-title">

      <div>

        <div className="title">
          Attendance History
        </div>

        <p className="page-subtitle">
          View and filter employee attendance records
        </p>

      </div>

    </div>


    <div className="table-card">

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "20px",
          flexWrap: "wrap"
        }}
      >

        <input
          type="text"
          placeholder="Search employee name..."
          value={searchTerm}
          onChange={(event) =>
            setSearchTerm(event.target.value)
          }
          style={{
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            minWidth: "220px"
          }}
        />

        <input
          type="date"
          value={dateFilter}
          onChange={(event) =>
            setDateFilter(event.target.value)
          }
          style={{
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "6px"
          }}
        />

        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value)
          }
          style={{
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "6px"
          }}
        >

          <option value="All">
            All Status
          </option>

          <option value="Present">
            Present
          </option>

          <option value="Absent">
            Absent
          </option>

          <option value="Leave">
            Leave
          </option>

        </select>

        <button
          className="btn btn-outline"
          onClick={() => {
            setSearchTerm("");
            setDateFilter("");
            setStatusFilter("All");
          }}
        >

          <i className="fas fa-rotate-left"></i>

          Clear Filters

        </button>

      </div>


      <table className="data-table">

        <thead>

          <tr>

            <th>
              Employee Name
            </th>

            <th>
              Date
            </th>

            <th>
              Check In
            </th>

            <th>
              Check Out
            </th>

            <th>
              Status
            </th>

          </tr>

        </thead>

        <tbody>

          {loading ? (

            <tr>

              <td
                colSpan="5"
                style={{
                  textAlign: "center"
                }}
              >
                Loading attendance records...
              </td>

            </tr>

          ) : filteredAttendance.length === 0 ? (

            <tr>

              <td
                colSpan="5"
                style={{
                  textAlign: "center"
                }}
              >
                No attendance records found
              </td>

            </tr>

          ) : (

            filteredAttendance.map((record) => (

              <tr
                key={record.attendance_id}
              >

                <td>
                  {record.employee_name}
                </td>

                <td>
                  {record.attendance_date}
                </td>

                <td>
                  {record.check_in || "-"}
                </td>

                <td>
                  {record.check_out || "-"}
                </td>

                <td>

                  <span
                    className={
                      record.status === "Present"
                        ? "status active"
                        : record.status === "Absent"
                        ? "status inactive"
                        : "status"
                    }
                  >
                    {record.status}
                  </span>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>

  </div>

</div>


);
}

export default History;
