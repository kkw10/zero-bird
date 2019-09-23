import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_HASHTAG_POSTS_REQUEST } from '../reducers/post';
import PostCard from '../components/PostCard';

const Hashtag = ({ tag }) => { // _app.js에서 파라미터를 받아서 사용
    const dispatch = useDispatch();
    const { mainPosts } = useSelector(state => state.post)
    
    useEffect(() => {
        dispatch({
            type: LOAD_HASHTAG_POSTS_REQUEST,
            data: tag
        })
    }, [])
    
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
    console.log(context.query.tag);
    return { tag: context.query.tag };
}

export default Hashtag