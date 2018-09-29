import React from 'react'
import {Bar} from 'ant-design-pro/lib/Charts';
import styles from "./style/module.scss";

/**
 * 学校分布
 */

const salesData = [
    {
        x: '上海交通大学',
        y: 5
    }, {
        x: '上海大学',
        y: 3
    }, {
        x: '中国人民大学',
        y: 5
    }, {
        x: '复旦大学',
        y: 5
    }, {
        x: '上海大学2',
        y: 3
    }, {
        x: '中国人民大学2',
        y: 5
    }, {
        x: '复旦大学2',
        y: 5
    }
];

export default class School extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.school}>
                <div className={styles.title}>
                    <p>学校分布</p>
                </div>

                <div className={styles.chartbox}>
                    <Bar
                        height={200}
                        data={salesData}
                    />
                </div>
            </div>

        );
    }
}