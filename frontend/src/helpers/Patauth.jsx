import toast from "react-hot-toast";

export async function login(e) {
    e.preventDefault(); // Prevent default form submission

    let response = await fetch('http://127.0.0.1:8080/api/patient_login/', {  // Updated URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: e.target.email.value, password: e.target.password.value })
    });

    if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem('authToken', JSON.stringify(data));
        toast.success('Login successful!');
        return data;
    } else {
        toast.error('Invalid user credentials!');
        throw new Error("Invalid user credentials");
    }
}

export function getLocal() {
    let response = localStorage.getItem('authToken');
    return response;
}
