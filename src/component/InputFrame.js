/**
 * Created by chauncey on 2017/1/7.
 */
import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'
import Folder from 'material-ui/svg-icons/file/folder'
import CircularProgress from 'material-ui/CircularProgress'
import "../App.css"

const style = {
    marginLeft: '5px',
};

class InputFrame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: props.text,
            saving: false,
            canSave: false,
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    handlerTextChanged = (e) => {
        this.setState({
            text: e.target.value
        });
        if (this.props.text != e.target.value && e.target.value != "") {
            this.setState({
                canSave: true
            });
        } else {
            this.setState({
                canSave: false
            });
        }
    };

    saveFunc = () => {
        this.setState({
            saving: true
        });
        this.props.saveFunc(this.state.text);
    };

    cancelFunc = () => {
        this.props.cancelFunc();
    };

    render() {
        return (
            <div className="vertical-align">
                {this.props.leftIcon}
                <TextField
                    fullWidth={true}
                    defaultValue={this.props.text}
                    onChange={this.handlerTextChanged}
                    style={style}
                    disabled={this.state.saving}
                />
                {
                    this.state.canSave ?
                        <RaisedButton
                            primary={true}
                            label={this.state.saving ? "" : "保存"}
                            style={style}
                            icon={this.state.saving ? <CircularProgress size={30}/> : <div/>}
                            onTouchTap={this.saveFunc}
                        />
                        :
                        <div></div>
                }
                {
                    this.state.saving ?
                        <div></div>
                        :
                        <RaisedButton
                            secondary={true}
                            label="取消"
                            style={style}
                            onTouchTap={this.cancelFunc}
                        />
                }
            </div>
        );
    }
}
export default InputFrame
 