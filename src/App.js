import './App.css';
import { useEffect, useState } from 'react';
import Header from './Header';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import GoogleLogin from './GoogleLogin';
import KakaoLogin from './KakaoLogin';
import axiosInstance from './axiosInstance';
import WriteBoard from './WriteBoard';
import BoardList from './BoardList';
import BoardDetail from './BoardDetail';
import LoginMsg from './LoginMsg';

function App() {

const [isAuth, setIsAuth] = useState(false);
const [userInfo, setUserInfo] = useState({
  username : ''
});

useEffect(() => {
  if(isAuth) {
    axiosInstance.get('/userInfo')
    .then(response => {
      //console.log(response.data);
      setUserInfo(response.data);
    }).catch(error => {
      console.log(error);
    })
  }
}, [isAuth])

/*
  const [test, setTest] = useState();
  const [vo, setVO] = useState({
    id : '',
    pw : '',
    age : ''
  });

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/test`)  //  npm start 했을때 쫙 불러오는거라 env에 있는건 바로 테스트 못함
      .then(response => {
        console.log(response.data);
        setTest(response.data);
      }).catch(error => {
        console.log(error);
      })
  }, [])
*/

  return (
    <div className="App">
      <Header isAuth={isAuth} setIsAuth={setIsAuth} userInfo={userInfo} setUserInfo={setUserInfo}/>
      
      <Routes>
        <Route path='/' element={<BoardList />} />
        <Route path='/login' element={<Login setIsAuth={setIsAuth} />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/oauth/google' element={<GoogleLogin setIsAuth={setIsAuth} />} />
        <Route path='/oauth/kakao' element={<KakaoLogin setIsAuth={setIsAuth} />} />
        <Route path='/write' element={<WriteBoard userInfo={userInfo}/>} />
        <Route path='/board/:id' element={ isAuth ? <BoardDetail userInfo={userInfo} /> : <LoginMsg />} />
      </Routes>

      {/* <h1>{test}</h1>

      <button onClick={() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/test2`)
          .then(response => {
            console.log(response.data);
            setVO(response.data);
          }).catch(error => {
            console.log(error);
          })
      }}>vo받기</button>
      <p>{vo.id}</p>
      <p>{vo.pw}</p>
      <p>{vo.age}</p>

      <button onClick={() => {
        axios.post(`${process.env.REACT_APP_SERVER_URL}/test/8`,
                    {
                      "id" : "abc",
                      "pw" : "1234",
                      "age" : 15
                    },
                    {
                      params : {
                        "msg" : "hello"
                      }
                    }
                  )
                  .then(response => {

                  }).catch(error => {

                  })
      }}>보내기</button> */}
    </div>
    

  );
}

export default App;
