import axios from "axios";
import { useNavigate } from "react-router-dom";

function GoogleLogin({ setIsAuth }) {

  const URL = window.location.href;

  const match = /access_token=([^&]+)/.exec(URL);

  const navigate = useNavigate();

  if(match) {
    const accessToken = decodeURIComponent(match[1]);

    axios.post(`${process.env.REACT_APP_SERVER_URL}/oauth/google`, {accessToken : accessToken})
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
  } else {
    console.log('엑세스토큰 오류');
  }


  return(
    <>
      <h1>로그인 처리 중</h1>
    </>
  );
}

export default GoogleLogin;