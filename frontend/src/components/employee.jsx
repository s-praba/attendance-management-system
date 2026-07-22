import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Dashboard.css";

function Employee() {
  const [employees, setEmployees] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    department: "",
    designation: "",
    email: "",
    phone: "",
    status: "Active",
    joining_date: "",
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
        console.error("Error fetching employees:", error);
      });
  };


  useEffect(() => {
    fetchEmployees();
  }, []);


  // =========================
  // HANDLE INPUT CHANGE
  // =========================

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };


  // =========================
  // ADD OR UPDATE EMPLOYEE
  // =========================

  const handleSubmit = (event) => {
    event.preventDefault();


    // UPDATE EMPLOYEE
    if (editMode) {
      fetch(`http://127.0.0.1:5000/employees/${editId}`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          alert(data.message);

          resetForm();

          fetchEmployees();
        })
        .catch((error) => {
          console.error("Error updating employee:", error);
        });

      return;
    }


    // ADD EMPLOYEE
    fetch("http://127.0.0.1:5000/employees", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);

        resetForm();

        fetchEmployees();
      })
      .catch((error) => {
        console.error("Error adding employee:", error);
      });
  };


  // =========================
  // EDIT EMPLOYEE
  // =========================

  const handleEdit = (employee) => {
    setEditMode(true);

    setEditId(employee.employee_id);

    setShowForm(true);

    setFormData({
      name: employee.name || "",
      department: employee.department || "",
      designation: employee.designation || "",
      email: employee.email || "",
      phone: employee.phone || "",
      status: employee.status || "Active",
      joining_date: employee.joining_date || "",
    });
  };


  // =========================
  // DELETE EMPLOYEE
  // =========================

  const handleDelete = (employeeId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) {
      return;
    }


    fetch(`http://127.0.0.1:5000/employees/${employeeId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);

        fetchEmployees();
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
      });
  };


  // =========================
  // RESET FORM
  // =========================

  const resetForm = () => {
    setFormData({
      name: "",
      department: "",
      designation: "",
      email: "",
      phone: "",
      status: "Active",
      joining_date: "",
    });

    setEditMode(false);

    setEditId(null);

    setShowForm(false);
  };


  return (

    <div className="container">


      {/* =========================
          SIDEBAR
      ========================= */}

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
            className="nav-item active"
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


      {/* =========================
          HEADER
      ========================= */}

      <div className="header">


        <div className="search-bar">

          <i className="fas fa-search"></i>


          <input
            type="text"
            placeholder="Search employees..."
          />

        </div>


      </div>


      {/* =========================
          MAIN CONTENT
      ========================= */}

      <div className="main-content">


        {/* PAGE TITLE */}

        <div className="page-title">


          <div>

            <div className="title">
              Employee Management
            </div>


            <p className="page-subtitle">
              Manage your employees and their information
            </p>

          </div>


          <div className="action-buttons">


            <button
              className="btn btn-primary"
              onClick={() => {
                setEditMode(false);

                setShowForm(true);
              }}
            >

              <i className="fas fa-plus"></i>

              Add Employee

            </button>


          </div>


        </div>


        {/* =========================
            ADD / EDIT FORM
        ========================= */}

        {showForm && (


          <div className="table-card">


            <div className="card-title">


              <h3>


                <i
                  className={
                    editMode
                      ? "fas fa-user-edit"
                      : "fas fa-user-plus"
                  }
                ></i>


                {editMode
                  ? "Edit Employee"
                  : "Add New Employee"}


              </h3>


            </div>


            <form
              onSubmit={handleSubmit}
              style={{
                padding: "25px",

                display: "grid",

                gridTemplateColumns:
                  "repeat(2, 1fr)",

                gap: "20px",
              }}
            >


              {/* NAME */}

              <div className="filter-group">

                <label>
                  Name
                </label>


                <input
                  type="text"

                  name="name"

                  value={formData.name}

                  onChange={handleChange}

                  required
                />

              </div>


              {/* DEPARTMENT */}

              <div className="filter-group">

                <label>
                  Department
                </label>


                <input
                  type="text"

                  name="department"

                  value={formData.department}

                  onChange={handleChange}

                  required
                />

              </div>


              {/* DESIGNATION */}

              <div className="filter-group">

                <label>
                  Designation
                </label>


                <input
                  type="text"

                  name="designation"

                  value={formData.designation}

                  onChange={handleChange}

                  required
                />

              </div>


              {/* EMAIL */}

              <div className="filter-group">

                <label>
                  Email
                </label>


                <input
                  type="email"

                  name="email"

                  value={formData.email}

                  onChange={handleChange}

                  required
                />

              </div>


              {/* PHONE */}

              <div className="filter-group">

                <label>
                  Phone
                </label>


                <input
                  type="text"

                  name="phone"

                  value={formData.phone}

                  onChange={handleChange}

                  required
                />

              </div>


              {/* STATUS */}

              <div className="filter-group">

                <label>
                  Status
                </label>


                <select
                  name="status"

                  value={formData.status}

                  onChange={handleChange}
                >

                  <option value="Active">
                    Active
                  </option>


                  <option value="Inactive">
                    Inactive
                  </option>


                </select>

              </div>


              {/* JOINING DATE */}

              <div className="filter-group">

                <label>
                  Joining Date
                </label>


                <input
                  type="date"

                  name="joining_date"

                  value={formData.joining_date}

                  onChange={handleChange}

                  required
                />

              </div>


              {/* BUTTONS */}

              <div
                style={{
                  display: "flex",

                  alignItems: "end",

                  gap: "10px",
                }}
              >


                <button
                  type="submit"

                  className="btn btn-primary"
                >

                  <i
                    className={
                      editMode
                        ? "fas fa-pen"
                        : "fas fa-save"
                    }
                  ></i>


                  {editMode
                    ? "Update Employee"
                    : "Save Employee"}


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


        {/* =========================
            EMPLOYEE TABLE
        ========================= */}

        <div className="table-card">


          <div className="card-title">


            <h3>

              <i className="fas fa-users"></i>

              Employee List

            </h3>


            <button
              className="btn btn-outline btn-sm"

              onClick={fetchEmployees}
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
                  Department
                </th>


                <th>
                  Designation
                </th>


                <th>
                  Email
                </th>


                <th>
                  Phone
                </th>


                <th>
                  Status
                </th>


                <th>
                  Joining Date
                </th>


                <th>
                  Actions
                </th>


              </tr>


            </thead>


            <tbody>


              {employees.length === 0 ? (


                <tr>


                  <td
                    colSpan="9"

                    style={{
                      textAlign: "center",

                      padding: "30px",
                    }}
                  >

                    No employees found

                  </td>


                </tr>


              ) : (


                employees.map((employee) => (


                  <tr
                    key={employee.employee_id}
                  >


                    <td>
                      {employee.employee_id}
                    </td>


                    <td>

                      <strong>
                        {employee.name}
                      </strong>

                    </td>


                    <td>
                      {employee.department}
                    </td>


                    <td>
                      {employee.designation}
                    </td>


                    <td>
                      {employee.email}
                    </td>


                    <td>
                      {employee.phone}
                    </td>


                    <td>


                      <span className="status active">


                        <i className="fas fa-check-circle"></i>


                        {employee.status}


                      </span>


                    </td>


                    <td>
                      {employee.joining_date}
                    </td>


                    <td>


                      <button
                        className="btn btn-primary btn-sm"

                        onClick={() =>
                          handleEdit(employee)
                        }
                      >

                        <i className="fas fa-edit"></i>

                        Edit

                      </button>


                      <button
                        className="btn btn-outline btn-sm"

                        onClick={() =>
                          handleDelete(
                            employee.employee_id
                          )
                        }

                        style={{
                          marginLeft: "8px",
                        }}
                      >

                        <i className="fas fa-trash"></i>

                        Delete

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

export default Employee;