/**
 * Created by chauncey on 2017/1/16.
 */
import React from 'react'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import AlarmIcon from 'material-ui/svg-icons/action/alarm'
import IconButton from 'material-ui/IconButton'
import {browserHistory} from 'react-router'
import AccCirIcon from 'material-ui/svg-icons/action/account-circle'
import TextField from 'material-ui/TextField'
import CircularProgress from 'material-ui/CircularProgress'
import HttpTool from './tools/HttpTool'
import Avatar from 'material-ui/Avatar'

const style = {
    marginLeft: '5px',
};

class CreateAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgsrc: '',
            nick: '',
            loading: true,
            pause: false,
        }
    }

    componentDidMount() {
        HttpTool.getAccountInfo().then(
            res => {
                if (res.data.res != "guest") {
                    browserHistory.push('/');
                }
            }
        );
        HttpTool.getQQInfo().then(
            res => {
                this.setState({
                    imgsrc: res.data.data.avatarUrl,
                    nick: res.data.data.qqNick,
                    loading: false,
                });
            }
        ).catch(
            error => {
                browserHistory.push('/');
            }
        );
    }

    componentWillUnmount() {

    }

    createAcc = () => {
        this.setState({
            pause: true
        });
        HttpTool.createNewAcc(this.state.nick).then(
            res => {
                if (res.data.res == "ok") {
                    browserHistory.push('/');
                } else {
                    this.setState({
                        pause: false
                    });
                    alert("创建新用户失败！");
                }
            }
        );
    };

    render() {
        return (
            <div>
                {
                    this.state.loading ?
                        <CircularProgress/>
                        :
                        <div>
                            <AppBar
                                title="时间管理"
                                style={{fontSize: '18px'}}
                                iconElementLeft={<IconButton><AlarmIcon/></IconButton>}
                            >
                                <div className="vertical-align">
                                    <FlatButton onTouchTap={() => {
                                        browserHistory.push("/");
                                    }}><span style={{color: 'white'}}>返回</span></FlatButton>
                                </div>
                            </AppBar>
                            <div className="container">
                                <div className="row" style={{marginTop: '100px'}}>
                                    <div className="col-md-6 col-md-offset-3 col-sm-12">
                                        <div className="panel panel-default">
                                            <AppBar title="创建新用户"
                                                    iconElementLeft={<IconButton><AccCirIcon/></IconButton>}/>
                                            <div className="panel-body">
                                                <div className="vertical-align">
                                                    <Avatar src={this.state.imgsrc}/>
                                                    <TextField value={this.state.nick} fullWidth={true} style={style}
                                                               onChange={(e) => {
                                                                   this.setState({
                                                                       nick: e.target.value
                                                                   });
                                                               }}/>
                                                    <RaisedButton
                                                        label="创建用户"
                                                        primary={true}
                                                        style={style}
                                                        disabled={this.state.pause}
                                                        onTouchTap={
                                                            this.createAcc
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                }
            </div>
        );
    }
}
export default CreateAccount
 