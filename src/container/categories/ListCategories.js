import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListItem from './ListItem';
import { GET_CATEGORIES_REQUEST } from '../../store/constants/categories';
import { Alert } from 'antd';

const ListCategories = () => {
    const categories = useSelector((state) => state.categories.list);
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch({
            type: GET_CATEGORIES_REQUEST,
        });
    }, []);
    return (
        <React.Fragment>
            <div style={{ marginBottom: '20px' }}>
                <Alert
                    message={`Tổng số: ${categories?.count}`}
                    type="success"
                />
            </div>
            <table className="list-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Id</th>
                    </tr>
                </thead>
                <tbody>
                    {categories &&
                        categories.data &&
                        categories.data.map((item) => {
                            return <ListItem key={item._id} item={item} />;
                        })}
                </tbody>
            </table>
        </React.Fragment>
    );
};

export default ListCategories;
