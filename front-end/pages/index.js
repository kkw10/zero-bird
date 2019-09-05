import React, { useEffect } from 'react';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { useSelector } from 'react-redux';

const Home = () => {
    const user = useSelector(state => state.user.user);
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const { mainPosts } = useSelector(state => state.post);

    return (
        <div>
            { user 
                ? <div>{ user.nickname }님께서 로그인 했습니다.</div> 
                : <div>로그인을 해주세요!</div>  
            }
            { isLoggedIn && <PostForm /> }
            { mainPosts.map((c) => {
                return (
                    <PostCard key={c} value={c} />
                )
            }) }
        </div>
    )
} 

export default Home