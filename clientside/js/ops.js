const fbtn = document.getElementById('fetchdata')
const abtn = document.getElementById('addData')
const lbtn = document.getElementById('logout')
const container = document.getElementById('container')
fbtn.addEventListener('click',fdata)
const token = JSON.parse(localStorage.getItem('token'))
async function fdata(){
    const url = "http://localhost:5000/getdata"
    const response = await fetch(url,{
        "content-type":"application/json",
        headers : {
            "Authorization" : `Bearer ${token}`
        }
    })
    const data = await response.json();
    let tableBody = document.getElementById('tableBody')
    console.log(data)
    if(tableBody.rows.length == 0) {
    data.map((ele)=>
    {
        
        let t = `
        <tbody>
        <tr id="row">
          
          <td>${ele.username}</td>
          <td>${ele.age}</td>
          <td>${ele.address}</td>
          <td>
         <button id=${ele._id} onclick=${deleteData}>Delete</button>
          </td>
          <td>
         <button id=${ele._id}>Update</button>
          </td>
        </tr>
      </tbody>
        `
        tableBody.innerHTML += t
      
        async function deleteData()
        {
            console.log('Clicked')
            const url = `http://localhost:5000/students/${ele._id}`
            const res = await fetch(url,{
                method:"DELETE",
                headers:{
                    "content-type":"application/json",
                    "Authorization":`Bearer ${token}`
                }
            })
            const data = await res.json()
            console.log(data)
        
        }
    })
}
}
abtn.addEventListener('click',addData)
async function addData()
{
    const username = document.getElementById('name').value
    const age = document.getElementById('age').value
    const address = document.getElementById('address').value
    const bobj = {
        username,
        age,address
    }
    const response = await fetch("http://localhost:5000/students",{
        method:"POST",
        headers:{
            "content-type":"application/json",
            "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify(bobj)
    })
    const data = await response.json()
    console.log(data)
}

lbtn.addEventListener('click',logout)

function logout()
{
    localStorage.removeItem('token')
    location.replace('./login.html')
}
