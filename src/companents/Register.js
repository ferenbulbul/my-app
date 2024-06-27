import React, { useState, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { postLoginData, fetchLoginData } from './api';

const validateEmail = (rule, value) => {
    return new Promise((resolve, reject) => {
        if (value && !/\S+@\S+\.\S+/.test(value)) {
            reject('Geçerli bir e-posta adresi giriniz!');
        } else {
            resolve();
        }
    });
};

function Register() {
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errorEmailMessage, setErrorEmailMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchLoginData();
                setUsers(data);
                console.log('register fetch');
            } catch (error) {
                console.error('Error loading data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async () => {
        const userExists = users.find(user => user.username === username);
        const emailExists = users.find(user => user.email === email);

        if (userExists) {
            setMessage('Yazdığınız Kullanıcı adı ile zaten bir kullanıcı mevcut');
        } else if (emailExists) {
            setErrorEmailMessage('Yazdığınız e-mail zaten bir kullanıcı mevcut');
        } else {
            try {
                await postLoginData( username, password, email );
                navigate('/login', { state: { username, password } });
            } catch (error) {
                console.error('Error registering user:', error);
            }
        }
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Kayıt ol</h1>
            <div style={{ display: 'flex', padding: 20, justifyContent: 'center' }}>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={handleSubmit}
                    autoComplete="off"
                >
                    <Form.Item
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        label="Username"
                        name="username"
                        help={message}
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        type='password'
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        type='email'
                        label="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        help={errorEmailMessage}
                        rules={[
                            { required: true, message: 'Please input your email!' },
                            { validator: validateEmail }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{ offset: 8, span: 16 }}
                    >
                        <Button type="primary" htmlType="submit">
                            Kayıt Ol
                        </Button>
                    </Form.Item>
                    <div style={{ display: 'flex', justifyContent: "center" }}>
                        {<p style={{ color: 'red' }}>{}</p>}
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Register;
