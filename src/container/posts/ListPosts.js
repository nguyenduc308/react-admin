import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Statistic, Divider } from 'antd';
import { GET_POSTS_REQUEST } from '../../store/constants/posts';
import PostItem from './PostItem';
import './posts.scss';

const ListPosts = () => {
    const dispatch = useDispatch();
    const { data: posts, count } = useSelector((state) => state.posts.list);
    React.useEffect(() => {
        dispatch({ type: GET_POSTS_REQUEST });
    }, [dispatch]);
    return (
        <React.Fragment>
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
                    {posts &&
                        posts?.map((post) => {
                            return <PostItem key={post._id} item={post} />;
                        })}
                </div>
            </div>
        </React.Fragment>
    );
};

export default ListPosts;
