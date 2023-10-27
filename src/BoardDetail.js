import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "./axiosInstance";

function BoardDetail({ userInfo }) {

  const {id} = useParams();
  const [board, setBoard] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get(`/board/${id}`)
    .then(response => {
      setBoard(response.data);
      setIsLoading(false);
    }).catch(error => {
      console.log(error);
    })
  },[id])

  if(isLoading)
    return <div>로딩중...</div>

  return(
    <div>
      <table>
        <thead>
          <tr>
            <th>제목</th>
            <th>내용</th>
            <th>작성자</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{board.title}</td>
            <td>{board.content}</td>
            <td>{board.writer}</td>
            <td>
              <button onClick={() => {
                if(userInfo.username !== board.writer) {
                  alert('작성자만 삭제 가능합니다');
                  return;
                }

                axiosInstance.delete('/board', {params : {'id' : board.id}})
                  .then(response => {
                    alert(response.data);
                    navigate('/');
                  }).catch(error => {
                    console.log(error);
                  })
              }}>삭제</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default BoardDetail;