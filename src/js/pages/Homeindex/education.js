import React from 'react'
import {Pie} from 'ant-design-pro/lib/Charts';
import 'ant-design-pro/dist/ant-design-pro.css';
import styles from "./style/module.scss";

/**
 * 学校分布
 */
const salesPieData = [
    {
        x: '本科',
        y: 41,
    },
    {
        x: '硕士',
        y: 11,
    },
    {
        x: '博士',
        y: 9,
    },
    {
        x: '专科',
        y: 22,
    },
    {
        x: '其他',
        y: 12,
    },
];
export default class Education extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.education}>
                <div className={styles.title}>
                    <p>学历分布</p>
                </div>

                <div className={styles.chartbox}>
                    <Pie
                        hasLegend
                        data={salesPieData}
                        valueFormat={val => <span dangerouslySetInnerHTML={{__html: val + '个'}}/>}
                        height={160}
                    />
                </div>
            </div>

        );
    }
}