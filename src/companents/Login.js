import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchLoginData } from './api';

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

function Login({ onLogin }) {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const users = await fetchLoginData();
                console.log('login fetch başarılı');
                setUsers(users);

                
                if (location.state) {
                    const { username, password } = location.state;
                    if (username && password) {
                        const newUser = {
                            username,
                            password,
                        };
                        setUsers(prevUsers => [newUser, ...prevUsers]);
                        console.log('Yeni kullanıcı eklendi:', newUser);
                    } else {
                        console.error('Eksik kullanıcı verisi');
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [location.state]);

    const handleSubmit = (values) => {
        const { username, password } = values;
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            const data = { username };
            onLogin(data);
            alert(username + '  Başarıyla giriş yapıldı!');
            navigate('/budget');
        } else {
            setError('Kullanıcı adı veya şifre yanlış!');
        }
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Giriş yap</h1>
            <div style={{ display: 'flex', padding: 20, justifyContent: 'center' }}>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={handleSubmit}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input value={username} onChange={(e) => setUsername(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Item>
                    <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                    <div style={{ display: 'flex', justifyContent: "center" }}>
                        {<p style={{ color: 'red' }}>{error}</p>}
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Login;
