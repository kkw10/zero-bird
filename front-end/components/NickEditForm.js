import React from 'react';
import { Form, Input, Button } from 'antd';

const NickEditForm = () => {
    return (
        <>
            <Form style={{ marginBottom: 20, border: '1px solid #d9d9d9', padding: 20 }}>
                <Input addonBefore="닉네임" />
                <Button type="primary">수정</Button>
            </Form>            
        </>
    )
}

export default NickEditForm;