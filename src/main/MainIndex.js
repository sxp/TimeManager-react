/**
 * Created by chauncey on 2017/1/5.
 */
import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh'
import InsertChartIcon from 'material-ui/svg-icons/editor/insert-chart'
import InsertInvitationIcon from 'material-ui/svg-icons/editor/insert-invitation'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import Chart from 'chart.js/dist/Chart'
import Divider from 'material-ui/Divider'
import HttpTool from '../tools/HttpTool'
import axios from 'axios/dist/axios.min'
import PopLoading from '../parts/PopLoading'

class MainIndex extends React.Component {

    showChart = () => {
        const ctx = document.getElementById("myChart");
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    };

    constructor(props) {
        super(props);
        this.state = {
            currentActionId: -1,
            actionList: [],
            currentActionTime: '',
            startSec: 0
        }
    }

    componentDidMount() {
        this.showChart();
        HttpTool.getActionList().then(
            res => {
                const list = res.data;
                if (list.size == 0) {
                    this.props.childSwitch(2);
                } else {
                    this.setState({
                        actionList: list
                    });
                    HttpTool.getCurrentAction().then(
                        res => {
                            if (res.data.length > 0) {
                                const data = res.data[0];
                                this.setState({
                                    currentActionId: data.id,
                                    startSec: data.startAt,
                                });
                                setInterval(this.startTiming, 1000);
                            } else {
                                this.setState({
                                    currentActionId: -2,
                                });
                            }
                        }
                    );
                }
            }
        );
    }

    componentWillUnmount() {

    }

    getCurrentActionName = () => {
        for (let i = 0; i < this.state.actionList.length; ++i) {
            const a = this.state.actionList[i];
            if (a.id == this.state.currentActionId) {
                return a.name;
            }
        }
        return this.state.currentActionId == -1 ? "loading..." : '还没有选择开始的动作';
    };

    intervalCode = -1;
    actionDo = (id) => {
        HttpTool.acitonDo(id).then(
            res => {
                if (res.data.res == "0") {
                    this.setState({
                        currentActionId: id,
                    });
                    if (res.data.data.startAt - this.state.startSec > 60) {
                        this.setState({
                            startSec: res.data.data.startAt,
                        });
                    }
                    if (this.intervalCode != -1) {
                        clearInterval(this.intervalCode);
                    }
                    this.intervalCode = setInterval(this.startTiming, 1000);
                }
            }
        );
    };

    startTiming = () => {
        const currentSec = (new Date()).getTime() / 1000;
        const sec = currentSec - this.state.startSec;
        this.setState({
            currentActionTime: this.formatTime(sec),
        });
    };

    formatTime = (sec) => {
        let timeStr = "";
        const s = Math.round(sec % 60);
        const totalMin = Math.round(sec / 60);
        const min = Math.round(totalMin % 60);
        const totalHour = Math.round(totalMin / 60);
        const hour = totalHour % 24;
        const day = Math.round(totalHour / 24);
        if (day > 0) {
            timeStr += day + "天";
        }
        if (hour > 0) {
            timeStr += hour + "小时";
        }
        if (min > 0) {
            timeStr += min + "分";
        }
        timeStr += s + "秒";
        return timeStr;
    };


    render() {
        return (
            <div className="container">
                <div className="row" style={{marginTop: '50px'}}>
                    <div className="col-md-4 col-sm-4">
                        <div className="panel panel-default">
                            <AppBar
                                iconElementRight={<IconButton tooltip="刷新"><RefreshIcon/></IconButton>}
                                iconElementLeft={<IconButton><InsertInvitationIcon/></IconButton>}
                            />
                            <div className="App">
                                <div style={{marginTop: '5px', marginBottom: '5px'}}>
                                    {this.getCurrentActionName()}&nbsp;
                                    {this.state.currentActionTime}
                                </div>
                            </div>
                            <Divider/>
                            <div className="panel-body">
                                <div style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    width: '270px'
                                }}>
                                    {
                                        this.state.actionList.map(
                                            data => (
                                                <RaisedButton
                                                    label={data.name}
                                                    onTouchTap={this.actionDo.bind(this, data.id)}
                                                    style={{marginLeft: '2px', marginBottom: '2px'}}
                                                    primary={this.state.currentActionId == data.id}
                                                    disabled={this.state.currentActionId == -1}
                                                />
                                            )
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8 col-sm-8">
                        <div className="panel panel-default">
                            <AppBar
                                iconElementLeft={<IconButton><InsertChartIcon/></IconButton>}
                            />
                            <div className="panel-body">
                                <canvas id="myChart"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default MainIndex
 