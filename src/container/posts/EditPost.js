import React, { useState, useEffect } from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Ckeditor from '@ckeditor/ckeditor5-react';
import { Input } from 'antd';
import { Select, Typography, Divider, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { GET_CATEGORIES_REQUEST } from '../../store/constants/categories';
import {
    CLEAR_CURRENT_POST,
    CREATE_POST_REQUEST,
    GET_POST_BY_SLUG_REQUEST,
} from '../../store/constants/posts';
import { useParams } from 'react-router-dom';
import './posts.scss';

const { Title } = Typography;
const { Option } = Select;

const EditPost = () => {
    const [blog, setBlog] = useState({
        title: '',
        categories: [],
        imageUrl: '',
    });
    const [content, setContent] = useState('');

    const dispatch = useDispatch();
    const { list: categories } = useSelector((state) => state.categories);
    const { posting, currentPost } = useSelector((state) => state.posts);
    useEffect(() => {
        if (currentPost && Object.keys(currentPost).length) {
            const { title, categories, content, imageUrl } = currentPost;
            setBlog({ title, categories, imageUrl });
            setContent(content);
        }
    }, [currentPost]);

    const { slug } = useParams();
    useEffect(() => {
        dispatch({ type: GET_CATEGORIES_REQUEST });
        dispatch({ type: GET_POST_BY_SLUG_REQUEST, payload: slug });
        return () => {
            dispatch({
                type: CLEAR_CURRENT_POST,
            });
        };
    }, [dispatch, slug]);

    const handleContentChange = (event, editor) => {
        const content = editor.getData();
        setContent(content);
    };
    const handleCategoriesChange = (value) => {
        setBlog({ ...blog, categories: value });
    };
    const handleInputChange = (e) => {
        setBlog({
            ...blog,
            [e.target.name]: e.target.value,
        });
    };
    const onSubmit = (e) => {
        e.preventDefault();
        if (blog.title && blog.content) {
            dispatch({
                type: CREATE_POST_REQUEST,
                payload: blog,
            });
        }
    };
    let { title = '', categories: options = [], imageUrl = '' } = blog;
    options = options.map((option) => option._id);
    return (
        <form onSubmit={onSubmit}>
            <div className="row">
                <div className="col col-9">
                    <div className="form-group">
                        <Title level={5}>Tiêu đề</Title>
                        <Input
                            name="title"
                            value={title}
                            onChange={handleInputChange}
                            placeholder="Tiêu đề"
                            disabled={posting}
                        />
                    </div>
                    <div className="form-group">
                        <Title level={5}>Nội dung</Title>
                        <Ckeditor
                            editor={ClassicEditor}
                            disabled={posting}
                            data={content}
                            onInit={(editor) => {}}
                            onChange={handleContentChange}
                        ></Ckeditor>
                    </div>
                </div>
                <div className="col col-3">
                    <div className="form-group">
                        <Title level={5}>Chủ đề</Title>
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Chọn chủ đề"
                            onChange={handleCategoriesChange}
                            disabled={posting}
                            value={options}
                        >
                            {categories.data &&
                                categories.data.map((category) => {
                                    return (
                                        <Option
                                            key={category._id}
                                            value={category._id}
                                        >
                                            {category.name}
                                        </Option>
                                    );
                                })}
                        </Select>
                    </div>
                    <div className="form-group">
                        <Title level={5}>Hình ảnh</Title>
                        <Input
                            value={imageUrl}
                            name="imageUrl"
                            onChange={handleInputChange}
                            placeholder="Link hình ảnh"
                            disabled={posting}
                        />
                        {imageUrl && (
                            <div className="image-preview">
                                <img src={imageUrl} alt="preview" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Divider />
            <Button type="primary" htmlType="submit" disabled={posting}>
                Cập nhật
            </Button>
        </form>
    );
};
export default EditPost;
