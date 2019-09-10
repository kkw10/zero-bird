import React, { useCallback, useState, useEffect } from "react";
import { Form, Input, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_POST_REQUEST } from "../reducers/post";

const PostForm = () => {
    const dispatch = useDispatch();
    const { isAddingPost, imagePath, postAdded } = useSelector(state => state.post);
    const [text, setText] = useState('');

    useEffect(() => {
        if(postAdded) {
            setText("") 
        }
    }, [postAdded])

    const onSubmitForm = useCallback((e) => {
        e.preventDefault();
        dispatch({
            type: ADD_POST_REQUEST,
            data: {
                text, 
            }
        })
    }, [])

    const onChangeText = useCallback((e) => {
        setText(e.target.value);
    }, [])

    return (
        <>
            <Form 
                style={{ marginBottom: 20, marginTop: 20 }} 
                encType="multipart/form-data"
                onSubmit={onSubmitForm}
            >
                <Input.TextArea 
                    maxLength={140} 
                    value={text} 
                    placeholder="어떤 신기한 일이 있었나요?" 
                    onChange={onChangeText}
                />
                <div>
                    <input type="file" multiple hidden />
                    <Button>이미지 업로드</Button>
                    <Button type="primary" style={{ float: 'right' }} htmlType="submit" loading={isAddingPost}>짹짹</Button>
                </div>
                <div>
                    {imagePath.map((v, i) => {
                        return (
                            <div key={v} style={{ display: 'inline-block' }} >
                                <img src={'http://localhost:3000/' + v} style={{ width: '200px' }} />
                                <div>
                                    <Button>제거</Button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Form>            
        </>
    )
}

export default PostForm;