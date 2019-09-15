import React, { useCallback } from "react";
import useInput from "../hooks/useInput";
import Link from 'next/link';
import { Input, Button, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_IN_REQUEST } from "../reducers/user";

const LoginForm = () => {
    const [userId, onChangeId] = useInput('');
    const [password, onChangePassword] = useInput('');
    const dispatch = useDispatch();
    const { isLoggingIn } = useSelector(state => state.user);
    const onSubmitForm = useCallback((e) => {
        e.preventDefault();
        dispatch({
            type: LOG_IN_REQUEST,
            data: {
                userId, 
                password
            }
        })
    }, [userId, password])

    return (
        <Form onSubmit={onSubmitForm} style={{ padding: 10 }}>
            <div>
                <label htmlFor="user-id">아이디</label>
                <br/>
                <Input name="user-id" value={userId} onChange={onChangeId} required />
            </div>
            <div>
                <label htmlFor="user-password">비밀번호</label>
                <br/>
                <Input name="user-password" type="password" value={password} onChange={onChangePassword} required />
            </div>
            <div style={{ marginTop: 10 }}>
                <Button type="primary" htmlType="submit" loading={isLoggingIn} >로그인</Button> 
                <Link href="/signup"><a><Button>회원가입</Button></a></Link>   
            </div>                                                
        </Form>         
    )
}

export default LoginForm;