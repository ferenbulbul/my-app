import React, { useState } from 'react';
import Login from './companents/Login';
import List from './companents/List'
import { Routes, Route, Link } from "react-router-dom";
import { Layout, Menu, theme } from 'antd';
import Budget from './companents/Budget';
import Summary from './companents/Summary';
import { useNavigate,useLocation } from 'react-router-dom';
import './styles/styles.css';
import Register from './companents/Register';





const { Header, Content, Footer } = Layout;
function App() {
  const location = useLocation();
  const navigate=useNavigate();
  const [login, setLogin] = useState(`true`);
  const [login2, setLogin2] = useState(`false`);
  const [userData, setUserData] = useState(null);
  
 
  const handleLogin = (userData) => {
    console.log(userData);
     setUserData(userData);
     userData !==null ? setLogin(`false`):setLogin(`true`) 
     userData !==null ? setLogin2(`true`):setLogin2(`false`) 
  };
  const handleLogout = () => {
    setLogin(`true`)
    setLogin2(`false`)
    setUserData(null)
    navigate('/login');
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    { state: login, key: '1', label: <Link to="/login">Login</Link> },
    { state: login, key: '2', label: <Link to="/register">Register</Link> },
    { state: login2, key: '3', label: <Link to="/budget">Bütçe</Link> },
    { state: login2, key: '4', label: <Link to="/list">Liste</Link> },
    { state: login2, key: '5', label: <Link to="/summary">Tablo</Link> },
  ];
  const filteredMenuItems = menuItems.filter(item => item.state===`true`)
  return (
    <div>
      <Layout>

        <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%', display: 'flex', alignItems: 'center', }}>

          <div className="demo-logo" />

          <Menu items={filteredMenuItems} theme="dark" mode="horizontal" selectedKeys={[location.pathname]} style={{ flex: 1, minWidth: 0 }} />
          {userData && 
          <div onClick={handleLogout} className='welcome-text' >Hoşgeldiniz, {userData.username}</div>}
        </Header>


        <Content style={{ marginTop: '20px', padding: '0 48px', }}>
          <div style={{ padding: 24, minHeight: 780, background: colorBgContainer, borderRadius: borderRadiusLG, }}>

          <Routes>
              {login ===`true`? (
                <> 
                <Route path="/login" element={<Login  onLogin={handleLogin}  />} />
                <Route path="/register" element={<Register  />} />
                </>
              ) : (
                <>
                  <Route path="/budget" element={<Budget />} />
                  <Route path="/list" element={<List />} />
                  <Route path="/summary" element={<Summary />} />
                </>
              )}
            </Routes>
          </div>
        </Content>


        <Footer style={{ textAlign: 'center', }} >
          Cemil Design ©{new Date().getFullYear()} Created by Orhan
        </Footer>
      </Layout>

    </div>
  );
}

export default App;
