import React from 'react';
import {Link} from "react-router-dom";
import {Menu, Icon} from 'antd';
import ajaxUtil from "../../../utils/ajaxUtil";

const dataUrl = '/json/menu';
const SubMenu = Menu.SubMenu;

/***
 * Menu
 */
export default class index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mymenulist: null,
            openKeys:null,
        }

        this.openurl=window.app.router.match.path;///manager
        let surl=window.app.router.location.pathname.split('/');
        if(surl.length==5){
            this.openkey =[`${surl[2]}`,`${surl[3]}`] ;
            this.SelectedKey =surl[4];
        }else if(surl.length==4){
            this.openkey =[`${surl[2]}`];
            this.SelectedKey =surl[3];
        }else{
            this.openkey =[''];
            this.SelectedKey =surl[2];
        }


    }

    loadData = () => {
        this.setState({
            openKeys: [`${this.SelectedKey}`]
        })
        ajaxUtil.get(`${__apiRoot}${dataUrl}/view/2.json`, null, (err, res) => {
            if (!err) {
                this.setState({
                    mymenulist: res.body.list
                })

            }
        })
    };

    componentDidMount() {
        this.loadData();
    }

    render() {
        let {mymenulist} = this.state;
        let SelectedKeys=this.SelectedKey?this.SelectedKey:'index';
        let openkey=this.openkey;

        return (
            <div>
                {mymenulist&&
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={[`${SelectedKeys}`]}
                        defaultOpenKeys={openkey}

                    >
                        {
                        mymenulist.map((item, index) => {
                            if (item.children.length) {
                                return (
                                    <SubMenu
                                        key={item.openkey}
                                        title={<span><Icon type={item.icontype}/><span>{item.name}</span></span>}
                                    >
                                        {
                                            item.children.map((val, i) => {
                                                if (val.children.length) {
                                                    return (
                                                        <SubMenu key={val.openkey} title={val.name}>
                                                            {
                                                                val.children.map((ss, ii) => {
                                                                    return <Menu.Item key={ss.openkey} >
                                                                        <Link to={`${this.openurl}/${item.url}/${val.url}/${ss.url}`}>
                                                                            {ss.name}
                                                                        </Link>
                                                                    </Menu.Item>
                                                                })
                                                            }
                                                        </SubMenu>
                                                    )
                                                } else {
                                                    return (
                                                        <Menu.Item key={val.openkey}>
                                                            <Link to={`${this.openurl}/${item.url}/${val.url}`}>
                                                                {val.name}
                                                            </Link>
                                                        </Menu.Item>
                                                    )
                                                }
                                            })
                                        }
                                    </SubMenu>
                                )
                            } else {
                                return (
                                    <Menu.Item key={item.openkey}>
                                        <Link to={`${this.openurl}/${item.url}`}>
                                            <Icon type={item.icontype}/>
                                            <span>{item.name}</span>
                                        </Link>
                                    </Menu.Item>
                                )
                            }
                        })
                        }
                    </Menu>
                }

            </div>
        )
    }
}
