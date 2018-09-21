import React from 'react';
import {Link} from "react-router-dom";
import { Layout, Menu, Icon } from 'antd';
import { withRouter } from 'react-router';
import styles from './style/index.scss';
import MenuList from "../../common/MenuList";
const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;


/***
 * 入口壳
 */
class App extends React.Component {

    constructor(props) {
        super(props);
        window.app = this;
        window.app.router = {history: this.props.history, location: this.props.location, match: this.props.match};

        this.state = {
            collapsed: false,//折叠
        }
    }
    componentDidMount() {
        console.log('aaa',this.router);
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
                    <div className={styles.logo}/>
                    <MenuList />
                </Sider>
                <Layout>
                    <Header style={{background: '#fff', padding: 0}}>
                        <Icon
                            className={styles.trigger}
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
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

