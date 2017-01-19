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

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            qqUrl: "#",
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

    render() {
        return (
            <div className="panel panel-default">
                <AppBar
                    title="Please Sign In"
                    titleStyle={{fontSize: '18px'}}
                    iconElementLeft={<IconButton><AssignmentIndIcon/></IconButton>}
                />
                <div className="panel-body">
                    <TextField fullWidth={true} floatingLabelText="email"/>
                    <TextField fullWidth={true} type="password" floatingLabelText="password"/>
                    <RaisedButton label="Login" fullWidth={true} primary={true} onTouchTap={()=>{HttpTool.createNewAcc('dd')}}/>
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
 