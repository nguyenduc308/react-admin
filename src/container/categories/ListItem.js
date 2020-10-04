import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';

const ListItem = ({ item, deleteItem }) => {
    return (
        <div className="list-row">
            <div>{item?.name}</div>
            <div>{item?.name}</div>
            <div>{item?._id}</div>
            <div>
                <span className="icon-action">
                    <DeleteOutlined
                        style={{ color: '#e63946' }}
                        onClick={() => deleteItem(item)}
                    />
                </span>
            </div>
        </div>
    );
};
export default ListItem;
