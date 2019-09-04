import React from "react";
import { Button, Card, Icon, Avatar } from 'antd';
import PropTypes from 'prop-types';

const PostCard = ({ value }) => {
    return (
        <>
            <Card
                key={ +value.createdAt }
                cover={ value.img && <img alt="example" src={value.img} /> }
                actions={[
                    <Icon type="retweet" key="retweet" />,
                    <Icon type="heart" key="heart" />,
                    <Icon type="message" key="message" />,
                    <Icon type="ellipsis" key="ellipsis" />,
                ]}
                extra={<Button>팔로우</Button>}
            >
                <Card.Meta
                    avatar={<Avatar>{value.User.nickname[0]}</Avatar>}
                    title={value.User.nickname}
                    description={value.content}
                />
            </Card>        
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