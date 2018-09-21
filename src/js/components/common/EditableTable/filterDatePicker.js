import React from 'react';
import { DatePicker } from 'antd';
import CalendarLocale from 'rc-calendar/lib/locale/zh_CN';
import PropTypes from "prop-types";

import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const propTypes = {
    /**
     *搜索值
     */
    searchVal: PropTypes.any,
    /**
     *时间改变事件
     */
    onValueChange: PropTypes.func.isRequired,
    /**
     *时间选择事件
     */
    onOk: PropTypes.func.isRequired,
};

const { RangePicker } = DatePicker;

export default class filterDatePicker extends React.Component {

    constructor(props){
        super(props);

        this.dateString = [];
    }

    callbackAfterShow = () => {
        //this.searchInput && this.searchInput.focus();
    };

    render() {
        const {onOk, onValueChange} = this.props;
        const locale = {
            lang: {
                placeholder: '请选择日期',
                rangePlaceholder: ['开始日期', '结束日期'],
                ...CalendarLocale,
            },
        };

        return (
            <div>
                <RangePicker
                    autoFocus={true}
                    showTime={{ format: 'HH:mm:ss' }}
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder={['开始时间', '结束时间']}
                    onChange={onValueChange}
                    onOk={onOk}
                    locale={locale}
                />
            </div>
        );
    }
}

filterDatePicker.propTypes = propTypes;