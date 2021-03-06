import React from 'react';
import { Link } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';
const PostItem = ({ item, deleteItem }) => {
    return (
        <div className="list-row">
            <div>
                <Link to={`/posts/${item.slug}`}>{item.title}</Link>
            </div>
            <div>{item._id}</div>
            <div>{new Date(item.createdAt).toLocaleString()}</div>
            <div className="text-center">
                <DeleteOutlined
                    onClick={() => deleteItem(item)}
                    style={{ color: '#e63946' }}
                />
            </div>
        </div>
    );
};

export default PostItem;
