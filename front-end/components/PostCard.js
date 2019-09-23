import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { Button, Card, Icon, Avatar, Form, Input, List, Comment } from 'antd';
import PropTypes from 'prop-types';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

const PostCard = ({ value }) => {
    const [commentFormOpened, setCommentFormOpened] = useState(false);
    const [commentText, setCommentText] = useState('');
    const { me } = useSelector(state => state.user);
    const { isAddingComment } = useSelector(state => state.post);
    const dispatch = useDispatch();

    const onToggleComment = useCallback(() => {
        setCommentFormOpened(prev => !prev);
    }, [])

    const onSubmitComment = useCallback((e) => {
        e.preventDefault();
        if(!me) {
            return alert('로그인이 필요합니다!')
        }
        dispatch({
            type: ADD_COMMENT_REQUEST,
            data: {
                postId: value.id
            }
        })

    }, [me && me.id])

    useEffect(() => {
        if(isAddingComment) {
            setCommentText('')            
        }
    }, [isAddingComment])

    const onChangeCommentText = useCallback((e) => {
        setCommentText(e.target.value)
    }, [])

    return (
        <>
            <Card
                key={ +value.createdAt }
                cover={ value.img && <img alt="example" src={value.img} /> }
                actions={[
                    <Icon type="retweet" key="retweet" />,
                    <Icon type="heart" key="heart" />,
                    <Icon type="message" key="message" onClick={ onToggleComment } />,
                    <Icon type="ellipsis" key="ellipsis" />,
                ]}
                extra={<Button>팔로우</Button>}
            >
                <Card.Meta
                    avatar={<Avatar>{value.User.nickname[0]}</Avatar>}
                    title={value.User.nickname}
                    description={(
                        <div>{
                            value.content.split(/(#[^\s]+)/g).map((v) => {
                                if(v.match(/#[^\s]+/)) {
                                    return (
                                        <Link href={`/hashtag/${v.slice(1)}`} key={v}><a>{v}</a></Link>
                                    )
                                }
                                return v;
                            })
                        }</div>
                    )}
                />
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
                                   avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
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