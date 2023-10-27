import { Link } from "react-router-dom";

function Header({ isAuth, setIsAuth, userInfo, setUserInfo }) {

  return(
    <div>
      {
        isAuth && <h1>{userInfo.username}님 환영합니다</h1>
      }
      {
        isAuth ? <Link to = "/" onClick={() => {
          sessionStorage.removeItem('jwt');
          setIsAuth(false);
          setUserInfo({username : ''});
        }}>로그아웃</Link>
               : <Link to = "/login">로그인</Link>
      }
      &nbsp;&nbsp;
      <Link to = "/signup">회원가입</Link>
      &nbsp;&nbsp;
      <Link to = "/write">게시글작성</Link>
    </div>
  );
}

export default Header;