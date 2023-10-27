import axios from "axios";
import { useNavigate } from "react-router-dom";

function KakaoLogin({ setIsAuth }) {
  const URL = window.location.href;
  const match = /code=([^&]+)/.exec(URL);
  const navigate = useNavigate();

  if(match) {
    const code = decodeURIComponent(match[1]);
    
    axios.post(`${process.env.REACT_APP_SERVER_URL}/oauth/kakao`, {code : code})
    .then(response => {
      const jwt = response.headers.authorization;

      if(jwt) {
        sessionStorage.setItem('jwt', jwt);
        setIsAuth(true);
        navigate('/');
      }
    }).catch(error => {
      alert('로그인실패');
      console.log(error);
    })
  }

  return(
    <div>
      <h1>로그인 처리 중</h1>
    </div>
  );
}

export default KakaoLogin;