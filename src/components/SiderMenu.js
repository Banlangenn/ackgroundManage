import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
 //渲染二级
const renderMenuItem =
    ({ key, title, icon, link,sub, ...props }) =>
        <Menu.Item
            key={key || link}
            {...props}
        >
            <Link to={link || key}>
                {icon && <Icon type={icon} />}
                <span className="nav-text">{title}</span>
            </Link>

            55548484874874848
        </Menu.Item>;
 //渲染-级  1 级是没有link  链接的
const renderSubMenu =
    ({ key, title, icon, link, sub, ...props }) =>
        <Menu.SubMenu
            key={key || link}
            title={
                <span>
                    {icon && <Icon type={icon} />}
                    <span className="nav-text">{title}</span>
                </span>
            }
            {...props}
        >
            {sub && sub.map(item => renderMenuItem(item))}
        </Menu.SubMenu>;

export default ({ menus, ...props }) => <Menu {...props}>
    {menus && menus.map(
        item => item.sub && item.sub.length ?
            renderSubMenu(item) : renderMenuItem(item)
    )}
</Menu>;