-- =========================================
-- USERS TABLE
-- =========================================

CREATE TABLE users (

    user_id SERIAL PRIMARY KEY,

    username VARCHAR(100) NOT NULL UNIQUE,

    email VARCHAR(150) NOT NULL UNIQUE,

    password VARCHAR(255) NOT NULL,

    role VARCHAR(50) DEFAULT 'admin'

);


-- =========================================
-- DEFAULT ADMIN USER
-- =========================================

INSERT INTO users
(
    username,
    email,
    password,
    role
)
VALUES
(
    'admin',
    'admin@gmail.com',
    '12345',
    'admin'
);


-- =========================================
-- EMPLOYEES TABLE
-- =========================================

CREATE TABLE employees (

    employee_id SERIAL PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    department VARCHAR(100) NOT NULL,

    designation VARCHAR(100) NOT NULL,

    email VARCHAR(150) NOT NULL,

    phone VARCHAR(20) NOT NULL,

    status VARCHAR(50) NOT NULL,

    joining_date DATE NOT NULL

);


-- =========================================
-- ATTENDANCE TABLE
-- =========================================

CREATE TABLE attendance (

    attendance_id SERIAL PRIMARY KEY,

    employee_id INTEGER NOT NULL,

    attendance_date DATE NOT NULL,

    check_in TIME,

    check_out TIME,

    status VARCHAR(50) NOT NULL,

    CONSTRAINT fk_employee

        FOREIGN KEY (employee_id)

        REFERENCES employees(employee_id)

        ON DELETE CASCADE

);


-- =========================================
-- PREVENT DUPLICATE ATTENDANCE
-- =========================================

ALTER TABLE attendance

ADD CONSTRAINT unique_employee_attendance

UNIQUE (
    employee_id,
    attendance_date
);