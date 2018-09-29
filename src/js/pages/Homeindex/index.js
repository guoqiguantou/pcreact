import React from 'react'
import {Row, Col} from 'antd';
import School from './school'
import Education from './education'
import WorkYear from './workYear'
import TalentRadar from './talentRadar'
import TalentEntry from './talentEntry'
import InfoNotice from './infoNotice'
import Cardwarp from './cardwarp'
import styles from "./style/index.scss";

/**
 * 人才管理系统
 */
export default class Homeindex extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.warp}>
                {/*菜单开始*/}
                <div className={styles.menu}>
                    <Row gutter={{xs: 8, sm: 16, md: 24}}>
                        <Col span={6}>
                            <div className={styles.menubox} style={{backgroundColor: '#7BC9A2'}}>
                                <div className={styles.menuboxcon}>
                                    <div className={styles.menuboxleft}>
                                        <img src={require('images/query.png')} alt=""/>
                                    </div>
                                    <div className={styles.menuboxright}>
                                        <h3>综合信息查询</h3>
                                        <p>information query</p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div className={styles.menubox} style={{backgroundColor: '#DF604F'}}>
                                <div className={styles.menuboxcon}>
                                    <div className={styles.menuboxleft}>
                                        <img src={require('images/shuju.png')} alt=""/>
                                    </div>
                                    <div className={styles.menuboxright}>
                                        <h3>数据预测</h3>
                                        <p>Data prediction</p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div className={styles.menubox} style={{backgroundColor: '#72CAE0'}}>
                                <div className={styles.menuboxcon}>
                                    <div className={styles.menuboxleft}>
                                        <img src={require('images/wenku.png')} alt=""/>
                                    </div>
                                    <div className={styles.menuboxright}>
                                        <h3>搜索文库</h3>
                                        <p>Search Library</p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div className={styles.menubox} style={{backgroundColor: '#2F405C'}}>
                                <div className={styles.menuboxcon}>
                                    <div className={styles.menuboxleft}>
                                        <img src={require('images/rencai.png')} alt=""/>
                                    </div>
                                    <div className={styles.menuboxright}>
                                        <h3>人才盘点</h3>
                                        <p>Talent inventory</p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                {/*菜单结束*/}
                <div className={styles.box}>
                    <Row gutter={{xs: 8, sm: 16, md: 24}}>
                        <Col span={18}>
                            <div className={styles.boxcon}>
                                <Cardwarp title='人才盘点' type='left'>
                                    <Row gutter={{xs: 8, sm: 16, md: 24}}>
                                        <Col className={styles.bodyrow} span={8}>
                                            <div className={styles.bodybox}>
                                                <School/>
                                            </div>
                                        </Col>
                                        <Col className={styles.bodyrow} span={8}>
                                            <div className={styles.bodybox}>
                                                <Education/>
                                            </div>
                                        </Col>
                                        <Col className={styles.bodyrow} span={8}>
                                            <div className={styles.bodybox}>
                                                <WorkYear/>
                                            </div>
                                        </Col>
                                    </Row>
                                </Cardwarp>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div className={styles.boxcon}>
                                <Cardwarp title='信息公告' type='right'>
                                    <InfoNotice/>
                                </Cardwarp>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className={styles.box} style={{marginBottom:'0px'}}>
                    <Row gutter={{xs: 8, sm: 16, md: 24}}>
                        <Col span={18}>
                            <div className={styles.boxcon}>
                                <Cardwarp title='人才入库统计' type='left'>
                                    <TalentEntry/>
                                </Cardwarp>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div className={styles.boxcon}>
                                <Cardwarp title='人才雷达图' type='right'>
                                    <TalentRadar/>
                                </Cardwarp>
                            </div>
                        </Col>
                    </Row>

                </div>
            </div>
        );
    }
}