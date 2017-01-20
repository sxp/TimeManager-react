/**
 * Created by chauncey on 2016/12/28.
 */
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import RaisedButton from 'material-ui/RaisedButton'
import AssignmentIcon from 'material-ui/svg-icons/action/assignment'
import TextField from 'material-ui/TextField'
import HttpTool from './tools/HttpTool'
import sha1 from 'sha1'

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nick: '',
            nickError: '',
            email: '',
            emailError: '',
            psw1: '',
            psw1Error: '',
            psw2: '',
            psw2Error: '',
        }
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    nickChange = (e) => {
        this.setState({
            nick: e.target.value,
            nickError: e.target.value.length >= 3 ? "" : "昵称最少三个字符",
        });
    };

    emailChange = (e) => {
        this.setState({
            email: e.target.value,
            emailError: e.target.value.match("[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}") ? "" : "电子邮件格式不正确",
        });
    };

    psw1Change = (e) => {
        this.setState({
            psw1: e.target.value,
            psw1Error: e.target.value.length >= 6 ? "" : "密码至少六个字符",
        });
    };

    psw2Change = (e) => {
        this.setState({
            psw2: e.target.value,
            psw2Error: e.target.value == this.state.psw1 ? "" : "两次密码不一致",
        });
    };

    isLegal = () => {
        return this.state.nick != '' && this.state.nickError == '' && this.state.email != '' && this.state.emailError == ''
            && this.state.psw1 != '' && this.state.psw1Error == '' && this.state.psw2 != '' && this.state.psw2Error == ''
    };

    signup = () => {
        HttpTool.signUp(this.state.nick,
            this.state.email,
            sha1(this.state.psw1),
            sha1(this.state.psw2)).then(
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
                    title="Please Sign Up"
                    titleStyle={{fontSize: '18px'}}
                    iconElementLeft={<IconButton><AssignmentIcon/></IconButton>}
                />
                <div className="panel-body">
                    <TextField
                        fullWidth={true}
                        floatingLabelText="昵称"
                        value={this.state.nick}
                        onChange={this.nickChange}
                        errorText={this.state.nickError}
                    />
                    <TextField
                        fullWidth={true}
                        floatingLabelText="电子邮箱"
                        value={this.state.email}
                        onChange={this.emailChange}
                        errorText={this.state.emailError}
                    />
                    <TextField
                        fullWidth={true}
                        floatingLabelText="登录密码"
                        type="password"
                        value={this.state.psw1}
                        onChange={this.psw1Change}
                        errorText={this.state.psw1Error}
                    />
                    <TextField
                        fullWidth={true}
                        floatingLabelText="确认密码"
                        type="password"
                        value={this.state.psw2}
                        errorText={this.state.psw2Error}
                        onChange={this.psw2Change}
                    />
                    <RaisedButton
                        label="Sign Up"
                        fullWidth={true}
                        primary={true}
                        disabled={!this.isLegal()}
                        onTouchTap={this.signup}
                    />
                </div>
            </div>
        );
    }
}
export default Signup
 