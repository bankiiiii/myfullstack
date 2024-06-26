import axios  from "axios";
import { useEffect, useState } from "react"
import {Link, useNavigate, useParams} from "react-router-dom"

const EditUser = () => {
  const navigate = useNavigate();
  const {id} = useParams();
   

  const [user, setUser] = useState({
    name: "",
    username:"",
    email: ""
  })

  const {name, username, email } = user;

  useEffect(() => {

      loadUser();
   
  }, [])

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value});
    
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8081/user/${id}`, user)
    navigate("/");
  }

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8081/user/${id}`);
    setUser(result.data);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit user</h2>

          <form action="" onSubmit={(e) => onSubmit(e)}>
          <div className="mb-3">
            <label htmlFor="Name" className="form-label">
              Name:
            </label>
            <input type={"text"} className="form-control" placeholder="enter your name" name="name" value={name} 
            onChange={(e) => onInputChange(e)}/>
          </div>

          <div className="mb-3">
            <label htmlFor="Username" className="form-label">
              Username:
            </label>
            <input type={"text"} className="form-control" placeholder="enter your Username" name="username" value={username} onChange={(e) => onInputChange(e)}/>
          </div>

          <div className="mb-3">
            <label htmlFor="Email" className="form-label">
              Email:
            </label>
            <input type={"email"} className="form-control" placeholder="enter your email address" name="email" value={email} onChange={(e) => onInputChange(e)}/>
          </div>

          <button type="submit" className="btn btn-outline-primary"> Submit</button>
          <Link type="cancel" className="btn btn-outline-danger mx-3" to={"/"}> Cancel</Link>
          </form>

        </div>
        

      </div>
    </div>
  )
}

export default EditUser