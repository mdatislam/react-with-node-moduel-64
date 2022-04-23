import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  useEffect(()=>{
    fetch('http://localhost:5000/users')
    .then(res=>res.json())
    .then(data=>setUsers(data))
  },[])
 

  const handleSubmit=event=>{
    event.preventDefault()
    const name =event.target.name.value;
    const email =event.target.email.value;
    const user={name,email}
    console.log(user)
   
      fetch("http://localhost:5000/path",{
        method:'POST',
        headers:{
          'content-type':'application/json'
        },
        body: JSON.stringify(user)
      })
        .then((res) => res.json())
        .then((data) => {
          const newUser=[...users,data]
          setUsers(newUser)
          console.log(data)
        });
   
  }
  return (
    <div className="App">
      <h2>This my Own data: {users.length}</h2>
     <form onSubmit={handleSubmit}>
       <input type="text" placeholder="Name" name="name" required />
       <input type="text" placeholder="email" name="email" required />
       <input type="submit" value='Add user' />
     </form>
      
        <ul>
          {
          users.map(user=> <li key={user.id}>Id:{ user.id} Name:{user.name} email:{user.email}</li>)
          }
        </ul>
      
    </div>
  );
}

export default App;
