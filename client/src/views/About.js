import { Content } from 'antd/lib/layout/layout';
import React from 'react';

const About = () => {
    return (
        <Content className="site-layout" style={{ padding: '64px 50px'}}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
          About
        </div>
      </Content>
    );
};

export default About;