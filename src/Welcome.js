import React, {Component} from 'react';
import './App.css';
import Login from './Login'
import Signup from './Signup'
import FlatButton from 'material-ui/FlatButton'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import AlarmIcon from 'material-ui/svg-icons/action/alarm'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pid: this.props.pid
        }
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    switchPage() {
        if (this.state.pid == 2) {
            return (<Login loginSuccess={this.props.loginSucess}/>);
        } else {
            return (<Signup loginSuccess={this.props.loginSucess}/>);
        }
    }

    render() {
        return (
            <div className="App-content">
                <AppBar
                    title="时间管理"
                    style={{fontSize: '18px'}}
                    iconElementLeft={<IconButton><AlarmIcon/></IconButton>}
                >
                    <div className="vertical-align">
                        <FlatButton onTouchTap={() => {
                            this.setState({pid: 2})
                        }}><span style={{color: 'white'}}>登录</span></FlatButton>
                        <FlatButton onTouchTap={() => {
                            this.setState({pid: 3})
                        }}><span style={{color: 'white'}}>注册</span></FlatButton>
                    </div>
                </AppBar>
                <div className="container">
                    <div className="row" style={{marginTop: '100px'}}>
                        <div className="col-sm-8 hidden-xs">
                            <div className="row">
                                <div className="col-sm-4">
                                    <h3>什么是时间管理</h3>
                                    <p>时间管理是有效地运用时间，降低变动性。
                                        时间管理的目的：决定什么事该做，什么事不该做。
                                        时间管理最重要的功能：是透过事先的规划，作为一种提醒与指引。</p>
                                </div>
                                <div className="col-sm-8">
                                    <img src="/react/img/timeismoney.png" style={{width: '100%'}}/>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            {
                                this.switchPage()
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default App;