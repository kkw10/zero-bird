import React, { useState, useCallback, useEffect } from 'react';
import useInput from '../hooks/useInput';
import Router from 'next/router';
import { Form, Input, Checkbox, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { SIGN_UP_REQUEST } from '../reducers/user';

const Signup = () => {
    const [id, onChangeId] = useInput('');
    const [nick, onChangeNick] = useInput('');
    const [password, onChangePass] = useInput('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [term, setTerm] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [termError, setTermError] = useState(false);
    const dispatch = useDispatch();
    const { isSigningUp, me } = useSelector(state => state.user)

    useEffect(() => {
        if(me) {
            alert('로그인이 완료되었습니다, 메인페이지로 이동합니다.')
            Router.push('/')
        }
    }, [me && me.id]) // javascript 객체는 undefined일 수도 있으니 방어적 코딩을 함

    const onSubmit = useCallback((e) => {
        e.preventDefault()

        if(password !== passwordCheck) {
            return setPasswordError(true)
        }

        if(!term) {
            return setTermError(true)
        }

        dispatch({
            type: SIGN_UP_REQUEST,
            data: {
                userId: id,
                password,
                nickname: nick
            }
        })

    }, [id, nick, password, passwordCheck, term]);

    const onChangePassChk = useCallback((e) => {
        setPasswordError(e.target.value !== password)
        setPasswordCheck(e.target.value)
    }, [password]);

    const onChangeTerm = useCallback((e) => {
        setTermError(false);
        setTerm(e.target.checked)
    }, []);

    if(me) {
        return null
    }

    return (
        <>      
            <div>Signup</div>                     
            <Form onSubmit={onSubmit} style={{ padding: 15 }}>
                <div>
                    <label htmlFor="user-id">아이디</label>
                    <br/>
                    <Input name="user-id" value={id} required onChange={onChangeId} />
                </div>
                <div>
                    <label htmlFor="user-nick">닉네임</label>
                    <br/>
                    <Input name="user-nick" value={nick} required onChange={onChangeNick} />
                </div>
                <div>
                    <label htmlFor="user-password">비밀번호</label>
                    <br/>
                    <Input name="user-password" value={password} type="password" required onChange={onChangePass} />
                </div>             
                <div>
                    <label htmlFor="user-password-chk">비밀번호 확인</label>
                    <br/>
                    <Input name="user-password-chk" value={passwordCheck} type="password" required onChange={onChangePassChk} />
                    {passwordError && <div style={{ color: "red" }}>비밀번호가 일치하지 않습니다.</div>}
                </div>    
                <div>
                    <Checkbox name="user-term" value={term} onChange={onChangeTerm}>
                        전부 동의합니다.
                    </Checkbox>
                    {termError && <div style={{ color: "red" }}>약관에 동의하셔야 합니다.</div>}
                </div>         
                <div style={{ marginTop: 10 }}>
                    <Button type="primary" htmlType="submit" loading={isSigningUp} >가입하기</Button>
                </div>                                   
            </Form>    
        </>
    )
} 

export default Signup;