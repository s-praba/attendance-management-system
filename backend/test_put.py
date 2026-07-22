import requests

url = "http://127.0.0.1:5000/employees/1"

data = {
    "name": "John Smith Updated",
    "department": "IT",
    "designation": "Senior Software Engineer",
    "email": "john.updated@example.com",
    "phone": "9876543210",
    "status": "Active",
    "joining_date": "2026-07-22"
}

response = requests.put(url, json=data)

print(response.status_code)
print(response.json())