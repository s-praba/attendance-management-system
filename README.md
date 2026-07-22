# Attendance Management System

A full-stack web application for managing employees and tracking daily attendance. The system provides a dashboard with attendance statistics, employee management, attendance marking, attendance history, search and filtering, and admin login authentication.

## Features

### Authentication

* Admin login system
* Username and password authentication
* Login validation
* Invalid credential handling
* Protected application access after login

### Dashboard

* Total employee count
* Active employee count
* Present employees for today
* Absent employees for today
* Active employee percentage
* Department-wise employee statistics

### Employee Management

* View all employees
* Add new employees
* Update employee details
* Delete employees
* Employee status management

### Attendance Management

* Mark employee attendance
* Select attendance date
* Add check-in time
* Add check-out time
* Set attendance status
* Update attendance records
* Delete attendance records

### Attendance History

* View all attendance records
* Search attendance by employee name
* Filter attendance by date
* Filter attendance by status
* Clear all filters

## Technology Stack

### Frontend

* React.js
* React Router DOM
* JavaScript
* HTML
* CSS
* Vite

### Backend

* Python
* Flask
* Flask-CORS
* REST APIs

### Database

* PostgreSQL
* psycopg2

## Project Architecture

```text
attendance-management-system/
│
├── attendance-backend/
│   │
│   ├── app.py
│   │
│   └── requirements.txt
│
├── attendance-frontend/
│   │
│   ├── src/
│   │   │
│   │   ├── components/
│   │   │   │
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Employee.jsx
│   │   │   ├── Attendance.jsx
│   │   │   └── History.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   │
│   │   ├── Dashboard.css
│   │   ├── Login.css
│   │   └── ...
│   │
│   ├── package.json
│   └── vite.config.js
│
├── database/
│   │
│   └── attendance_db.sql
│
├── screenshots/
│   │
│   ├── login.png
│   ├── dashboard.png
│   ├── employee.png
│   ├── attendance.png
│   └── history.png
│
└── README.md
```

## Database Design

The application uses PostgreSQL as the database.

### Users Table

Stores admin login credentials.

```text
users
│
├── user_id
├── username
├── email
├── password
└── role
```

### Employees Table

Stores employee information.

```text
employees
│
├── employee_id
├── name
├── department
├── designation
├── email
├── phone
├── status
└── joining_date
```

### Attendance Table

Stores employee attendance records.

```text
attendance
│
├── attendance_id
├── employee_id
├── attendance_date
├── check_in
├── check_out
└── status
```

### Relationships

```text
users
  │
  └── Admin Login

employees
  │
  └── employee_id
        │
        ▼
attendance
```

The `attendance` table is connected to the `employees` table using `employee_id`.

## API Endpoints

### Authentication

#### Login

```text
POST /login
```

Request:

```json
{
  "email": "admin@gmail.com",
  "password": "12345"
}
```

Response:

```json
{
  "message": "Login successful",
  "user": {
    "user_id": 1,
    "username": "admin",
    "email": "admin@gmail.com",
    "role": "Admin"
  }
}
```

### Employee APIs

#### Get all employees

```text
GET /employees
```

#### Add employee

```text
POST /employees
```

#### Update employee

```text
PUT /employees/<employee_id>
```

#### Delete employee

```text
DELETE /employees/<employee_id>
```

### Attendance APIs

#### Get attendance records

```text
GET /attendance
```

#### Mark attendance

```text
POST /attendance
```

#### Update attendance

```text
PUT /attendance/<attendance_id>
```

#### Delete attendance

```text
DELETE /attendance/<attendance_id>
```

### Dashboard API

```text
GET /dashboard-stats
```

Returns:

* Total employees
* Active employees
* Present employees today
* Absent employees today

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/s-praba/attendance-management-system.git
```

Move into the project directory:

```bash
cd attendance-management-system
```

## Backend Setup

Move to the backend folder:

```bash
cd attendance-backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment on Windows:

```bash
venv\Scripts\activate
```

Install the required dependencies:

```bash
pip install -r requirements.txt
```

Example `requirements.txt`:

```text
Flask
Flask-CORS
psycopg2-binary
```

Update the PostgreSQL database connection details in `app.py`:

```python
conn = psycopg2.connect(
    host="localhost",
    database="attendance_db",
    user="postgres",
    password="YOUR_POSTGRES_PASSWORD",
    port="5432"
)
```

Run the Flask backend:

```bash
python app.py
```

The backend will run at:

```text
http://127.0.0.1:5000
```

## Database Setup

Create a PostgreSQL database:

```sql
CREATE DATABASE attendance_db;
```

Open the database script:

```text
database/attendance_db.sql
```

Run the SQL script inside PostgreSQL.

The script creates:

* `users`
* `employees`
* `attendance`

It also inserts the default admin user.

### Default Login Credentials

```text
Email: admin@gmail.com
Password: 12345
```

## Frontend Setup

Open a new terminal and move to the frontend folder:

```bash
cd attendance-frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:5173
```

## Application Flow

```text
User
 │
 ▼
Login Page
 │
 │ POST /login
 ▼
Flask Backend
 │
 ▼
PostgreSQL
 │
 ├── Valid Credentials
 │       │
 │       ▼
 │   Dashboard
 │
 └── Invalid Credentials
         │
         ▼
    Error Message
```

After successful login:

```text
Dashboard
    │
    ├── Employee Management
    │       │
    │       └── Employee APIs
    │
    ├── Attendance
    │       │
    │       └── Attendance APIs
    │
    └── History
            │
            └── GET /attendance
```

## Frontend-Backend Communication

The React frontend communicates with the Flask backend using REST APIs.

Example:

```text
React Frontend
      │
      │ fetch()
      ▼
Flask REST API
      │
      ▼
PostgreSQL Database
```

Example dashboard request:

```javascript
fetch("http://127.0.0.1:5000/dashboard-stats")
```

Example attendance request:

```javascript
fetch("http://127.0.0.1:5000/attendance")
```

## Key Design Decisions

### React Component-Based Architecture

The frontend is divided into separate components:

* `Login.jsx`
* `Dashboard.jsx`
* `Employee.jsx`
* `Attendance.jsx`
* `History.jsx`

This makes the application easier to maintain and extend.

### REST API Architecture

The backend exposes separate REST endpoints for:

* Authentication
* Employees
* Attendance
* Dashboard statistics

This separates frontend and backend responsibilities.

### Relational Database Design

The attendance records are connected to employees using a foreign key relationship.

This prevents storing duplicate employee information inside every attendance record.

### Dynamic Dashboard

Dashboard statistics are calculated from the database using SQL queries instead of hardcoded values.

For example:

```sql
SELECT COUNT(*)
FROM employees;
```

and:

```sql
SELECT COUNT(*)
FROM attendance
WHERE attendance_date = CURRENT_DATE
AND status = 'Present';
```

## Screenshots

### Login Page

![Login Page](screenshots/login.png)

### Dashboard

![Dashboard](screenshots/dashboard.png)

### Employee Management

![Employee Management](screenshots/employee.png)

### Attendance Management

![Attendance Management](screenshots/attendance.png)

### Attendance History

![Attendance History](screenshots/history.png)

## Demo Video

A demonstration video of the application is available here:

```text
Add your Google Drive or YouTube demo link here
```

## Future Improvements

The following improvements can be added in future versions:

* JWT-based authentication
* Password hashing using bcrypt
* Role-based authorization
* Environment variables for database credentials
* Pagination for employee and attendance records
* Advanced attendance reports
* Monthly attendance analytics
* Export reports to CSV or Excel
* Cloud deployment
* Automated testing
* Docker containerization

## Conclusion

The Attendance Management System demonstrates a full-stack application using React, Flask, REST APIs, and PostgreSQL.

The application provides a complete workflow for:

```text
Admin Login
     ↓
Dashboard
     ↓
Employee Management
     ↓
Attendance Management
     ↓
Attendance History
     ↓
Database Storage
```

This project demonstrates practical knowledge of:

* Frontend development with React
* Backend API development with Flask
* PostgreSQL database design
* REST API integration
* CRUD operations
* Authentication
* React routing
* Database relationships
* Full-stack application architecture
