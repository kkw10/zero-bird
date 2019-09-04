import React from 'react';
import { Button, Card, Icon, List } from 'antd';
import NickEditForm from '../components/NickEditForm';

const Profile = () => {
    return (
        <>  
            <NickEditForm />
            <List  
                style={{ marginBottom: 20 }}
                grid={{ gutter: 4, xs: 2, md: 3 }}
                size="small"
                header={<div>팔로워 목록</div>}
                loadMore={<Button style={{ width: '100%' }}>더 보기</Button>}
                bordered
                dataSource={["TypeScript", "React", "Go"]}
                renderItem={item => (
                    <List.Item style={{ marginTop: 20 }}>
                        <Card actions={[<Icon key="stop" type="stop" />]}>
                            <Card.Meta description={item} />
                        </Card>
                    </List.Item>
                )}
            />
            <List  
                style={{ marginBottom: 20 }}
                grid={{ gutter: 4, xs: 2, md: 3 }}
                size="small"
                header={<div>팔로잉 목록</div>}
                loadMore={<Button style={{ width: '100%' }}>더 보기</Button>}
                bordered
                dataSource={["TypeScript", "React", "Go"]}
                renderItem={item => (
                    <List.Item style={{ marginTop: 20 }}>
                        <Card actions={[<Icon key="stop" type="stop" />]}>
                            <Card.Meta description={item} />
                        </Card>
                    </List.Item>
                )}
            />            
        </>
    )
} 

export default Profile;