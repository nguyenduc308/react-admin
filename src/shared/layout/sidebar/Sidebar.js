import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import {
    AppstoreOutlined,
    MailOutlined,
    SettingOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;
const Sidebar = () => {
    const history = useHistory();
    const [selectedKey, setSelectedKey] = useState('/');
    const handleClick = (e) => {
        let path = e.key;
        if (path === '/home') {
            path = '/';
        }
        setSelectedKey(path);
        history.push(path);
    };
    const location = useLocation();
    useEffect(() => {
        let path = location.pathname;
        if (path === '/') {
            path = '/home';
        }
        setSelectedKey(path);
    }, [location]);

    return (
        <Menu
            onClick={handleClick}
            style={{ width: 256 }}
            defaultOpenKeys={['sub1', 'sub2']}
            mode="inline"
            selectedKeys={selectedKey}
        >
            <Menu.Item icon={<SettingOutlined />} key="/home">
                Trang chủ
            </Menu.Item>
            <SubMenu
                key="sub1"
                title={
                    <span>
                        <MailOutlined />
                        <span>Chủ đề</span>
                    </span>
                }
            >
                <Menu.Item key="/categories/list">Tất cả chủ đề</Menu.Item>
                <Menu.Item key="/categories/create">Tạo chủ đề</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Bài viết">
                <Menu.Item key="/posts/list">Tất cả bài viết</Menu.Item>
                <Menu.Item key="/posts/create">Tạo bài viết</Menu.Item>
            </SubMenu>
        </Menu>
    );
};

export default Sidebar;
