import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Dashboard.css";

function Attendance() {

  const [employees, setEmployees] = useState([]);

  const [attendance, setAttendance] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const [editId, setEditId] = useState(null);


  const [formData, setFormData] = useState({

    employee_id: "",

    attendance_date: "",

    check_in: "",

    check_out: "",

    status: "Present"

  });


  // =========================
  // GET EMPLOYEES
  // =========================

  const fetchEmployees = () => {

    fetch("http://127.0.0.1:5000/employees")

      .then((response) => response.json())

      .then((data) => {

        setEmployees(data);

      })

      .catch((error) => {

        console.error(error);

      });

  };


  // =========================
  // GET ATTENDANCE
  // =========================

  const fetchAttendance = () => {

    fetch("http://127.0.0.1:5000/attendance")

      .then((response) => response.json())

      .then((data) => {

        setAttendance(data);

      })

      .catch((error) => {

        console.error(error);

      });

  };


  useEffect(() => {

    fetchEmployees();

    fetchAttendance();

  }, []);


  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (event) => {

    setFormData({

      ...formData,

      [event.target.name]: event.target.value

    });

  };


  // =========================
  // ADD OR UPDATE
  // =========================

  const handleSubmit = (event) => {

    event.preventDefault();


    const url = editMode

      ? `http://127.0.0.1:5000/attendance/${editId}`

      : "http://127.0.0.1:5000/attendance";


    const method = editMode

      ? "PUT"

      : "POST";


    fetch(url, {

      method: method,

      headers: {

        "Content-Type": "application/json"

      },

      body: JSON.stringify(formData)

    })

      .then((response) => response.json())

      .then((data) => {

        alert(data.message);

        resetForm();

        fetchAttendance();

      })

      .catch((error) => {

        console.error(error);

      });

  };


  // =========================
  // EDIT
  // =========================

  const handleEdit = (record) => {

    setEditMode(true);

    setEditId(record.attendance_id);

    setShowForm(true);


    setFormData({

      employee_id: record.employee_id,

      attendance_date: record.attendance_date,

      check_in: record.check_in || "",

      check_out: record.check_out || "",

      status: record.status

    });

  };


  // =========================
  // DELETE
  // =========================

  const handleDelete = (attendanceId) => {

    const confirmDelete = window.confirm(

      "Are you sure you want to delete this attendance record?"

    );


    if (!confirmDelete) {

      return;

    }


    fetch(

      `http://127.0.0.1:5000/attendance/${attendanceId}`,

      {

        method: "DELETE"

      }

    )

      .then((response) => response.json())

      .then((data) => {

        alert(data.message);

        fetchAttendance();

      })

      .catch((error) => {

        console.error(error);

      });

  };


  // =========================
  // RESET FORM
  // =========================

  const resetForm = () => {

    setFormData({

      employee_id: "",

      attendance_date: "",

      check_in: "",

      check_out: "",

      status: "Present"

    });


    setEditMode(false);

    setEditId(null);

    setShowForm(false);

  };


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

            className="nav-item"

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

            className="nav-item active"

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

            placeholder="Search attendance..."

          />


        </div>


      </div>


      {/* MAIN CONTENT */}

      <div className="main-content">


        {/* PAGE TITLE */}

        <div className="page-title">


          <div>


            <div className="title">

              Attendance Management

            </div>


            <p className="page-subtitle">

              Mark and manage employee attendance

            </p>


          </div>


          <button

            className="btn btn-primary"

            onClick={() => {

              setEditMode(false);

              setShowForm(true);

            }}

          >

            <i className="fas fa-plus"></i>

            Mark Attendance

          </button>


        </div>


        {/* FORM */}

        {showForm && (


          <div className="table-card">


            <div className="card-title">


              <h3>


                <i className="fas fa-calendar-check"></i>


                {editMode

                  ? "Edit Attendance"

                  : "Mark Attendance"}


              </h3>


            </div>


            <form

              onSubmit={handleSubmit}

              style={{

                padding: "25px",

                display: "grid",

                gridTemplateColumns:

                  "repeat(2, 1fr)",

                gap: "20px"

              }}

            >


              <div className="filter-group">


                <label>

                  Employee

                </label>


                <select

                  name="employee_id"

                  value={formData.employee_id}

                  onChange={handleChange}

                  required

                >


                  <option value="">

                    Select Employee

                  </option>


                  {employees.map((employee) => (


                    <option

                      key={employee.employee_id}

                      value={employee.employee_id}

                    >

                      {employee.name}

                    </option>


                  ))}


                </select>


              </div>


              <div className="filter-group">


                <label>

                  Attendance Date

                </label>


                <input

                  type="date"

                  name="attendance_date"

                  value={formData.attendance_date}

                  onChange={handleChange}

                  required

                />


              </div>


              <div className="filter-group">


                <label>

                  Check In

                </label>


                <input

                  type="time"

                  name="check_in"

                  value={formData.check_in}

                  onChange={handleChange}

                />


              </div>


              <div className="filter-group">


                <label>

                  Check Out

                </label>


                <input

                  type="time"

                  name="check_out"

                  value={formData.check_out}

                  onChange={handleChange}

                />


              </div>


              <div className="filter-group">


                <label>

                  Status

                </label>


                <select

                  name="status"

                  value={formData.status}

                  onChange={handleChange}

                >


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


              </div>


              <div

                style={{

                  display: "flex",

                  alignItems: "end",

                  gap: "10px"

                }}

              >


                <button

                  type="submit"

                  className="btn btn-primary"

                >

                  <i className="fas fa-save"></i>


                  {editMode

                    ? "Update"

                    : "Save"}


                </button>


                <button

                  type="button"

                  className="btn btn-outline"

                  onClick={resetForm}

                >

                  Cancel

                </button>


              </div>


            </form>


          </div>


        )}


        {/* ATTENDANCE TABLE */}

        <div className="table-card">


          <div className="card-title">


            <h3>


              <i className="fas fa-calendar-check"></i>


              Attendance Records


            </h3>


            <button

              className="btn btn-outline btn-sm"

              onClick={fetchAttendance}

            >

              <i className="fas fa-sync"></i>

              Refresh

            </button>


          </div>


          <table className="data-table">


            <thead>


              <tr>


                <th>

                  ID

                </th>


                <th>

                  Employee

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


                <th>

                  Actions

                </th>


              </tr>


            </thead>


            <tbody>


              {attendance.length === 0 ? (


                <tr>


                  <td

                    colSpan="7"

                    style={{

                      textAlign: "center",

                      padding: "30px"

                    }}

                  >

                    No attendance records found

                  </td>


                </tr>


              ) : (


                attendance.map((record) => (


                  <tr

                    key={record.attendance_id}

                  >


                    <td>

                      {record.attendance_id}

                    </td>


                    <td>

                      <strong>

                        {record.employee_name}

                      </strong>

                    </td>


                    <td>

                      {record.attendance_date}

                    </td>


                    <td>

                      {record.check_in || "—"}

                    </td>


                    <td>

                      {record.check_out || "—"}

                    </td>


                    <td>


                      <span

                        className={

                          record.status === "Present"

                            ? "status active"

                            : "status cancelled"

                        }

                      >


                        <i

                          className={

                            record.status === "Present"

                              ? "fas fa-check-circle"

                              : "fas fa-times-circle"

                          }

                        ></i>


                        {record.status}


                      </span>


                    </td>


                    <td>


                      <button

                        className="btn btn-primary btn-sm"

                        onClick={() =>

                          handleEdit(record)

                        }

                      >

                        <i className="fas fa-edit"></i>

                        Edit

                      </button>


                      <button

                        className="btn btn-outline btn-sm"

                        onClick={() =>

                          handleDelete(

                            record.attendance_id

                          )

                        }

                        style={{

                          marginLeft: "8px"

                        }}

                      >

                        <i className="fas fa-trash"></i>

                        delete

                      </button>


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


export default Attendance;