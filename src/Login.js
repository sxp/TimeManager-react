/**
 * Created by chauncey on 2016/12/27.
 */
import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import AppBar from 'material-ui/AppBar'
import AssignmentIndIcon from 'material-ui/svg-icons/action/assignment-ind'
import IconButton from 'material-ui/IconButton'
import HttpTool from './tools/HttpTool'
import sha1 from 'sha1'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            qqUrl: "#",
            email: '',
            emailError: '',
            psw: '',
            pswError: '',
        }
    }

    componentDidMount() {
        HttpTool.getQQurl().then(
            res => {
                this.setState({
                    qqUrl: res.data.data,
                });
            }
        );
    }

    componentWillUnmount() {
    }

    emailChange = (e) => {
        this.setState({
            email: e.target.value,
            emailError: e.target.value.match("[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}") ? "" : "电子邮件格式不正确",
        });
    };

    pswChange = (e) => {
        this.setState({
            psw: e.target.value,
            pswError: e.target.value.length >= 6 ? "" : "密码至少六个字符",
        });
    };

    isLegal = () => {
        return this.state.email != '' && this.state.emailError == '' && this.state.psw != '' && this.state.pswError == '';
    };

    login = () => {
        HttpTool.login(this.state.email, sha1(this.state.psw), false).then(
            res => {
                if (res.data.res == "0") {
                    this.props.loginSuccess();
                } else {
                    alert(res.data.msg);
                }
            }
        );
    };

    render() {
        return (
            <div className="panel panel-default">
                <AppBar
                    title="Please Sign In"
                    titleStyle={{fontSize: '18px'}}
                    iconElementLeft={<IconButton><AssignmentIndIcon/></IconButton>}
                />
                <div className="panel-body">
                    <TextField
                        fullWidth={true}
                        floatingLabelText="电子邮件"
                        onChange={this.emailChange}
                        value={this.state.email}
                        errorText={this.state.emailError}
                    />
                    <TextField
                        fullWidth={true}
                        type="password"
                        floatingLabelText="password"
                        onChange={this.pswChange}
                        value={this.state.psw}
                        errorText={this.state.pswError}
                    />
                    <RaisedButton
                        label="Login"
                        fullWidth={true}
                        primary={true}
                        disabled={!this.isLegal()}
                        onTouchTap={this.login}
                    />
                    {
                        this.state.qqUrl != '#' ?
                            <div className="oneline-align" style={{marginTop: '10px'}}>
                                <p style={{marginTop: '2px'}}>其他登录方式:</p>
                                <a href={this.state.qqUrl} style={{marginLeft: '5px'}}><img
                                    src="/react/img/bt_blue_24X24.png"/></a>
                            </div>
                            :
                            <div></div>
                    }
                </div>
            </div>
        );
    }
}
export default Login
 