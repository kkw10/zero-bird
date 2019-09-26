import React, { useEffect } from 'react';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';

const Home = () => {
    const me = useSelector(state => state.user.me);
    const { mainPosts } = useSelector(state => state.post);

    return (
        <div>
            { me 
                ? <div>{ me.nickname }님께서 로그인 했습니다.</div> 
                : <div>로그인을 해주세요!</div>  
            }
            { me && <PostForm /> }
            { mainPosts.map((c) => {
                return (
                    <PostCard key={c} value={c} />
                )
            }) }
        </div>
    )
} 

// SSR
Home.getInitialProps = async (context) => {
    console.log(Object.keys(context));
    context.store.dispatch({
        type: LOAD_MAIN_POSTS_REQUEST,
    })
}; 

export default Home