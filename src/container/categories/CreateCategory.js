import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { useDispatch } from 'react-redux';
import { CREATE_CATEGORY_REQUEST } from '../../store/constants/categories';

const CreateCategory = () => {
    const dispatch = useDispatch();
    const onFinish = (values) => {
        dispatch({
            type: CREATE_CATEGORY_REQUEST,
            payload: values,
        });
    };

    return (
        <React.Fragment>
            <h3>Tạo chủ đề mới</h3>
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        { required: true, message: 'Vui lòng nhập chủ đề!' },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Tạo mới
                    </Button>
                </Form.Item>
            </Form>
        </React.Fragment>
    );
};
export default CreateCategory;
