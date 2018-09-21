import React from 'react';
import { Table, Button, Popconfirm, Input, Icon, message, notification } from 'antd';
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import EditableCell from "../EditableCell";
import PropTypes from "prop-types";
import ajaxUtil from "../../../utils/ajaxUtil";
import FilterInput from "./filterInput";
import FilterDatePicker from "./FilterDatePicker";

const propTypes = {
    /**
     * table body 数据源
     * 例：
     *      [{
                key: '0',
                name: 'Edward King 0',
                age: '32',
                address: 'London, Park Lane no. 0',
            }, {
                key: '1',
                name: 'Edward King 1',
                age: '32',
                address: 'London, Park Lane no. 1',
            }],
     */
    dataUrl: PropTypes.string.isRequired,
    /**
     * table head 数据源
     * 例：
     *      [{
                name: 'name',
                width: '30%',
                editable: true,
            }, {
                name: 'age',
                editable: false,
            }, {
                name: 'address',
                editable: true,
            }],
     */
    columnsArr: PropTypes.array.isRequired,
    /**
     * 添加按钮是否显示
     */
    showAdd: PropTypes.bool,
    /**
     * 行是否可选
     */
    checkable: PropTypes.bool,
    /**
     * 行选择器类型："checkbox","radio"
     */
    checkType: PropTypes.string,
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
    /**
     * 修改页面
     */
    editPage: PropTypes.func,
    /**
     * 详细页面
     */
    detailPage: PropTypes.func,
    /**
     * 新增页面
     */
    addPage: PropTypes.func,
    /**
     * 将数据传递回父组件
     */
    getTableLoadData: PropTypes.func,
    /**
     * 表格头部按钮自定义
     */
    headerBtns: PropTypes.array,

};

const defaultProps = {
    showAdd: false,
    checkable: false,
    checkType: "checkbox",
    listVarName: 'list',
    successVarName: 'success',
    messageVarName: "message",
    totalVarName: 'total',
    pagesizeVarName: 'pagesize',
    identVarName: "id",
};

export default class EditableTable extends React.Component {
    constructor(props) {
        super(props);

        this.dataUrl = props.dataUrl;
        this.dataList = [];
        this.columnsArr = props.columnsArr;//JSON.parse(props.headUrl);

        this.colDataToField = {};
        this.columnsArr.forEach((i, index) => {
            this.colDataToField[i.dataIndex] = i.fieldName;
        });

        this.drawerParams = {};

        this.pagination = {};

        this.state = {
            dataSource: this.dataList,
            columnsArr: this.columnsArr,
            count: 2,
            lineKey: null,
            open: false,
            selectedRowKeys: [],
            filterDropdownVisible: false,
            searchVal: {},
            filtered: false,
            pagination: {},
        };

    }

    componentDidMount() {
        this.loadData();
    };

    componentWillUpdate() {
    };

    /**
     * 查询
     * {
            page: 1
            sort: '[{"property":"name","direction":"ASC"},{"property":"id","direction":"asc"}]',
            filter: '[{"operator":"like","value":"a","property":"key"}]'
        }
     */
    view = (callback, params) => {
        ajaxUtil.get(`${__apiRoot}${this.dataUrl}/view`, params, (err, res) => {
            callback(err, res);
        })
    };

    /**
     * 删除
     * @param callback func 回调
     * @param ids array 需要删除的数据id数组
     * 单条：{id: 6}
     * 多条：[{id: 12}, {id: 14}]
     */
    delete = (callback, ids) => {
        let params = [];
        ids.forEach((i) => {
            params.push({
                id: i
            });
        });
        ajaxUtil.post(`${__apiRoot}${this.dataUrl}/destroy`, params, (err, res) => {
            callback(err, res, ids);
        }, 'json');
    };

    /**
     * 更新
     * {
            id: 73,
            key: "737373",
            name: "update"
        }
     */
    update = (callback, params, dataIndex) => {
        ajaxUtil.post(`${__apiRoot}${this.dataUrl}/update`, params, (err, res) => {
            callback(err, res, params, dataIndex);
        }, 'json');
    };

    openNotification = (msg, title = "通知", timeout = 3, icon = null, style = {}, placement = "bottomRight") => {
        notification.config({
            placement: placement,
        });
        notification.open({
            duration: timeout,
            message: title,
            description: msg,
            icon: icon,
            style: style,
        });
    };

    loadData(param = {page: this.pagination.current, appid: 11}) {
        this.view(this.onLoadData, param);
        //console.log("param",param)
    }

    onLoadData = (err, res) => {
        if (err) {
            this.openNotification(err.response, "发生错误！", 3, <Icon type="close-circle" style={{color: "red"}}/>);
        }
        else {
            console.log("onLoadData", res.body);
            this.dataList = res.body[this.props.listVarName];
            if (this.props.getTableLoadData != null)
                this.props.getTableLoadData(res.body);

            const {pagination} = this.state;
            pagination.total = res.body[this.props.totalVarName];
            pagination.pageSize = res.body[this.props.pagesizeVarName];
            this.setState({
                dataSource: this.dataList,
                pagination,
            });
        }
    };

    /**
     * 点击下拉选择菜单触发的回调事件
     * @param url string 事件请求的url
     * @param selectionKeys array 选中的checkbox或radio的key集合
     * @param menuKey string 点击的下拉菜单的key
     * @param postType
     */
    selectMenuCallback = (url, selectionKeys, menuKey, postType = "json") => {
        ajaxUtil.post(url, {
            menu: menuKey, selection: selectionKeys
        }, (err, res) => {
            if (!err) {
                console.log(res.body);
            }
        }, true, postType)
    };

    onCellChange = (key, col) => {
        const dataIndex = col.dataIndex;
        const fieldName = col.fieldName;

        return (value) => {

            let param = {};
            param[this.props.identVarName] = key;
            param[fieldName] = value;

            this.update(this.onCellChangeResponse, param, dataIndex);

            // const dataSource = [...this.state.dataSource];
            // const target = dataSource.find(item => item[this.props.identVarName] === key);
            // if (target) {
            //     target[dataIndex] = value;
            //     this.setState({dataSource});
            // }
        };
    };

    onCellChangeResponse = (err = null, res, param, dataIndex) => {
        if (err) {
            this.openNotification(err.response, "发生错误！", 3, <Icon type="close-circle" style={{color: "red"}}/>);
        }
        else {
            const dataSource = this.dataList;
            const target = dataSource.find(item => item[this.props.identVarName] === param[this.props.identVarName]);
            if (target) {
                target[dataIndex] = param[this.colDataToField[dataIndex]];
                this.setState({dataSource});
            }
            this.openNotification("更新成功", "通知", 3, <Icon type="check-circle" style={{color: "LightGreen"}}/>);
        }
    };

    onDelete = (ids) => {
        this.delete(this.onDeleteResponse, ids);
    };

    onDeleteResponse = (err = null, res, ids) => {
        if (err) {
            this.openNotification(err.response, "发生错误！", 3, <Icon type="close-circle" style={{color: "red"}}/>);
        }
        else {
            this.dataList = this.dataList.filter(item => ids.indexOf(item[this.props.identVarName]) === -1);
            const dataSource = this.dataList;
            this.setState({
                dataSource: dataSource
            });
            this.openNotification("删除成功", "通知", 3, <Icon type="check-circle" style={{color: "LightGreen"}}/>);
        }
    };

    handleAdd = () => {
        const {count, dataSource} = this.state;
        const newData = {
            key: count,
            name: `Edward King ${count}`,
            age: 32,
            address: `London, Park Lane no. ${count}`,
        };
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        });
    };

    /**
     * 添加功能回调
     * @param res 接口响应返回的数据
     * @param addObj 添加页面添加的数据
     */
    onAddResponse = (err = null, res, addObj) => {
        if (err) {
            this.openNotification(err.response, "发生错误！", 3, <Icon type="close-circle" style={{color: "red"}}/>);
            //this.errorAlert("发生错误：" + err.response);
        }
        else {
            this.openNotification("添加成功", "通知", 3, <Icon type="check-circle" style={{color: "LightGreen"}}/>);
            //this.successAlert("添加成功");
            this.dataList.unshift(addObj);
            this.setState({
                dataSource: this.dataList,
            });
            this.closeDrawer();
        }
    };

    /**
     * 表格操作功能 按钮弹出的抽屉
     * @param params 传递给抽屉的参数
     */
    onDrawer = (params, page = null) => {
        this.DrawerPage = page;
        this.handleToggle(params);
    };

    /**
     * 抽屉打开事件，同时将传给抽屉的值写入当前类的全局变量
     * @param params
     */
    handleToggle = (params = {}) => {
        this.drawerParams = params;
        this.setState({
            open: !this.state.open,
        })
    };

    /**
     * 用于传递给抽屉内的页面，使抽屉内的页面可以关闭当前抽屉
     */
    closeDrawer = () => {
        this.setState({
            open: false,
        })
    };

    onSelectChange = (selectedRowKeys) => {
        this.setState({selectedRowKeys});
    };

    /**
     * 自定义搜索Input组件值改变事件
     * @param e input onChange事件上下文
     * @param dataIndex 操作的列标识
     */
    onInputValueChange = (e, dataIndex) => {
        let {searchVal} = this.state;
        searchVal[dataIndex] = [
            e.target.value,
        ];
        //this.setState({searchVal: e.target.value});
        this.setState({searchVal});
    };

    /**
     * 自定义搜索Date组件值改变事件
     * @param value array 当前选择的时间对象
     * @param dateString array 当前选择的时间(已格式化)
     * @param dataIndex 操作的列标识
     */
    onDateValueChange = (value, dateString, dataIndex) => {
        let {searchVal} = this.state;
        let timestampArr = [];
        timestampArr = value.map((i, index) => {
            return i.valueOf();
        });
        searchVal[dataIndex] = timestampArr;
        this.setState({searchVal});
    };

    onSearch = () => {
        const {searchVal, filterDropdownVisible, pagination} = this.state;

        for (let index in filterDropdownVisible) {
            if (filterDropdownVisible[index])
                filterDropdownVisible[index] = false;
        }
        this.setState({
            filterDropdownVisible,
        });

        let filterGetList = this.filterMerge();
        console.log("onSearchfilterGetList", filterGetList);
        const filterGetParam = JSON.stringify(filterGetList);
        const sortGetParam = JSON.stringify(this.sortGetList == null ? [] : this.sortGetList);

        pagination.current = 1;
        this.setState({pagination});

        let param = {
            appid: 11,
            sort: sortGetParam,
            filter: filterGetParam,
            page: 1,//pagination.current == null ? 1 : pagination.current,
        };

        this.loadData(param);
    };

    onFilterDropdownVisibleChange = (visible, col) => {
        let filterDropdownVisible = {};
        filterDropdownVisible[col.dataIndex] = visible;
        this.setState({
            filterDropdownVisible,
        }, () => this.filterEle[col.dataIndex].callbackAfterShow());
    };

    handleTableChange = (pagination, filters, sorter) => {
        //console.log("pagination", pagination);
        //console.log("filters", filters);
        //console.log("sorter", sorter);
        //console.log("this.colDataToField", this.colDataToField);

        const {searchVal} = this.state;

        const pager = {...this.state.pagination};
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.pagination = pager;

        this.changeFilters = filters;
        this.changeSorter = sorter;

        let filterGetList = this.filterMerge();
        console.log("filterGetList", filterGetList);

        const filterGetParam = JSON.stringify(filterGetList);

        let sortGetList = [];
        if (sorter.column) {
            sortGetList.push({
                property: sorter.column.fieldName,
                direction: sorter.order === "descend" ? "desc" : "asc",
            });
        }
        this.sortGetList = sortGetList;
        const sortGetParam = JSON.stringify(sortGetList);

        let param = {
            appid: 11,
            sort: sortGetParam,
            filter: filterGetParam,
            page: pager.current,
        };

        this.loadData(param);
    };

    filterMerge = (searchVal = this.state.searchVal, filters = this.changeFilters) => {
        let filterGetList = [];
        for (let index in filters) {
            filters[index].forEach((i, filtersIndex) => {
                filterGetList.push({
                    operator: "like",
                    value: i,
                    property: this.colDataToField[index],
                });
            });
        }

        console.log("searchVal", searchVal);
        if (searchVal != {}) {
            for (let index in searchVal) {
                if (searchVal[index].length > 1) {
                    //console.log(index,searchVal[index].length);
                    searchVal[index].forEach((i, dateIndex) => {
                            if (dateIndex === 0) {
                                if (i !== "") {
                                    filterGetList.push({
                                        operator: "gt",
                                        value: i,
                                        property: index,
                                    });
                                }
                            }
                            else {
                                if (i !== "") {
                                    filterGetList.push({
                                        operator: "lt",
                                        value: i,
                                        property: index,
                                    });
                                }
                            }
                        }
                    )
                }
                else {
                    if (searchVal[index][0] !== "") {
                        filterGetList.push({
                            operator: "like",
                            value: searchVal[index][0],
                            property: index,
                        });
                    }
                }
            }
        }
        return filterGetList;
    };

    /**
     * 拼接表头对象
     * @param columns
     * @returns {*}
     */
    returnColumnsArr = (columns) => {
        this.state.columnsArr.forEach(
            (i, index) => {
                if (i.type === "operation") {
                    let operation = {
                        ...i,
                        render: (text, record) => {
                            let btns = i.btns.map((btn, btnIndex) => {
                                return btn.cmp(record, this.props, btnIndex + "_" + btn.title);
                            });
                            return (
                                //this.state.dataSource.length > 1 ? (
                                <div>
                                    {btns}
                                </div>
                                //) : null
                            );
                        }
                    };
                    columns.push(operation);
                }
                else {
                    let obj = {...i};
                    obj.fieldName = i.fieldName == null ? i.dataIndex : i.fieldName;
                    if (i.editable === true) {
                        obj.render = (text, record) => (
                            <EditableCell
                                value={text}
                                onChange={this.onCellChange(record[this.props.identVarName], i)}
                            />
                        );
                    }
                    if (i.filterable) {
                        this.filterEle = {};

                        if (i.filterCustom) {
                            let FilterDropdowns = null;
                            switch (i.filterType) {
                                case "date":
                                    FilterDropdowns = (
                                        <FilterDatePicker
                                            ref={ele => this.filterEle[i.dataIndex] = ele}
                                            searchVal={this.state.searchVal}
                                            onValueChange={(value, dateString) => this.onDateValueChange(value, dateString, i.dataIndex)}
                                            onOk={this.onSearch}
                                        />
                                    );
                                    break;
                                case "input":
                                    FilterDropdowns = (
                                        <FilterInput
                                            ref={ele => this.filterEle[i.dataIndex] = ele}
                                            searchVal={this.state.searchVal[i.dataIndex]}
                                            onValueChange={(e) => this.onInputValueChange(e, i.dataIndex)}
                                            onSearch={this.onSearch}
                                        />
                                    );
                                    break;
                            }
                            obj.filterDropdown = FilterDropdowns;
                            obj.filterIcon =
                                <Icon type="filter" style={{color: this.state.filtered ? '#108ee9' : '#aaa'}}/>;
                            obj.filterDropdownVisible = this.state.filterDropdownVisible[i.dataIndex];
                            obj.onFilterDropdownVisibleChange = (visible) => this.onFilterDropdownVisibleChange(visible, i);
                        }
                        else {
                            obj.filters = i.filterList;
                        }
                    }
                    columns.push(obj);
                }
            }
        );

        this.columns = columns;

        return columns;
    };

    headerBtns = this.props.headerBtns && this.props.headerBtns.map((i, index) => {
        return i.cmp();
    });


    render() {
        const {dataSource, selectedRowKeys} = this.state;
        const {headerBtns} = this.props;
        const drawerParam = this.drawerParams;

        let columns = [];
        columns = this.returnColumnsArr(columns);

        const rowSelection = this.props.checkable ? {
            selectedRowKeys,
            onChange: this.onSelectChange,
            hideDefaultSelections: true,
            type: this.props.checkType,
            selections: [{
                key: 'invert',
                text: '反选',
                onSelect: (changableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                        if (this.state.selectedRowKeys.indexOf(key) !== -1) {
                            return false;
                        }
                        return true;
                    });
                    this.setState({selectedRowKeys: newSelectedRowKeys});
                },
            }, {
                key: 'delete',
                text: '删除',
                onSelect: (changableRowKeys) => {
                    //this.selectMenuCallback();

                    this.delete(this.onDeleteResponse, this.state.selectedRowKeys);
                    //this.setState({dataSource: dataSource.filter(item => selectedRowKeys.indexOf(item.key) === -1)});
                    this.setState({
                        selectedRowKeys: []
                    });
                },
            }],
            onSelection: this.onSelection,
        } : null;


        return (
            <div>
                {
                    //添加按钮
                    headerBtns ? (
                        <div style={{padding: "0 12px 12px 12px"}}>
                            {this.headerBtns}
                        </div>
                    ) : null
                }
                <Table
                    ref={ele => this.table = ele}
                    columns={columns}
                    rowKey={"id"}
                    pagination={this.state.pagination}
                    rowSelection={rowSelection}
                    dataSource={dataSource}
                    onChange={this.handleTableChange}
                    title={this.props.title}
                    footer={this.props.footer}
                    locale={{
                        filterTitle: '筛选',
                        filterConfirm: '确定',
                        filterReset: '重置',
                        emptyText: '暂无数据',
                    }}
                />
                <MuiThemeProvider>
                    <Drawer docked={false} width={"50%"} openSecondary={true} open={this.state.open} onRequestChange={(open) => this.setState({open})}>
                        {this.state.open &&
                        <div style={{height: "100%"}}>
                            {this.DrawerPage &&
                            <this.DrawerPage param={drawerParam} closeDrawer={() => this.closeDrawer()} onAddResponse={this.onAddResponse}/>}
                        </div>
                        }
                    </Drawer>
                </MuiThemeProvider>
            </div>
        );
    }
}


EditableTable.propTypes = propTypes;
EditableTable.defaultProps = defaultProps;