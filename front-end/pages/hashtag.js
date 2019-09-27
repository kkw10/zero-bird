import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_HASHTAG_POSTS_REQUEST } from '../reducers/post';
import PostCard from '../components/PostCard';

const Hashtag = ({ tag }) => { // _app.js에서 파라미터를 받아서 사용
    const { mainPosts, hasMorePost } = useSelector(state => state.post)
    const dispatch = useDispatch();

    const onScroll = useCallback(() => {
        if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
            if(hasMorePost) {
                dispatch({
                    type: LOAD_HASHTAG_POSTS_REQUEST,
                    lastId: mainPosts[mainPosts.length - 1].id,
                    data: tag
                })
            }
        }
    }, [mainPosts.length, hasMorePost])

    useEffect(() => {
        window.addEventListener('scroll', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);    
        }

    }, [mainPosts.length])    

    return (
        <div>
            {mainPosts.map(c => {
                return <PostCard value={c} />
            })}
        </div>
    )
}

Hashtag.propTypes = {
    tag: PropTypes.string.isRequired,
}

// Component에 아래 메서드를 추가 => _app.js에서 파라미터 전달해줌
Hashtag.getInitialProps = async (context) => { 
    const tag = context.query.tag;

    context.store.dispatch({
        type: LOAD_HASHTAG_POSTS_REQUEST,
        data: tag        
    })

    return { tag };
}

export default Hashtag