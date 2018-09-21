import React from 'react';
import { Button, Input } from 'antd';
import filterStyle from "./style/filterInputStyle.scss";
import PropTypes from "prop-types";

const propTypes = {
    /**
     *搜索文本
     */
    searchVal: PropTypes.any,
    /**
     *值改变事件
     */
    onValueChange: PropTypes.func.isRequired,
    /**
     *搜索事件
     */
    onSearch: PropTypes.func.isRequired,
};

export default class filterInput extends React.Component {

    callbackAfterShow = () => {
        this.searchInput && this.searchInput.focus();
    };

    render() {

        return (
            <div className={filterStyle["custom-filter-dropdown"]}>
                <Input
                    ref={ele => this.searchInput = ele}
                    placeholder="搜索内容"
                    value={this.props.searchVal}
                    onChange={this.props.onValueChange}
                    onPressEnter={this.props.onSearch}
                />
                <Button type="primary" onClick={this.props.onSearch}>搜索</Button>
            </div>
        );
    }
}

filterInput.propTypes = propTypes;