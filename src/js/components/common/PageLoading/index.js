import React from 'react'
import styles from './style/index.scss'
import { Spin } from 'antd'

/***
 * 路由按需加载Loading
 */
export default function PageLoading(props) {
    if (props.isLoading) {
        if (props.timedOut) {
            return <div className={styles.loadCon}>页面加载超时!</div>;
        } else if (props.pastDelay) {
            return <div className={styles.loadCon}><Spin size="large" /></div>;
        } else {
            return null;
        }
    } else if (props.error) {
        return <div className={styles.loadCon}>错误! 页面加载失败！</div>;
    } else {
        return null;
    }
}