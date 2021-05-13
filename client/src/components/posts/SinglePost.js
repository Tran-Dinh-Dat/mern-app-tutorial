import { Button, Card, Col, Typography } from "antd"
import Meta from "antd/lib/card/Meta"
import Text from "antd/lib/typography/Text"
import ActionButtons from "./ActionButtons"

const SinglePost = ({post: {_id, title, description, status, url}}) => {
    return (
       <Col span={6}>
            <Card 
                style={{margin: 5, cursor: 'default'}}
                hoverable
                title={title} 
                extra={<Button size='small' style={{ borderRadius: 8, cursor: 'default'}}>
                        <Text 
                            type={status === 'LEARNED' ? 'success' : status ==='LEARNING' ? 'warning' : 'danger' }>{status}
                        </Text>
                    </Button>}
            >
                <Text>{description}</Text>
                <Col style={{ float: 'right' }}>
                    <ActionButtons key={_id} url={ url } _id={ _id }></ActionButtons>
                </Col>
            </Card>
       </Col>
    )
}

export default SinglePost