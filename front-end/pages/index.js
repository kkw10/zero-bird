import React from 'react';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

const dummy = {
    isLoggedIn: true,
    imagePaths: [],
    mainPosts: [{
        User: {
            id: 1,
            nickname: 'Koon',
        },
        content: 'golang을 배워봅시다!!!',
        img: 'https://miro.medium.com/max/3000/1*30aoNxlSnaYrLhBT0O1lzw.png'
    }]
}

const Home = () => {
    return (
        <>
            <div>
                { dummy.isLoggedIn && <PostForm /> }
                { dummy.mainPosts.map((c) => {
                    return (
                        <PostCard key={c} value={c} />
                    )
                }) }
            </div>
        </>
    )
} 

export default Home