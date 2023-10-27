import { useState } from "react";
import axiosInstance from "./axiosInstance";
import { useNavigate } from "react-router-dom";

function WriteBoard({ userInfo }) {

  const [board, setBoard] = useState({
    title : '',
    content : '',
    writer : userInfo.username
  });

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setBoard({
      ...board,
      [e.target.name] : e.target.value
    })
  }

  return(
    <div>
      제목 : <input type="text" name="title" onChange={changeHandler}/> <br />
      내용 : <textarea name="content" onChange={changeHandler}></textarea> <br />
      <button onClick={() => {
        axiosInstance.post('/board', board)
        .then(response => {
          alert(response.data);
          navigate('/');
        }).catch(error => {
          alert('로그인 후 사용하세요');
        })
      }}>글작성</button>
    </div>
  );
}

export default WriteBoard;