import React, { useCallback } from 'react';
import { Button, Card, Icon, List } from 'antd';
import NickEditForm from '../components/NickEditForm';
import { useDispatch, useSelector } from 'react-redux';
import PostCard from '../components/PostCard';
import { 
    LOAD_FOLLOWERS_REQUEST,
    LOAD_FOLLOWINGS_REQUEST,
    UNFOLLOW_USER_REQUEST, 
    REMOVE_FOLLOWER_REQUEST
} from '../reducers/user';
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post'

const Profile = () => {
    const dispatch = useDispatch();
    const { me, followerList, followingList } = useSelector(state => state.user);
    const { mainPosts } = useSelector(state => state.post);

    const onUnfollow = useCallback(userId => () => {
        dispatch({
            type: UNFOLLOW_USER_REQUEST,
            data: userId
        })
    }, [])

    const onRemoveFollower = useCallback(userId => () => {
        dispatch({
            type: REMOVE_FOLLOWER_REQUEST,
            data: userId
        })
    }, [])

    const loadMoreFollowings = useCallback(() => {
        dispatch({
            type: LOAD_FOLLOWINGS_REQUEST,
            offset: followingList.length
        })
    }, [followingList.length])

    const loadMoreFollowers = useCallback(() => {
        dispatch({
            type: LOAD_FOLLOWERS_REQUEST,
            offset: followerList.length
        })
    }, [followerList.length])

    return (
        <>  
            <NickEditForm />
            {me  
                ? (<div>
                    <List  
                        style={{ marginBottom: 20 }}
                        grid={{ gutter: 4, xs: 2, md: 3 }}
                        size="small"
                        header={<div>팔로워 목록</div>}
                        loadMore={<Button style={{ width: '100%' }} onClick={loadMoreFollowers} >더 보기</Button>}
                        bordered
                        dataSource={followerList}
                        renderItem={item => {
                            return (
                            <List.Item style={{ marginTop: 20 }}>
                                <Card actions={[<Icon key="stop" type="stop" onClick={onRemoveFollower(item.id)} />]}>
                                    <Card.Meta description={item.nickname} />
                                </Card>
                            </List.Item>
                        )}}
                    />
                    <List  
                        style={{ marginBottom: 20 }}
                        grid={{ gutter: 4, xs: 2, md: 3 }}
                        size="small"
                        header={<div>팔로잉 목록</div>}
                        loadMore={<Button style={{ width: '100%' }} onClick={loadMoreFollowings} >더 보기</Button>}
                        bordered
                        dataSource={followingList}
                        renderItem={item => (
                            <List.Item style={{ marginTop: 20 }}>
                                <Card actions={[<Icon key="stop" type="stop" onClick={onUnfollow(item.id)} />]}>
                                    <Card.Meta description={item.nickname} />
                                </Card>
                            </List.Item>
                        )}
                    />                  
                </div>)
                : <div>로그인이 필요합니다.</div>
            }
            <div>
                {me && mainPosts.map(c => {
                    return <PostCard value={c} />
                })}
            </div>                      
        </>
    )
} 

Profile.getInitialProps = async (context) => {
    const state = context.store.getState();

    context.store.dispatch({
        type: LOAD_FOLLOWERS_REQUEST,
        data: state.user.me && state.user.me.id
    });

    context.store.dispatch({
        type: LOAD_FOLLOWINGS_REQUEST,
        data: state.user.me && state.user.me.id
    });

    context.store.dispatch({
        type: LOAD_USER_POSTS_REQUEST,
        data: state.user.me && state.user.me.id
    })  
}

export default Profile;