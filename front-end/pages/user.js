import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post';
import { LOAD_USER_REQUEST } from '../reducers/user';
import PostCard from '../components/PostCard';
import { Card, Avatar } from 'antd';


const User = () => {
    const { mainPosts } = useSelector(state => state.post)
    const { userInfo } = useSelector(state => state.user)
    
    return (
        <>
            {userInfo
                ? (<Card
                    style={{ marginBottom: 15 }}
                    actions={[
                        <div key="twit">
                            짹짹
                            <br />
                            {userInfo.Posts}
                        </div>,
                        <div key="following">
                            팔로잉
                            <br />
                            {userInfo.Followings}
                        </div>,
                        <div key="follower">
                            팔로워
                            <br />
                            {userInfo.Followers}
                        </div>,                                        
                    ]}
                >
                    <Card.Meta
                        avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
                        title={userInfo.nickname}
                    />
                </Card>)
                : null
            }
            <div>
                {mainPosts.map(c => (
                    <PostCard value={c} />
                ))}
            </div>        
        </>
    )
}

User.propTypes = {
    id: PropTypes.number.isRequired,
}

// Component에 아래 메서드를 추가 => _app.js에서 파라미터 전달해줌
User.getInitialProps = async (context) => { 
    let id = parseInt(context.query.id, 10)

    context.store.dispatch({
        type: LOAD_USER_REQUEST,
        data: id,
    });
    
    context.store.dispatch({
        type: LOAD_USER_POSTS_REQUEST,
        data: id
    })    
    return { id } // User Component의 props로 전달
}

export default User