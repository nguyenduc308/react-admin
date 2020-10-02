import React from 'react';

const ListItem = ({ item }) => {
    return (
        <tr>
            <td>{item?.name}</td>
            <td>{item?.name}</td>
            <td>{item?._id}</td>
        </tr>
    );
};
export default ListItem;
