import React from 'react'
import {Chart, Axis, Geom, Tooltip, Legend} from 'bizcharts';
import {DataSet} from '@antv/data-set';
import styles from "./style/module.scss";

/**
 * 人才入库
 */
const data = [
    {
        name: '低端人才',
        '2017.03': 18,
        '2017.04': 62,
        '2017.05': 35,
        '2017.06': 19,
        '2017.07': 47,
        '2017.08': 32,
        '2017.09': 24,
        '2017.10': 36
    },
    {
        name: '中端人才',
        '2017.03': 32,
        '2017.04': 34,
        '2017.05': 54,
        '2017.06': 21,
        '2017.07': 53,
        '2017.08': 35,
        '2017.09': 37,
        '2017.10': 42
    },
    {
        name: '高端人才',
        '2017.03': 11,
        '2017.04': 9,
        '2017.05': 14,
        '2017.06': 32,
        '2017.07': 12,
        '2017.08': 17,
        '2017.09': 14,
        '2017.10': 11
    }
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
    type: 'fold',
    fields: ['2017.03', '2017.04', '2017.05', '2017.06', '2017.07', '2017.08', '2017.09', '2017.10'], // 展开字段集
    key: '月份', // key字段
    value: '入库量', // value字段
});
export default class TalentEntry extends React.Component {


    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.talententry}>
                <Chart height={280} data={dv} forceFit>
                    <Axis name="月份"/>
                    <Axis name="入库量"/>
                    <Legend/>
                    <Tooltip crosshairs={{type: "rect"}}/>
                    <Geom type='interval' position="月份*入库量" adjust={[{type: 'dodge', marginRatio: 1 / 24}]}
                          color={['name', ['#EF4B41', '#7BBECE', '#7BC9A2']]} size='20'/>
                </Chart>
            </div>

        );
    }
}
