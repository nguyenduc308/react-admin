import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListItem from './ListItem';
import {
    GET_CATEGORIES_REQUEST,
    DELETE_ITEM,
} from '../../store/constants/categories';
import { Modal, message, Statistic, Divider } from 'antd';
import { deleteCategoryByIdApi } from '../../apis/categories';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const ListCategories = () => {
    const categories = useSelector((state) => state.categories.list);
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch({
            type: GET_CATEGORIES_REQUEST,
        });
    }, [dispatch]);
    const [showModal, setShowModal] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState('');
    const confirmDeleteItem = (category) => {
        setShowModal(true);
        setCategoryToDelete(category);
    };
    const handleDeleteItem = async () => {
        await deleteCategoryByIdApi(categoryToDelete._id)
            .then((data) => {
                dispatch({
                    type: DELETE_ITEM,
                    payload: categoryToDelete._id,
                });
                message.success(
                    `Xóa chủ đề ${categoryToDelete.name} thành công !`,
                );
            })
            .catch((error) => {
                message.warning(
                    `Xóa chủ đề ${categoryToDelete.name} thất bại !`,
                );
                console.error(error);
            });
        setShowModal(false);
        setCategoryToDelete(null);
    };

    const closeModal = () => {
        setCategoryToDelete(null);
        setShowModal(false);
    };
    return (
        <React.Fragment>
            <Modal
                title="Xác nhận"
                visible={showModal}
                onOk={handleDeleteItem}
                onCancel={closeModal}
                okText="Xóa"
                cancelText="Thoát"
            >
                <p>
                    Khi bạn xóa một chủ đề{' '}
                    <span className="color-red">không thể</span> khôi phục nó
                    được !
                </p>
                <p>
                    {' '}
                    Bạn chắc chắn xóa chủ đề{' '}
                    <strong>{categoryToDelete?.name}</strong> không ?
                </p>
            </Modal>
            <div style={{ marginBottom: '20px' }}>
                <Statistic title="Tổng số chủ đề" value={categories?.count} />
            </div>
            <Divider />
            <div className="list-table">
                <div className="list-row list-row-head">
                    <div>Tên chủ đề</div>
                    <div>Slug</div>
                    <div>ID</div>
                    <div>Xóa chủ đề</div>
                </div>
                <div>
                    <ReactCSSTransitionGroup
                        transitionName="fade"
                        transitionEnterTimeout={1000}
                        transitionLeaveTimeout={600}
                    >
                        {categories &&
                            categories.data &&
                            categories.data.map((item) => {
                                return (
                                    <ListItem
                                        key={item._id}
                                        item={item}
                                        deleteItem={confirmDeleteItem}
                                    />
                                );
                            })}
                    </ReactCSSTransitionGroup>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ListCategories;
