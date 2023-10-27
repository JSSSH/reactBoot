import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setIsAuth }) {

  const [member, setMember] = useState({
    username : '',
    password : ''
  });

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setMember({
      ...member,
      [e.target.name] : e.target.value
    })
  }

  return(
    <div>
      <h1>로그인 페이지</h1>
      아이디 : <input type="text" name="username" onChange={changeHandler}/><br/>
      비밀번호 : <input type="text" name="password" onChange={changeHandler}/><br/>
      <button onClick={() => {
        axios.post(`${process.env.REACT_APP_SERVER_URL}/login`, member)
          .then(response => {
            const jwt = response.headers.authorization;
            if(jwt) {
              sessionStorage.setItem('jwt', jwt);
              setIsAuth(true);
              alert('로그인성공');
              navigate('/');
            }

          }).catch(error => {
            alert('로그인실패');
            console.log(error);
          })
      }}>로그인</button>
      <button onClick={() => {
        window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&response_type=token&scope=openid%20email%20profile`;
      }}>구글로그인</button>
      <button onClick={() => {
        window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}`;
      }}>카카오로그인</button>
    </div>
  );
}

export default Login;