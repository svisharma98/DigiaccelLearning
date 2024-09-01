'use client'
import React, { useState } from 'react';
import { useRouter } from "next/navigation"
import Swal from 'sweetalert2';
import { Button, Modal, Menu, Form, Input, Container, Icon, } from 'semantic-ui-react';
import { useSelector } from "react-redux";

import { POST } from '@/services';
import { loginSuccess, logoutSuccess, userSignupData } from '@/redux/reuducer/authSlice';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const Header = () => {
    const userData = useSelector(userSignupData)
    const router = useRouter()
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState('login'); // 'login' or 'register'
    const [isLoggedIn, setIsLoggedIn] = useState(userData?.data ? true : false);
    const [username, setUsername] = useState(userData?.data ? userData?.data?.userData?.name : "");

    const openModal = (type) => {
        setModalType(type);
        setModalOpen(true);
    };

    const closeModal = () => setModalOpen(false);

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername('');
        logoutSuccess()
        router.push('/')
    };

    const LoginForm = () => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');

        const handleSubmit = async (e) => {
            try {
                e.preventDefault();
                if (!email || !password) return alert("All field are mandatory");
                if (!emailRegex.test(email)) return alert("Invalid email");
                const { status, message, payload } = await POST("/auth/login", { email, password })
                if (!status) return alert(message);
                closeModal();
                setIsLoggedIn(true);
                setUsername(payload?.userData?.name);
                loginSuccess(payload);
                window.localStorage.setItem("authToken", payload?.authToken)
                if (payload?.testTitle) {
                    Swal.fire({
                        title: "Are you sure you want to start your test?",
                        text: payload?.testTitle,
                        icon: "success",
                        showCancelButton: true,
                        confirmButtonText: "Yes",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            router.push("/test")
                        }
                    });
                }
            } catch (error) { console.log(error) }
        };

        return (
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Email</label>
                    <Input
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <Input
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Field>
                <Button type='submit' primary>Login</Button>
            </Form>
        );
    };

    const RegisterForm = () => {
        const [name, setName] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');
        const stringRegex = /^[a-zA-Z]+$/

        const handleSubmit = async (e) => {
            try {
                e.preventDefault();
                if (!name || !email || !password || !confirmPassword) return alert("All field are mandatory");
                if (!emailRegex.test(email)) return alert("Invalid email");
                if (!stringRegex.test(name)) return alert("Invalid name");
                if (password !== confirmPassword) return alert("The entered passwords do not match.");
                const { status, message } = await POST("/auth/register", { name, email, password })
                if (!status) return alert(message)
                Swal.fire({
                    title: "Congratulation",
                    text: "You have been registered successfully. Thank you!",
                    icon: 'success',
                    confirmButtonText: 'ok',
                });
                closeModal();
            } catch (error) { console.log(error) }
        };

        return (
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Name</label>
                    <Input
                        placeholder='Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Email</label>
                    <Input
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <Input
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Confirm Password</label>
                    <Input
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Form.Field>
                <Button type='submit' primary>Register</Button>
            </Form>
        );
    };

    return (
        <div>
            <Menu fixed='top' borderless={true}>
                <Container>
                    <Menu.Item header onClick={() => router.push("/")}                    >
                        <img src='https://digiaccel.in/_next/static/media/digi_logo.f906b744.svg' />
                    </Menu.Item>
                    <Menu.Menu position='right'>
                        {isLoggedIn ? (
                            <>
                                <Menu.Item>
                                    <Button onClick={handleLogout}><Icon name='log out' />Log Out</Button>
                                </Menu.Item>
                                <Menu.Item>
                                    <span>{username}</span>
                                </Menu.Item>
                            </>
                        ) : (
                            <>
                                <Menu.Item>
                                    <Button onClick={() => openModal('login')}>Login</Button>
                                </Menu.Item>
                                <Menu.Item>
                                    <Button onClick={() => openModal('register')}>Register</Button>
                                </Menu.Item>
                            </>
                        )}
                    </Menu.Menu>
                </Container>
            </Menu>

            <Modal
                open={modalOpen}
                size='tiny'
                onClose={closeModal}
                closeIcon
            >
                <Modal.Header>{modalType === 'login' ? 'Login' : 'Register'}</Modal.Header>
                <Modal.Content>
                    {modalType === 'login' ? <LoginForm /> : <RegisterForm />}
                </Modal.Content>
            </Modal>
        </div>
    )
}

export default Header