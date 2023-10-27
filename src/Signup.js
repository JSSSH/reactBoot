import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Signup() {

  const [user, setUser] = useState({
    username : '',
    password : '',
    email : ''
  });
  
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setUser({
      ...user,
      [e.target.name] : e.target.value
    })
  }
  
  return(
    <div>
      <h1>회원가입 페이지</h1>
      아이디 : <input type="text" name="username" onChange={changeHandler}/><br/>
      비밀번호 : <input type="text" name="password" onChange={changeHandler}/><br/>
      이메일 : <input type="text" name="email" onChange={changeHandler}/><br/>
      <button onClick={() => {
        axios.post(`${process.env.REACT_APP_SERVER_URL}/signup`, user)
          .then(response => {
            alert(response.data);

            navigate('/');
          }).catch(error => {
            console.log(error)
          })
      }}>회원가입</button>
    </div>
  );
}

export default Signup;