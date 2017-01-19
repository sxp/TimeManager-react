/**
 * Created by chauncey on 2017/1/7.
 */
import React from 'react'
import "../App.css"
import IconButton from 'material-ui/IconButton'
import Popover from 'material-ui/Popover'
import {Menu, MenuItem} from 'material-ui/Menu'
import MenuIcon from 'material-ui/svg-icons/navigation/menu'
import Divider from 'material-ui/Divider'
import CircularProgress from 'material-ui/CircularProgress'

const labelStyle = {
    fontSize: '16px',
    marginLeft: '5px',
};

class ItemFrame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            popoverOpened: false,
        };
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    handlerMenuClick = (e) => {
        e.preventDefault();
        this.setState({
            popoverOpened: true,
            anchorEl: e.currentTarget
        });
    };

    handlerPopoverClose = () => {
        this.setState({
            popoverOpened: false
        });
    };

    render() {
        return (
            <div className="vertical-align">
                {this.props.leftIcon}
                <div style={{width: '100%', marginTop: '3px'}}>
                    <span style={labelStyle}>{this.props.text}</span>
                </div>
                <IconButton
                    onTouchTap={this.handlerMenuClick}
                    disabled={this.props.delete}
                >
                    {
                        this.props.delete ? <CircularProgress size={30}/> : <MenuIcon/>
                    }
                </IconButton>
                <Popover
                    open={this.state.popoverOpened}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handlerPopoverClose}
                >
                    <Menu desktop={true}>
                        {
                            this.props.items.map(
                                (item, idx) => (
                                    <div>
                                        <MenuItem primaryText={item.name} onTouchTap={() => {
                                            this.setState({
                                                popoverOpened: false,
                                            });
                                            item.func();
                                        }}
                                                  desktop={true}
                                        />
                                        {idx == this.props.items.length - 2 ? <Divider/> : ""}
                                    </div>
                                )
                            )
                        }
                    </Menu>
                </Popover>
            </div>
        );
    }
}
export default ItemFrame
 