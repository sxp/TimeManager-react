/**
 * Created by chauncey on 2016/12/30.
 */
import React from 'react'
import HttpTool from '../tools/HttpTool'
import PopLoading from '../parts/PopLoading'
import AccountMenu from '../parts/AccountMenu'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import AlarmIcon from 'material-ui/svg-icons/action/alarm'
import MainIndex from './MainIndex'
import Action from './Action'
import {browserHistory} from 'react-router'

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            account: {},
            logon: false,
            accMenuHide: true,
            childId: 1
        }
    }

    componentDidMount() {
        HttpTool.getAccountInfo().then(
            res => {
                let l = res.data.res != 'guest';
                this.setState({
                    logon: l,
                    account: res.data.account,
                    accMenuHide: false,
                });
                if (l) {
                    this.childSwitch(1);
                } else {
                    this.props.goBack();
                }
            }
        );
    }

    componentWillUnmount() {

    }

    logout = () => {
        HttpTool.logout().then(
            res => {
                this.props.goBack();
            }
        )
    };

    getMenuList() {
        switch (this.state.childId) {
            case 1:
                return [
                    {text: "动作管理", action: () => (this.childSwitch(2))},
                    {text: "退出", action: () => (this.logout())}
                ];
            case 2:
                return [
                    {text: "返回", action: () => (this.childSwitch(1))},
                    {text: "退出", action: () => (this.logout())}
                ];
            default:
                break;
        }
    }

    childSwitch(id) {
        this.setState({
            childId: id
        });
    }


    render() {
        return (
            <div className="App-content">
                <PopLoading open={!this.state.logon}/>
                <AppBar
                    title="时间管理"
                    style={{fontSize: '18px'}}
                    iconElementLeft={<IconButton><AlarmIcon/></IconButton>}
                >
                    {
                        this.state.logon ?
                            <AccountMenu nick={this.state.account.qqNick} menuList={this.getMenuList()}
                                         hide={this.state.accMenuHide}/>
                            :
                            <div/>
                    }

                </AppBar>
                {
                    this.state.childId == 1 ? <MainIndex childSwitch={this.childSwitch.bind(this)}/> : <Action/>
                }
            </div>
        );
    }
}
export default Main
 