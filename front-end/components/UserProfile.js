import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { logoutAction } from '../reducers/user';

const UserProfile = () => {
    const nickname = useSelector(state => state.user.user.nickname)
    const Post = useSelector(state => state.user.user.post)
    const Followings = useSelector(state => state.user.user.followings)
    const Followers = useSelector(state => state.user.user.followers) 
    const dispatch = useDispatch();
    const onLogout = useCallback(() => {
        dispatch(logoutAction)
    }, [])

    return (
        <>
            <Card 
                actions={[
                    <div key="twit">짹짹<br/>{Post.length}</div>,
                    <div key="following">팔로잉<br/>{Followings.length}</div>,
                    <div key="follower">팔로워<br/>{Followers.length}</div>
                ]}
            >
                <Card.Meta
                    avatar={<Avatar>{nickname[0]}</Avatar>}
                    title={nickname}
                />
                <Button onClick={onLogout}>로그아웃</Button>
            </Card>
        </>
    )
}

export default UserProfile;