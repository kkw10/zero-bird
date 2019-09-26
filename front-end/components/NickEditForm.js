import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { EDIT_NICKNAME_REQUEST } from '../reducers/user';

const NickEditForm = () => {
    const [ editedName, setEditedName ] = useState('');
    const dispatch = useDispatch();
    const { me, isEditingNickname } = useSelector(state => state.user);

    const onChangeNickname = useCallback((e) => {
        setEditedName(e.target.value)
    }, [])
    
    const onEditNicname = useCallback((e) => {
        e.preventDefault()
        dispatch({
            type: EDIT_NICKNAME_REQUEST,
            data: editedName
        })

    }, [editedName])

    return (
        <Form onSubmit={onEditNicname} style={{ marginBottom: 20, border: '1px solid #d9d9d9', padding: 20 }}>
            <Input addonBefore="닉네임" value={ editedName || (me && me.nickname) } onChange={onChangeNickname} />
            <Button type="primary" htmlType="submit" loading={isEditingNickname} >수정</Button>
        </Form>            
    )
}

export default NickEditForm;