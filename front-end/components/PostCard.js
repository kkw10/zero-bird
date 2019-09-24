import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { Button, Card, Icon, Avatar, Form, Input, List, Comment } from 'antd';
import PropTypes from 'prop-types';
import { 
    ADD_COMMENT_REQUEST,
    LOAD_COMMENTS_REQUEST 
} from '../reducers/post';

const PostCard = ({ value }) => {
    const [commentFormOpened, setCommentFormOpened] = useState(false);
    const [commentText, setCommentText] = useState('');
    const { me } = useSelector(state => state.user);
    const { isAddingComment } = useSelector(state => state.post);
    const dispatch = useDispatch();

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

    return (
        <>
            <Card
                style={{ marginBottom: 15 }}
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
                    avatar={ // 게시글 아바타
                        <Link href={{ pathname: '/user', query: { id: value.User.id } }} as={`/user/${value.User.id}`}><a>
                            <Avatar>{value.User.nickname[0]}</Avatar>    
                        </a></Link>
                    }
                    title={value.User.nickname}
                    description={(
                        <div>{
                            value.content.split(/(#[^\s]+)/g).map((v) => {
                                if(v.match(/#[^\s]+/)) {
                                    return (
                                        <Link href={{ pathname: '/hashtag', query: { tag: v.slice(1) } }} as={`/hashtag/${v.slice(1)}`} key={v}><a>{v}</a></Link>
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