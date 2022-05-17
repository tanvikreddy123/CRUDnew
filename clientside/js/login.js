const loginBtn = document.getElementById('login')
loginBtn.addEventListener('click',login)

async function login(e)
{
    e.preventDefault()
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    const ojb = {
        username,
        password
    }
    const response = await fetch("http://localhost:5000/login",{
        method : "POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(ojb)
    })
    const data = await response.json()
    console.log(data)
    localStorage.setItem('token',JSON.stringify(data.token))
    if(data.token)
    {
        //redirect
        location.replace('./home.html')
    }
    else
    {
        console.log('Error')
    }
}














