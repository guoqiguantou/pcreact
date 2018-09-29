import React from 'react'
import PropTypes from "prop-types";
import styles from "./style/module.scss";
/**
 * cardwarp
 */
export default class Cardwarp extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        type: PropTypes.string,
        href:PropTypes.string,

    };
    static defaultProps = {
        title: '标题名字',
        type: 'left',
        href:'#',
    };
    constructor(props) {
        super(props);
    }
    render() {
        let morebtn;
        if (this.props.type == 'left') {
            morebtn = <a href={this.props.href} className={styles.morebtn}>更多>></a>;
        } else {
            morebtn = <a href={this.props.href} className={styles.morebtn} style={{border: 'none'}}>>></a>;
        }
        return (
            <div className={styles.boxwarp}>
                <div className={styles.boxwarpheader}>
                    <p>{this.props.title}</p>
                    {morebtn}
                </div>
                <div className={styles.boxwarpbody}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}