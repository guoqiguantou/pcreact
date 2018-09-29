import React from 'react'
import {Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape} from 'bizcharts';
import {Select} from 'antd';
import {DataSet} from '@antv/data-set';
import styles from "./style/module.scss";

/**
 * 人才雷达图
 */
const Option = Select.Option;
const {DataView} = DataSet;
const data = [
    {item: '沟通', '王芬': 70, '张三': 30},
    {item: '决策', '王芬': 60, '张三': 70},
    {item: '组织', '王芬': 50, '张三': 60},
    {item: '领导', '王芬': 40, '张三': 50},
    {item: '次要能力', '王芬': 60, '张三': 70},

];
const dv = new DataView().source(data);
dv.transform({
    type: 'fold',
    fields: ['王芬', '张三'], // 展开字段集
    key: 'user', // key字段
    value: 'score', // value字段
});

const cols = {
    score: {
        min: 0,
        max: 80
    }
}
export default class TalentRadar extends React.Component {
    handleChange = (value) => {
        console.log(`selected ${value}`);
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.talentradar}>
                <div className={styles.search}>
                    <Select
                        mode="multiple"
                        style={{width: '100%'}}
                        placeholder="请选择人员"
                        defaultValue={['wangfen', 'zhangsan']}
                        onChange={this.handleChange}
                    >
                        <Option value="wangfen">王芬</Option>
                        <Option value="zhangsan">张三</Option>
                        <Option value="sunyu">孙宇</Option>
                        <Option value="lisi">李四</Option>
                    </Select>
                </div>
                <div className={styles.chartbox}>
                    <Chart height={240} data={dv} padding={[50, 20, 50, 20]} scale={cols} forceFit>
                        <Coord type="polar" radius={0.9}/>
                        <Axis name="item" line={null} tickLine={null} grid={{
                            lineStyle: {
                                lineDash: null
                            },
                            hideFirstLine: false
                        }}/>
                        <Tooltip/>
                        <Axis name="score" line={null} tickLine={null} grid={{
                            type: 'polygon',
                            lineStyle: {
                                lineDash: null
                            },
                            alternateColor: 'rgba(0, 0, 0, 0.04)'
                        }}/>
                        <Legend name="user" marker="circle" offset={30}/>
                        <Geom type='area' position="item*score" color="user"/>
                        <Geom type='line' position="item*score" color="user" size={2}/>
                        <Geom type='point' position="item*score" color="user" shape="circle" size={4} style={{
                            stroke: '#fff',
                            lineWidth: 1,
                            fillOpacity: 1
                        }}/>
                    </Chart>
                </div>
            </div>

        );
    }
}