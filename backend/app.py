from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2

app = Flask(__name__)

CORS(app)


# =========================
# DATABASE CONNECTION
# =========================

def get_db_connection():

    conn = psycopg2.connect(
        host="localhost",
        database="attendance_db",
        user="postgres",
        password="14112002",
        port="5432"
    )

    return conn

# ==================================================
# LOGIN API
# ==================================================

@app.route("/login", methods=["POST"])
def login():

    data = request.json

    email = data.get("email")

    password = data.get("password")


    if not email or not password:

        return jsonify({

            "message": "email and password are required"

        }), 400


    conn = get_db_connection()

    cursor = conn.cursor()


    cursor.execute("""

        SELECT
            user_id,
            username,
            email,
            password,
            role

        FROM users

        WHERE email = %s

    """, (email,))


    user = cursor.fetchone()


    cursor.close()

    conn.close()


    if user is None:

        return jsonify({

            "message": "Invalid email or password"

        }), 401


    user_id = user[0]

    db_username = user[1]

    email = user[2]

    db_password = user[3]

    role = user[4]


    if password != db_password:

        return jsonify({

            "message": "Invalid email or password"

        }), 401


    return jsonify({

        "message": "Login successful",

        "user": {

            "user_id": user_id,

            "username": db_username,

            "email": email,

            "role": role

        }

    }), 200

# =========================
# HOME
# =========================

@app.route("/")
def home():

    return "Flask API is connected to PostgreSQL!"


# ==================================================
# EMPLOYEE APIs
# ==================================================


# GET ALL EMPLOYEES

@app.route("/employees", methods=["GET"])
def get_employees():

    conn = get_db_connection()

    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            employee_id,
            name,
            department,
            designation,
            email,
            phone,
            status,
            joining_date
        FROM employees
        ORDER BY employee_id
    """)

    employees = cursor.fetchall()

    cursor.close()

    conn.close()


    employee_list = []


    for employee in employees:

        employee_list.append({

            "employee_id": employee[0],

            "name": employee[1],

            "department": employee[2],

            "designation": employee[3],

            "email": employee[4],

            "phone": employee[5],

            "status": employee[6],

            "joining_date": str(employee[7])

        })


    return jsonify(employee_list)


# ADD EMPLOYEE

@app.route("/employees", methods=["POST"])
def add_employee():

    data = request.json


    conn = get_db_connection()

    cursor = conn.cursor()


    cursor.execute("""
        INSERT INTO employees
        (
            name,
            department,
            designation,
            email,
            phone,
            status,
            joining_date
        )

        VALUES (%s, %s, %s, %s, %s, %s, %s)

        RETURNING employee_id
    """, (

        data["name"],

        data["department"],

        data["designation"],

        data["email"],

        data["phone"],

        data["status"],

        data["joining_date"]

    ))


    employee_id = cursor.fetchone()[0]


    conn.commit()


    cursor.close()

    conn.close()


    return jsonify({

        "message": "Employee added successfully",

        "employee_id": employee_id

    }), 201


# UPDATE EMPLOYEE

@app.route("/employees/<int:employee_id>", methods=["PUT"])
def update_employee(employee_id):

    data = request.json


    conn = get_db_connection()

    cursor = conn.cursor()


    cursor.execute("""
        UPDATE employees

        SET
            name = %s,
            department = %s,
            designation = %s,
            email = %s,
            phone = %s,
            status = %s,
            joining_date = %s

        WHERE employee_id = %s
    """, (

        data["name"],

        data["department"],

        data["designation"],

        data["email"],

        data["phone"],

        data["status"],

        data["joining_date"],

        employee_id

    ))


    conn.commit()


    cursor.close()

    conn.close()


    return jsonify({

        "message": "Employee updated successfully"

    })


# DELETE EMPLOYEE

@app.route("/employees/<int:employee_id>", methods=["DELETE"])
def delete_employee(employee_id):

    conn = get_db_connection()

    cursor = conn.cursor()


    cursor.execute("""
        DELETE FROM employees

        WHERE employee_id = %s
    """, (employee_id,))


    conn.commit()


    cursor.close()

    conn.close()


    return jsonify({

        "message": "Employee deleted successfully"

    })


# ==================================================
# ATTENDANCE APIs
# ==================================================


# GET ATTENDANCE RECORDS

@app.route("/attendance", methods=["GET"])
def get_attendance():

    conn = get_db_connection()

    cursor = conn.cursor()


    cursor.execute("""
        SELECT

            a.attendance_id,

            a.employee_id,

            e.name,

            a.attendance_date,

            a.check_in,

            a.check_out,

            a.status

        FROM attendance a

        JOIN employees e

        ON a.employee_id = e.employee_id

        ORDER BY a.attendance_date DESC
    """)


    attendance_records = cursor.fetchall()


    cursor.close()

    conn.close()


    attendance_list = []


    for record in attendance_records:

        attendance_list.append({

            "attendance_id": record[0],

            "employee_id": record[1],

            "employee_name": record[2],

            "attendance_date": str(record[3]),

            "check_in": str(record[4])
            if record[4] else None,

            "check_out": str(record[5])
            if record[5] else None,

            "status": record[6]

        })


    return jsonify(attendance_list)


# MARK ATTENDANCE

@app.route("/attendance", methods=["POST"])
def mark_attendance():

    data = request.json


    conn = get_db_connection()

    cursor = conn.cursor()


    cursor.execute("""
        INSERT INTO attendance
        (
            employee_id,

            attendance_date,

            check_in,

            check_out,

            status
        )

        VALUES (%s, %s, %s, %s, %s)

        RETURNING attendance_id
    """, (

        data["employee_id"],

        data["attendance_date"],

        data.get("check_in"),

        data.get("check_out"),

        data["status"]

    ))


    attendance_id = cursor.fetchone()[0]


    conn.commit()


    cursor.close()

    conn.close()


    return jsonify({

        "message": "Attendance marked successfully",

        "attendance_id": attendance_id

    }), 201


# UPDATE ATTENDANCE

@app.route("/attendance/<int:attendance_id>", methods=["PUT"])
def update_attendance(attendance_id):

    data = request.json


    conn = get_db_connection()

    cursor = conn.cursor()


    cursor.execute("""
        UPDATE attendance

        SET

            employee_id = %s,

            attendance_date = %s,

            check_in = %s,

            check_out = %s,

            status = %s

        WHERE attendance_id = %s
    """, (

        data["employee_id"],

        data["attendance_date"],

        data.get("check_in"),

        data.get("check_out"),

        data["status"],

        attendance_id

    ))


    conn.commit()


    cursor.close()

    conn.close()


    return jsonify({

        "message": "Attendance updated successfully"

    })


# DELETE ATTENDANCE

@app.route("/attendance/<int:attendance_id>", methods=["DELETE"])
def delete_attendance(attendance_id):

    conn = get_db_connection()

    cursor = conn.cursor()


    cursor.execute("""
        DELETE FROM attendance

        WHERE attendance_id = %s
    """, (attendance_id,))


    conn.commit()


    cursor.close()

    conn.close()


    return jsonify({

        "message": "Attendance deleted successfully"

    })
# ==================================================
# DASHBOARD STATISTICS API
# ==================================================

@app.route("/dashboard-stats", methods=["GET"])
def dashboard_stats():

    conn = get_db_connection()

    cursor = conn.cursor()


    # =========================
    # TOTAL EMPLOYEES
    # =========================

    cursor.execute("""
        SELECT COUNT(*)
        FROM employees
    """)

    total_employees = cursor.fetchone()[0]


    # =========================
    # ACTIVE EMPLOYEES
    # =========================

    cursor.execute("""
        SELECT COUNT(*)
        FROM employees
        WHERE status = 'Active'
    """)

    active_employees = cursor.fetchone()[0]


    # =========================
    # PRESENT TODAY
    # =========================

    cursor.execute("""
        SELECT COUNT(*)
        FROM attendance
        WHERE attendance_date = CURRENT_DATE
        AND status = 'Present'
    """)

    present_today = cursor.fetchone()[0]


    # =========================
    # ABSENT TODAY
    # =========================

    cursor.execute("""
        SELECT COUNT(*)
        FROM attendance
        WHERE attendance_date = CURRENT_DATE
        AND status = 'Absent'
    """)

    absent_today = cursor.fetchone()[0]


    cursor.close()

    conn.close()


    return jsonify({

        "total_employees": total_employees,

        "active_employees": active_employees,

        "present_today": present_today,

        "absent_today": absent_today

    })



# =========================
# RUN SERVER
# =========================

if __name__ == "__main__":

    app.run(
        debug=True
    )