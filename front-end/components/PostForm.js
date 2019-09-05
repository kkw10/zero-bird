import React from "react";
import { Form, Input, Button } from 'antd';
import { useSelector } from 'react-redux';

const PostForm = () => {
    const imagePath = useSelector(state => state.post.imagePath);

    return (
        <>
            <Form 
                style={{ marginBottom: 20, marginTop: 20 }} 
                encType="multipart/form-data"
            >
                <Input.TextArea maxLength={140} placeholder="어떤 신기한 일이 있었나요?" />
                <div>
                    <input type="file" multiple hidden />
                    <Button>이미지 업로드</Button>
                    <Button type="primary" style={{ float: 'right' }} htmlType="submit">짹짹</Button>
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