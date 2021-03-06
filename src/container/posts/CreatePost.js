import React, { useState, useEffect } from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Ckeditor from '@ckeditor/ckeditor5-react';
import { Editor, EditorState, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { Input } from 'antd';
import { Select, Typography, Divider, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { GET_CATEGORIES_REQUEST } from '../../store/constants/categories';
import { CREATE_POST_REQUEST } from '../../store/constants/posts';
const { Title } = Typography;
const { Option } = Select;
const CreatePost = () => {
    const [blog, setBlog] = useState({
        title: '',
        categories: [],
        content: '',
        imageUrl: '',
    });
    const dispatch = useDispatch();
    const { list: categories, posting } = useSelector(
        (state) => state.categories,
    );

    useEffect(() => {
        dispatch({ type: GET_CATEGORIES_REQUEST });
    }, [dispatch]);

    const handleContentChange = (event, editor) => {
        const content = editor.getData();
        setBlog({ ...blog, content });
    };
    const handleCategoriesChange = (value) => {
        setBlog({
            ...blog,
            categories: value,
        });
    };
    const handleInputChange = (e) => {
        setBlog({
            ...blog,
            [e.target.name]: e.target.value,
        });
    };
    const [editorState, setEditorState] = React.useState(() =>
        EditorState.createEmpty(),
    );

    const onSubmit = (e) => {
        e.preventDefault();
        const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
        console.log(blocks);
        const value = blocks
            .map((block) => (!block.text.trim() && '\n') || block.text)
            .join('\n');
        if (blog.title && value) {
            dispatch({
                type: CREATE_POST_REQUEST,
                payload: { ...blog, content: value },
            });
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="row">
                <div className="col col-9">
                    <div className="form-group">
                        <Title level={5}>Tiêu đề</Title>
                        <Input
                            name="title"
                            onChange={handleInputChange}
                            placeholder="Tiêu đề"
                            disabled={posting}
                        />
                    </div>
                    <div className="form-group">
                        <Title level={5}>Nội dung</Title>
                        <Editor
                            editorState={editorState}
                            onChange={setEditorState}
                        ></Editor>
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
                            name="imageUrl"
                            onChange={handleInputChange}
                            placeholder="Link hình ảnh"
                            disabled={posting}
                        />
                    </div>
                </div>
            </div>
            <Divider />
            <Button type="primary" htmlType="submit" disabled={posting}>
                Đăng bài
            </Button>
        </form>
    );
};
export default CreatePost;
