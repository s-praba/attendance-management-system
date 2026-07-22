import psycopg2


def get_db_connection():

    connection = psycopg2.connect(
        host="localhost",
        database="attendance_db",
        user="postgres",
        password="14112002",
        port="5432"
    )

    return connection