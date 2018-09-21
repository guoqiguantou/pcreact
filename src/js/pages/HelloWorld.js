import React, { Component } from 'react'
import Map from './Map'


/**
 * 地图
 */
class HelloWorld extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
             <Map/>
        );
    }
}


export default HelloWorld;