import toast from "react-hot-toast"

export default async function login(e){
    

    let response= await fetch('http://127.0.0.1:8080/api/patient_login/',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({email : e.target.email.value,password : e.target.password.value}) 
    })

    if(response.status== 200){
        const data= await response.json()
        localStorage.setItem('authToken',JSON.stringify(data))
        toast.success('Logout successful................')
        return data
    }
    else{
        toast.error('Invalid user credentials!')
        throw new Error("Invalid user credential............")
    }
}



export function getlocal(){
    let response=localStorage.getItem('authToken')
    return response
}