import React from 'react';
import { Layout, Menu, Icon,Dropdown } from 'antd';
import { withRouter } from 'react-router';
import styles from './style/index.scss';
import CustomIcon from '../../common/CustomIcon'
import MenuList from "../../common/MenuList";
const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;


/***
 * 入口壳
 */
const menu = (
    <Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/"><Icon type="user" />个人中心</a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/"><Icon type="setting" />个人设置</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/"><Icon type="logout" />退出登录</a>
        </Menu.Item>
    </Menu>
);

class App extends React.Component {

    constructor(props) {
        super(props);
        window.app = this;

        window.app.router = {history: this.props.history, location: this.props.location, match: this.props.match};

        this.state = {
            collapsed: false,//折叠
        }
        console.log('appthis',this);
    }
    componentDidMount() {
        //console.log('aaa',this.router);
        //console.log('this.props.',this.props.children)
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <Layout className={styles.app}>
                <Sider
                    trigger={null}
                    breakpoint="xs"
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div className={styles.logo}>
                        <CustomIcon path={require('images/logo.svg')} className={styles.img}/>
                        <h1>Ant Design Pro</h1></div>
                    <MenuList />
                </Sider>
                <Layout>
                    <Header style={{background: '#fff', padding: 0}}>
                        <Icon
                            className={styles.trigger}
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                        <div className={styles.rightheader}>
                            <Dropdown overlay={menu}>
                                <div className={styles.mymenu}>
                                    <img src={require('images/user.png')} alt=""/>
                                   <span>张三疯</span>
                                </div>
                            </Dropdown>
                        </div>
                    </Header>
                    <Content style={{margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280}}>
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default withRouter(App);

