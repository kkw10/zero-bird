import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ErrorWrap = styled.div`
    padding: 20px;
    text-align: center;
    
    & > h1 {
        color: #1890ff;
    }
`

const MyError = ({ statusCode }) => {
    return (
        <ErrorWrap>
            <h1>{statusCode}, 에러 발생</h1>
        </ErrorWrap>
    )
}

MyError.propTypes = {
    statusCode: PropTypes.number
}

MyError.defaultProps = {
    statusCode: 400
}

MyError.getInitialProps = async (context) => {
    const statusCode = context.res ? context.res.statusCode : context.err ? err.statusCode : null;
    return { statusCode }
}

export default MyError;