import requests

url = "http://127.0.0.1:5000/employees"

data = {
    "name": "David Brown",
    "department": "Finance",
    "designation": "Accountant",
    "email": "david@example.com",
    "phone": "9876543211",
    "status": "Active",
    "joining_date": "2026-07-23"
}

response = requests.post(url, json=data)

print(response.status_code)
print(response.json())