import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, message, Statistic, Divider } from 'antd';
import { deletePostByslugApi } from '../../apis/posts';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { GET_POSTS_REQUEST, DELETE_POST } from '../../store/constants/posts';
import PostItem from './PostItem';
import './posts.scss';

const ListPosts = () => {
    const dispatch = useDispatch();
    const { data: posts, count } = useSelector((state) => state.posts.list);
    useEffect(() => {
        dispatch({ type: GET_POSTS_REQUEST });
    }, [dispatch]);

    const [showModal, setShowModal] = useState(false);
    const [postToDelete, setPostToDelete] = useState('');
    const confirmDeleteItem = (post) => {
        setShowModal(true);
        setPostToDelete(post);
    };
    const handleDeleteItem = async () => {
        await deletePostByslugApi(postToDelete.slug)
            .then((data) => {
                dispatch({
                    type: DELETE_POST,
                    payload: postToDelete._id,
                });
                message.success(
                    `Xóa bài viết ${postToDelete.title} thành công !`,
                );
            })
            .catch((error) => {
                message.warning(
                    `Xóa bài viết ${postToDelete.title} thất bại !`,
                );
                console.error(error);
            });
        setShowModal(false);
        setPostToDelete(null);
    };

    const closeModal = () => {
        setPostToDelete(null);
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
                    Bạn chắc chắn xóa chủ đề{' '}
                    <strong>{postToDelete?.name}</strong> không ?
                </p>
            </Modal>
            <div style={{ marginBottom: '20px' }}>
                <Statistic title="Tổng số bài" value={count} />
            </div>
            <Divider />
            <div className="list-table list-posts">
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
                        {posts &&
                            posts?.map((post) => {
                                return (
                                    <PostItem
                                        deleteItem={confirmDeleteItem}
                                        key={post._id}
                                        item={post}
                                    />
                                );
                            })}
                    </ReactCSSTransitionGroup>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ListPosts;
