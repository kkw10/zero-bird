import React, { useEffect, useCallback, useRef } from 'react';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_MAIN_POSTS_REQUEST } from '../reducers/post';

const Home = () => {
    const me = useSelector(state => state.user.me);
    const { mainPosts, hasMorePost } = useSelector(state => state.post);
    const dispatch = useDispatch();
    const countRef = useRef([]); // 무한 스크롤링에서 너무 많은 요청이 가는 것을 방지하기 위해서 쓰로틀링 구현

    const onScroll = useCallback(() => {
        if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
            if(hasMorePost) {
                let lastId = mainPosts[mainPosts.length - 1].id
                if(!countRef.current.includes(lastId)) {
                    dispatch({
                        type: LOAD_MAIN_POSTS_REQUEST,
                        lastId
                    });                    
                    countRef.current.push(lastId);
                }
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
            { me 
                ? <div>{ me.nickname }님께서 로그인 했습니다.</div> 
                : <div>로그인을 해주세요!</div>  
            }
            { me && <PostForm /> }
            { mainPosts.map((c) => {
                return (
                    <PostCard key={c.id} value={c} />
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