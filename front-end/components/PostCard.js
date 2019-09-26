import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostImages from './PostImages';
import Link from 'next/link';
import { Button, Card, Icon, Avatar, Form, Input, List, Comment, Popover } from 'antd';
import PropTypes from 'prop-types';
import { 
    ADD_COMMENT_REQUEST,
    LOAD_COMMENTS_REQUEST, 
    UNLIKE_POST_REQUEST,
    LIKE_POST_REQUEST,
    RETWEET_REQUEST,
    REMOVE_POST_REQUEST
} from '../reducers/post';
import PostCardContent from './PostCardContent';
import { FOLLOW_USER_REQUEST, UNFOLLOW_USER_REQUEST } from '../reducers/user';

const PostCard = ({ value }) => {
    const [commentFormOpened, setCommentFormOpened] = useState(false);
    const [commentText, setCommentText] = useState('');
    const { me } = useSelector(state => state.user);
    const { commentAdded, isAddingComment } = useSelector(state => state.post);
    const dispatch = useDispatch();

    const isLiked = me && value.Likers && value.Likers.find(v => v.id === me.id)

    const onToggleComment = useCallback(() => {
        setCommentFormOpened(prev => !prev); 
        if(!commentFormOpened) {
            dispatch({
                type: LOAD_COMMENTS_REQUEST,
                data: value.id
            })
        }

    }, [])

    const onSubmitComment = useCallback((e) => {
        e.preventDefault();
        if(!me) {
            return alert('로그인이 필요합니다!')
        }
        dispatch({
            type: ADD_COMMENT_REQUEST,
            data: {
                postId: value.id,
                content: commentText
            }
        })

    }, [me && me.id, commentText])

    useEffect(() => {
        if(isAddingComment) {
            setCommentText('')            
        }
    }, [isAddingComment])

    const onChangeCommentText = useCallback((e) => {
        setCommentText(e.target.value)
    }, [])

    const onToggleLike = useCallback(() => {
        if(!me) {
            return alert('로그인이 필요합니다.')
        } 

        if(isLiked) {
            dispatch({
                type: UNLIKE_POST_REQUEST,
                data: value.id
            })

        } else {
            dispatch({
                type: LIKE_POST_REQUEST,
                data: value.id
            })
        }

    }, [me && me.id, value && value.id, isLiked])

    const onRetweet = useCallback(() => {
        if(!me) {
            return alert('로그인이 필요합니다.')
        }

        return dispatch({
            type: RETWEET_REQUEST,
            data: value.id
        })

    }, [me && me.id, value && value.id])

    const onFollow = useCallback(userId => () => {
        dispatch({
            type: FOLLOW_USER_REQUEST,
            data: userId
        })
    }, [])

    const onUnfollow = useCallback(userId => () => {
        dispatch({
            type: UNFOLLOW_USER_REQUEST,
            data: userId
        })
    }, [])

    const onRemovePost = useCallback(userId => () => {
        dispatch({
            type: REMOVE_POST_REQUEST,
            data: userId
        })
    }, [])

    return (
        <>
            <Card
                style={{ marginBottom: 15 }}
                key={ +value.createdAt }
                cover={ value.Images[0] && <PostImages images={value.Images} /> }
                actions={[
                    <Icon type="retweet" key="retweet" onClick={onRetweet} />,
                    <Icon type="heart" key="heart" theme={isLiked ? 'twoTone' : 'outlined'} twoToneColor="#eb2f96" onClick={ onToggleLike } />,
                    <Icon type="message" key="message" onClick={ onToggleComment } />,
                    <Popover
                        key="ellipsis"
                        content={(
                            <Button.Group>
                                {me && value.UserId === me.id
                                    ? (<>
                                        <Button>수정</Button>
                                        <Button type="danger" onClick={onRemovePost(value.id)} >삭제</Button>    
                                    </>)
                                    : <Button>신고</Button>
                                }
                            </Button.Group>
                        )}
                    >
                        <Icon type="ellipsis" />
                    </Popover>
                ]}
                title={ value.RetweetId ? `${value.User.nickname}님이 리트윗하셨습니다.` : null }
                extra={!me || value.User.id === me.id
                    ? null
                    : me.Followings && me.Followings.find(v => v.id === value.User.id)
                        ? <Button onClick={onUnfollow(value.User.id)}>Unfollow</Button>
                        : <Button onClick={onFollow(value.User.id)}>Follow</Button>
                }
            >
                {
                    value.RetweetId && value.Retweet
                    ? (<Card
                        cover={value.Retweet.Images[0] && <PostImages images={value.Retweet.Images} />}
                       >
                            <Card.Meta    
                                avatar={ // 게시글 아바타
                                    <Link href={{ pathname: '/user', query: { id: value.User.id } }} as={`/user/${value.Retweet.User.id}`}><a>
                                        <Avatar>{value.Retweet.User.nickname[0]}</Avatar>    
                                    </a></Link>
                                }
                                title={value.Retweet.User.nickname}
                                description={<PostCardContent postData={value.Retweet} />}
                            />                        
                    </Card>)
                    : (<Card.Meta
                        avatar={ // 게시글 아바타
                            <Link href={{ pathname: '/user', query: { id: value.User.id } }} as={`/user/${value.User.id}`}><a>
                                <Avatar>{value.User.nickname[0]}</Avatar>    
                            </a></Link>
                        }
                        title={value.User.nickname}
                        description={<PostCardContent postData={value} />}
                    />)
                }
            </Card>  
            {commentFormOpened && (
                <>
                    <Form onSubmit={onSubmitComment}>
                        <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText} />
                        <Button type="primary" htmlType="submit" loading={isAddingComment}>삐약</Button>
                    </Form>
                    <List 
                        header={`${ value.Comments ? value.Comments.length : 0 } 댓글`}
                        itemLayout="horizontal"
                        dataSource={value.Comments || []}
                        renderItem={item => (
                            <li>
                                <Comment 
                                   author={item.User.nickname} 
                                   avatar={
                                        <Link href={{ pathname: '/user', query: { id: item.User.id } }} as={`/user/${item.User.id}`}><a>
                                            <Avatar>{value.User.nickname[0]}</Avatar>    
                                        </a></Link>                                       
                                   }
                                   content={item.content}
                                />
                            </li>
                        )}
                    />
                </>
            )}      
        </>
    )
}

PostCard.propTypes = {
    value: PropTypes.shape({
        User: PropTypes.object,
        content: PropTypes.string,
        img: PropTypes.string,
        createdAt: PropTypes.object
    })
}

export default PostCard;