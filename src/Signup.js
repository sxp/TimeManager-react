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

class Signup extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className="panel panel-default">
                <AppBar
                    title="Please Sign Up"
                    titleStyle={{fontSize: '18px'}}
                    iconElementLeft={<IconButton><AssignmentIcon/></IconButton>}
                />
                <div className="panel-body">
                    <TextField fullWidth={true} floatingLabelText="email"/>
                    <TextField fullWidth={true} floatingLabelText="password" type="password"/>
                    <RaisedButton label="Sign Up" fullWidth={true} primary={true}/>
                </div>
            </div>
        );
    }
}
export default Signup
 