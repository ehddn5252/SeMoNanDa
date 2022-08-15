import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import GameNormal from '../features/game/GameNormal'
import GameCustom from '../features/game/GameCustom'
import Main from '../features/home/page/Home';
import Login from '../features/user/page/Login';
import SignUp from '../features/user/page/SignUp';
import Rank from '../features/rank/page/Rank';
import Custom from '../features/custom/page/Custom';
import MyPage from '../features/mypage/page/MyPage';
import EditMyPage from '../features/mypage/page/MyPageEdit';
import Help from '../features/help/page/Help';
import HelpNormal from '../features/help/page/Custom';
import Statistics from '../features/statistic/page/Statistics';
import UserRank from '../features/userrank/page/UserRank';
import NotFound from '../features/notfound/NotFound';
import Gossip from '../features/gossip/page/Gossip';
import PrivateRoute from '../common/api/PrivateRoute';
// import NavBar from "../common/navbar/NavBar";

function App() {

  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Main/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/signin" element={<SignUp/>}/>
          <Route exact path="/rank" element={<PrivateRoute path="/rank" component={Rank}/>}/>
          <Route exact path="/custom" element={<PrivateRoute path="/custom" component={Custom}/>}/>
          <Route exact path="/profile" element={<PrivateRoute path="/profile" component={MyPage}/>}/>
          <Route exact path="/editprofile" element={<PrivateRoute path="/editprofile" component={EditMyPage}/>}/>
      	  <Route exact path="/game/normal/:id" element={<PrivateRoute path="/game/normal/:id" component={GameNormal}/>}/>
          <Route exact path="/game/custom/:id" element={<PrivateRoute path="/game/custom/:id" component={GameCustom} />} />
      	  <Route exact path="/help" element={<Help />} />
          <Route exact path="/help/custom" element={<HelpNormal />} />
      	  <Route exact path="/statistics" element={<Statistics />} />
      	  <Route exact path="/userrank" element={<UserRank />} />
          <Route exact path="/gossip" element={<PrivateRoute path="/gossip" component={Gossip} />} />
      	  <Route exact path="/*" element={<NotFound />} />
        </Routes>
    </Router>
  );
}

export default App;
