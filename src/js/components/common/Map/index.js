import React, {Component} from 'react'
import '../../../../plugin/map'
import styles from './style/index.scss'

/**
 * 腾讯地图
 */

let latLng_lng, latLng_lat, _self;
let chushihua = [];
let directions_routes, geolocation,
    directions_placemarks = [],
    directions_labels = [],
    start_marker,
    end_marker,
    route_lines = [],
    step_line,
    route_steps = [];

class Map extends Component {
    constructor(props) {
        super(props);
        _self = this;
    }

    componentDidMount() {
        this.init();
    }

    getCurLocation() {
        geolocation.getLocation(this.showPosition, showErr, options);
    }

    //获取当前位置
    showPosition(position) {
        chushihua = [position.lat, position.lng]
    };

    showErr() {
        positionNum++;
        document.getElementById("demo").innerHTML += "序号：" + positionNum;
        document.getElementById("demo").appendChild(document.createElement('p')).innerHTML = "定位失败！";
        document.getElementById("pos-area").scrollTop = document.getElementById("pos-area").scrollHeight;
    };

    init() {
        geolocation = new qq.maps.Geolocation();
        geolocation.getIpLocation(this.showPosition, this.showErr);
        //console.log('mapcon', this.mapCon);
        this.map = new qq.maps.Map(this.mapCon, {
            // 地图的中心地理坐标。
            center: new qq.maps.LatLng(31.669523, 118.520453)
        });
        this.map.zoomTo(13);
        let map = this.map;

        let shuzu = [new qq.maps.Marker({
            position: new qq.maps.LatLng(31.689523, 118.520453),
            map: map
        }), new qq.maps.Marker({
            position: new qq.maps.LatLng(31.679523, 118.520453),
            map: map
        }), new qq.maps.Marker({
            position: new qq.maps.LatLng(31.681434, 118.559008),
            map: map
        }), new qq.maps.Marker({
            position: new qq.maps.LatLng(31.680143, 118.493755),
            map: map
        }), new qq.maps.Marker({
            position: new qq.maps.LatLng(31.640925, 118.512296),
            map: map
        })]

        for (let gg = 0; gg < shuzu.length; gg++) {
            let anchor = new qq.maps.Point(1, 1),
                size = new qq.maps.Size(30, 31),
                origin = new qq.maps.Point(0, 0),
                markerIcon = new qq.maps.MarkerImage(
                    "../images/guohui.png",
                    size,
                    origin,
                    anchor
                );
            shuzu[gg].setIcon(markerIcon);
            let dizhi = ""
            qq.maps.event.addListener(shuzu[gg], 'click', function (event) {
                latLng_lat = event.latLng.lat;
                latLng_lng = event.latLng.lng;
                let geocoder = new qq.maps.Geocoder({
                    complete: function (result) {
                        dizhi = result.detail.addressComponents.city + result.detail.addressComponents.district + result.detail.addressComponents.street + result.detail.addressComponents.town;
                        console.log(dizhi)
                        tk()
                    }
                });

                let coord = new qq.maps.LatLng(event.latLng.lat, event.latLng.lng);
                geocoder.getAddress(coord);

                function tk() {
                    _self.info = new qq.maps.InfoWindow({
                        map: map
                    });
                    let info = _self.info;
                    info.close();
                    info.open();
                    qq.maps.event.addListener(info, 'domready', function () {
                        let btns = document.getElementsByClassName('goto-link');
                        for (let i = 0; i < btns.length; i++) {
                            let btn = btns[i];
                            //console.log('btn',btn);
                            btn.onclick = function () {
                                console.log('this', _self);
                                _self.goto();
                            }
                        }
                    });
                    info.setContent(`
                    <div class=${styles.wrap}>
                        <div class=${styles.wrapleft}>
                            <img src="./images/qnzj.png" alt="">
                        </div>
                        <div class=${styles.wrapright}>
                            <div class=${styles.wraprighttitle}>安徽省马鞍山市花山区香林路</div>
                            <div class=${styles.wraprightdizhi}>${ dizhi}</div>
                            <div class=${styles.wraprightlinajie}>
                                <div class=${styles.button}>
                                    <a href="https://www.baidu.com/?tn=02003390_10_hao_pg" target="_blank">查看详情</a>
                                </div>
                                <div class="goto-link ${styles.button}">去这里</div>
                            </div>
                        </div>
                    </div>
                    `);

                    info.setPosition(new qq.maps.LatLng(event.latLng.lat, event.latLng.lng));

                }


            });


        }
        this.initDirectionsService();
        this.calcRoute();
    }

    initDirectionsService() {
        let map = this.map;
        this.directionsService = new qq.maps.DrivingService({
            complete: function (response) {
                let start = response.detail.start,
                    end = response.detail.end;

                let anchor = new qq.maps.Point(6, 6),
                    size = new qq.maps.Size(24, 36),
                    start_icon = new qq.maps.MarkerImage(
                        'images/busmarker.png',
                        size,
                        new qq.maps.Point(0, 0),
                        anchor
                    ),
                    end_icon = new qq.maps.MarkerImage(
                        'images/busmarker.png',
                        size,
                        new qq.maps.Point(24, 0),
                        anchor
                    );
                start_marker && start_marker.setMap(null);
                end_marker && end_marker.setMap(null);
                _self.clearOverlay(route_lines);

                start_marker = new qq.maps.Marker({
                    icon: start_icon,
                    position: start.latLng,
                    map: map,
                    zIndex: 1
                });
                end_marker = new qq.maps.Marker({
                    icon: end_icon,
                    position: end.latLng,
                    map: map,
                    zIndex: 1
                });
                directions_routes = response.detail.routes;
                let routes_desc = [];
                //所有可选路线方案
                for (let i = 0; i < directions_routes.length; i++) {
                    let route = directions_routes[i],
                        legs = route;
                    //调整地图窗口显示所有路线
                    map.fitBounds(response.detail.bounds);
                    //所有路程信息
                    //for(var j = 0 ; j < legs.length; j++){
                    let steps = legs.steps;
                    route_steps = steps;
                    let polyline = new qq.maps.Polyline({
                        path: route.path,
                        strokeColor: '#3893F9',
                        strokeWeight: 6,
                        map: map
                    })
                    route_lines.push(polyline);
                    //所有路段信息
                    for (let k = 0; k < steps.length; k++) {
                        let step = steps[k];
                        //路段途经地标
                        directions_placemarks.push(step.placemarks);
                        //转向
                        let turning = step.turning,
                            img_position;
                        ;
                        switch (turning.text) {
                            case '左转':
                                img_position = '0px 0px'
                                break;
                            case '右转':
                                img_position = '-19px 0px'
                                break;
                            case '直行':
                                img_position = '-38px 0px'
                                break;
                            case '偏左转':
                            case '靠左':
                                img_position = '-57px 0px'
                                break;
                            case '偏右转':
                            case '靠右':
                                img_position = '-76px 0px'
                                break;
                            case '左转调头':
                                img_position = '-95px 0px'
                                break;
                            default:
                                img_position = ''
                                break;
                        }
                        let turning_img = '&nbsp;&nbsp;<span' +
                            ' style="margin-bottom: -4px;' +
                            'display:inline-block;background:' +
                            'url(images/turning.png) no-repeat ' +
                            img_position + ';width:19px;height:' +
                            '19px"></span>&nbsp;';
                        let p_attributes = [
                            'onclick="renderStep(' + k + ')"',
                            'onmouseover=this.style.background="#eee"',
                            'onmouseout=this.style.background="#fff"',
                            'style="margin:5px 0px;cursor:pointer"'
                        ].join(' ');
                        routes_desc.push('<p ' + p_attributes + ' ><b>' + (k + 1) +
                            '.</b>' + turning_img + step.instructions);
                    }
                    //}
                }
                //方案文本描述
                let routes = document.getElementById('routes');
                routes.innerHTML = routes_desc.join('<br>');
            }
        });
    }

    //到这去
    goto() {
        document.getElementById("start").value = chushihua[0] + "," + chushihua[1];
        document.getElementById("end").value = latLng_lat + "," + latLng_lng;
        this.info.close();
        this.calcRoute()
    }

    //获取路线
    calcRoute() {
        let start_name = document.getElementById("start").value.split(",");
        let end_name = document.getElementById("end").value.split(",");
        let policy = document.getElementById("policy").value;
        route_steps = [];
        this.directionsService.setLocation("北京");
        this.directionsService.setPolicy(qq.maps.DrivingPolicy[policy]);
        this.directionsService.search(new qq.maps.LatLng(start_name[0], start_name[1]),
            new qq.maps.LatLng(end_name[0], end_name[1]));
    }

    //清除地图上的marker
    clearOverlay(overlays) {
        let overlay;
        while (overlay = overlays.pop()) {
            overlay.setMap(null);
        }
    }

    //
    renderStep(index) {
        let step = route_steps[index];
        step_line && step_line.setMap(null);
        step_line = new qq.maps.Polyline({
            path: step.path,
            strokeColor: '#ff0000',
            strokeWeight: 6,
            map: map
        })
    }

    //显示路段路标
    showP() {
        let showPlacemark = document.getElementById('sp');
        if (showPlacemark.checked) {
            for (let i = 0; i < directions_placemarks.length; i++) {
                let placemarks = directions_placemarks[i];
                for (let j = 0; j < placemarks.length; j++) {
                    let placemark = placemarks[j];
                    let label = new qq.maps.Label({
                        map: map,
                        position: placemark.latLng,
                        content: placemark.name
                    });
                    directions_labels.push(label);
                }
            }
        } else {
            clearOverlay(directions_labels);
        }
    }

    render() {
        return (
            <div className={styles.dituwarp}>
                <div style={{margin: '5px 0px', display: 'none'}}>
                    <b>起点: </b>
                    <input type="text" id="start" value="" onChange={this.calcRoute}/>
                    <b>终点: </b>
                    <input type="text" id="end" value="" onChange={this.calcRoute}/>
                    <b>计算策略：</b>
                    <select id="policy" onChange={this.calcRoute}>
                        <option value="LEAST_TIME">最少时间</option>
                        <option value="LEAST_DISTANCE">最短距离</option>
                        <option value="AVOID_HIGHWAYS">避开高速</option>
                        <option value="REAL_TRAFFIC">实时路况</option>
                        <option value="PREDICT_TRAFFIC">预测路况</option>
                    </select>
                    <label>
                        <input id="sp" type="checkbox" value='1' onClick={this.showP}/> 显示路段地标
                    </label>
                </div>
                <div id="container" ref={(el) => {
                    this.mapCon = el
                }} style={{width: '100%', height: '100%'}}></div>
                <div style={{width: '603px', display: 'none'}} id="routes"></div>
            </div>
        );
    }
}

export default Map;