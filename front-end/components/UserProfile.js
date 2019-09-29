import React, { useCallback, useEffect } from 'react';
import { Card, Avatar, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { LOG_OUT_REQUEST } from '../reducers/user';

const UserProfile = () => {
    // const nickname = useSelector(state => state.user.me.nickname)
    // const Post = useSelector(state => state.user.me.Posts)
    // const Followings = useSelector(state => state.user.me.Followings)
    // const Followers = useSelector(state => state.user.me.Followers) 
    const { me } = useSelector(state => state.user)
    const dispatch = useDispatch();
    const onLogout = useCallback(() => {
        dispatch({
            type: LOG_OUT_REQUEST
        })
    }, [])

    useEffect(() => {
        
    })

    return (
        <Card 
            actions={[
                // <div key="twit">짹짹<br/>{me.Posts.length}</div>,
                // <div key="following">팔로잉<br/>{me.Followings.length}</div>,
                // <div key="follower">팔로워<br/>{me.Followers.length}</div>
            ]}
        >
            <Card.Meta
                avatar={<Avatar>{me.nickname[0]}</Avatar>}
                title={me.nickname}
            />
            <Button onClick={onLogout}>로그아웃</Button>
        </Card>
    )
}

export default UserProfile;