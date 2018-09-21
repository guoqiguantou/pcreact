import React from 'react';
import {Link} from "react-router-dom";
import {Menu, Icon} from 'antd';
import ajaxUtil from "../../../utils/ajaxUtil";
import PropTypes from "prop-types";
import EditableTable from "../EditableTable";

const SubMenu = Menu.SubMenu;


const dataUrl = '/User/Manager/Menu';

const propTypes = {
    /**
     * 列表在JSON数据里的名称
     */
    listVarName: PropTypes.string,
    /**
     * 是否成功在JSON数据里的名称
     */
    successVarName: PropTypes.string,
    /**
     * 失败信息在JSON数据里的名称
     */
    messageVarName: PropTypes.string,
    /**
     * 总数量在JSON数据里的名称
     */
    totalVarName: PropTypes.string,
    /**
     * 每页显示数量在JSON数据里的名称
     */
    pagesizeVarName: PropTypes.string,
    /**
     * 行标识在JSON数据里的名称
     */
    identVarName: PropTypes.string,

};

const defaultProps = {
    listVarName: 'list',
    successVarName: 'success',
    messageVarName: "message",
    totalVarName: 'total',
    pagesizeVarName: 'pagesize',
    identVarName: "id",
};

/***
 * ajax测试组件
 */
export default class index extends React.Component {

    constructor(props) {
        super(props);

        this.dataList = null;
        //this.menuDataList = [];
        this.menuList = [];
        this.openKeys = [];
        this.rootID = null;

        this.state = {
            dataSource: null,
            menuDataList: null,
            menuList: null,
        };
    }

    loadData = (params) => {
        // ajaxUtil.get(`${__apiRoot}${dataUrl}/view`, params, (err, res) => {
        //     if(!err) {
        //         if(res.body[this.props.successVarName] == null) {
        //             this.dataList = res.body[this.props.listVarName];
        //             let root = this.dataList.find((i) => (i.mainid == null));
        //             this.rootID = root.id;
        //             this.dataList = this.dataList.filter((i) => (i.mainid != null));
        //             if (res.body[this.props.successVarName]) {
        //                 this.setState({
        //                     dataSource: this.dataList,
        //                 });
        //             }
        //             //console.log('this.dataList', this.dataList);
        //             let menuDataList = this.getMenuList();
        //             this.setState({
        //                 menuDataList,
        //             });
        //         }
        //     }
        // })
    };

    componentDidMount() {
        // let params = {
        //     appid: 11,
        //  };
        //this.loadData(params);

       console.log('bbb',window.app.props.match.path);
    }

    getMenuList = (menuDataList = []) => {
        let mainID = this.rootID;
        if (menuDataList.length === 0) {
            menuDataList = this.dataList.filter((i) => (i.mainid === mainID));
        }

        menuDataList.forEach((i) => {
            let arr = this.dataList.filter((o) => (o.mainid === i.id));
            if (arr.length > 0) {
                i.isparent = true;
                i.son = arr;
                this.openKeys.push(i.id);
                // this.menuList.push(
                //     <SubMenu
                //         key={i.id}
                //         title={<span><Icon type="user"/><span>{i.name}</span></span>}
                //     >
                //         );
                this.getMenuList(i.son);
                //         this.menuList.push(
                //     </SubMenu>
                // );
            }
            else {
                i.isparent = false;
                // this.menuList.push(
                //     <Menu.Item key={i.id}>
                //         <Link to={"/"}>
                //             <Icon type="pie-chart"/>
                //             <span>{i.name}</span>
                //         </Link>
                //     </Menu.Item>
                // );
                return;
            }
        });
        return menuDataList;
    };

    getMenu = (arr = this.state.menuDataList) => {
        return arr.map((i, index) => {
            if (i.isparent) {
                return (
                    <SubMenu
                        key={i.id}
                        title={<span><Icon type="user"/><span>{i.name}</span></span>}
                    >
                        {/*<Link to={"/ajaxtest"}>*/}
                        {this.getMenu(i.son)}
                        {/*</Link>*/}
                    </SubMenu>
                );
            }
            else {
                return (
                    <Menu.Item key={i.id}>
                        <Link to={i.url}>
                            <Icon type="pie-chart"/>
                            <span>{i.name}</span>
                        </Link>
                    </Menu.Item>
                );
            }
        });
    };

    render() {

        return (

            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                inlineCollapsed={this.state.collapsed}
            >

                {/*<Menu*/}
                {/*theme="dark"*/}
                {/*mode="inline"*/}
                {/*defaultSelectedKeys={[]}*/}
                {/*defaultOpenKeys={this.openKeys}*/}
                {/*>*/}
                {/*{this.state.menuDataList && this.getMenu()}*/}
                {/*</Menu>*/}


                <Menu.Item key="1">
                   <Link to={`${window.app.props.match.path}/a`}>
                    <Icon type="pie-chart"/>
                    <span>Option 1</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to={`${window.app.props.match.path}/b`}>
                    <Icon type="desktop"/>
                    <span>Option 2</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Icon type="inbox"/>
                    <span>Option 3</span>
                </Menu.Item>
                <SubMenu key="sub1" title={<span><Icon type="mail"/><span>Navigation One</span></span>}>
                    <Menu.Item key="5">Option 5</Menu.Item>
                    <Menu.Item key="6">Option 6</Menu.Item>
                    <Menu.Item key="7">Option 7</Menu.Item>
                    <Menu.Item key="8">Option 8</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={<span><Icon type="appstore"/><span>Navigation Two</span></span>}>
                    <Menu.Item key="9">Option 9</Menu.Item>
                    <Menu.Item key="10">Option 10</Menu.Item>
                    <SubMenu key="sub3" title="Submenu">
                        <Menu.Item key="11">Option 11</Menu.Item>
                        <Menu.Item key="12">Option 12</Menu.Item>
                    </SubMenu>
                </SubMenu>


            </Menu>
        )
    }
}

index.propTypes = propTypes;
index.defaultProps = defaultProps;