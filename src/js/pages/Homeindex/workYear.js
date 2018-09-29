import React from 'react'
import {Chart, Geom, Axis, Tooltip, Coord, Label, Legend} from 'bizcharts';
import {DataSet} from '@antv/data-set';
import styles from "./style/module.scss";

/**
 * 工作年限分布
 */

const {DataView} = DataSet;
const data = [
    {item: '0-2年', count: 48},
    {item: '3-5年', count: 21},
    {item: '6-8年', count: 17},
    {item: '9-12年', count: 13}
];
const dv = new DataView();
dv.source(data).transform({
    type: 'percent',
    field: 'count',
    dimension: 'item',
    as: 'percent'
});
const cols = {
    percent: {
        formatter: val => {
            val = (val * 100).toFixed(2) + '%';
            return val;
        }
    }
}
export default class WorkYear extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.workyear}>
                <div className={styles.title}>
                    <p>工作年限分布</p>
                </div>
                <div className={styles.chartbox}>
                    <Chart height={200} data={dv} scale={cols} padding={[20, 70, 50, 50]} forceFit>
                        <Coord type='theta' radius={1}/>
                        <Axis name="percent"/>
                        <Legend position='bottom'/>
                        <Tooltip
                            showTitle={false}
                            itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
                        />
                        <Geom
                            type="intervalStack"
                            position="percent"
                            color={['item', ['#5C9BD1', '#97D251', '#F27D37', '#FACC14']]}
                            tooltip={['item*percent', (item, percent) => {
                                percent = (percent * 100).toFixed(2) + '%';
                                return {
                                    name: item,
                                    value: percent
                                };
                            }]}
                            style={{lineWidth: 1, stroke: '#fff'}}
                        >
                            <Label content='percent' offset={-30} textStyle={{
                                rotate: 0,
                                textAlign: 'center',
                                shadowBlur: 2,
                                shadowColor: 'rgba(0, 0, 0, .45)'
                            }}/>
                        </Geom>
                    </Chart>
                </div>
            </div>

        );
    }
}