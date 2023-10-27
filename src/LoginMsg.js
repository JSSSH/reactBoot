import { Link } from "react-router-dom";

function LoginMsg() {
  return(
    <>
      <div>로그인 후 이용하세요</div>
      <Link to = '/login'>로그인 페이지로 이동</Link>
    </>
  );
}

export default LoginMsg;