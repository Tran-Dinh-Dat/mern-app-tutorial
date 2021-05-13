import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'antd';

const alertMessage = ({ info }) => {
    if (info === null) {
        return null
    } else {
        return  <Alert message={info.message} type={info.type} showIcon />
    }
}

export default alertMessage;