import React, { useCallback, useState, useEffect, useRef } from "react";
import { Form, Input, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST } from "../reducers/post";

const PostForm = () => {
    const dispatch = useDispatch();
    const { isAddingPost, imagePath, postAdded } = useSelector(state => state.post);
    const [text, setText] = useState('');
    const imageInput = useRef();

    useEffect(() => {
        if(postAdded) {
            setText("") 
        }
    }, [postAdded])

    const onSubmitForm = useCallback((e) => {
        e.preventDefault();
        if(!text || !text.trim()) {
            return alert('게시글을 작성해주세요.')
        }

        dispatch({
            type: ADD_POST_REQUEST,
            data: {
                content: text, 
            }
        })
    }, [text])

    const onChangeText = useCallback((e) => {
        setText(e.target.value);
    }, [])

    const onChangeImages = useCallback((e) => {
        console.log(e.target.files);
        const imageFormData = new FormData(); // 브라우저가 제공해주는 객체 (단, form태그에 encType 설정해야함, spa를 유지하기 위해서 json객체로 변환해줘야하기 때문.))
        [].forEach.call(e.target.files, (f) => {
            imageFormData.append('image', f)
        });

        dispatch({
            type: UPLOAD_IMAGES_REQUEST,
            data: imageFormData
        })

    }, [])

    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current])

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
                    <input type="file" multiple hidden ref={imageInput} onChange={onChangeImages} />
                    <Button onClick={onClickImageUpload}>이미지 업로드</Button>
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