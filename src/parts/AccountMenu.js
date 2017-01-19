/**
 * Created by chauncey on 2017/1/3.
 */
import React from 'react'
import Popover from 'material-ui/Popover'
import {Menu, MenuItem} from 'material-ui/Menu'
import ExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import FlatButton from 'material-ui/FlatButton'

class AccountMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            anchorEl: null
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    handleToucheTap = (e) => {
        e.preventDefault();
        this.setState({
            open: true,
            anchorEl: e.currentTarget,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    render() {
        return (
            <div className="vertical-align" style={this.props.hide ? {display: 'none'} : {display: ''}}>
                <FlatButton
                    label={this.props.nick}
                    style={{color: 'white'}}
                    icon={<ExpandMoreIcon/>}
                    onTouchTap={this.handleToucheTap}
                />
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose}
                >
                    <Menu>
                        {
                            this.props.menuList.map((m, idx) =>
                                (
                                    <MenuItem primaryText={m.text} onTouchTap={() => {
                                        m.action();
                                        this.setState({
                                            open: false,
                                        })
                                    }}/>
                                )
                            )
                        }
                    </Menu>
                </Popover>
            </div>
        );
    }
}
export default AccountMenu
 