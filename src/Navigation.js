/**
 * Created by chauncey on 2017/1/13.
 */
import React from 'react'
import Welcome from './Welcome'
import Main from './main/Main'
import CircularProgress from 'material-ui/CircularProgress'
import httpTool from './tools/HttpTool'

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageId: -1,
        };
    }

    componentDidMount() {
        httpTool.getAccountInfo().then(
            res => {
                const logon = res.data.res != "guest";
                if (logon) {
                    this.setState({
                        pageId: 1
                    });
                } else {
                    this.setState({
                        pageId: 2
                    });
                }
            }
        )
    }

    componentWillUnmount() {

    }

    switchPage() {
        switch (this.state.pageId) {
            case 1:
                return (<Main goBack={() => {
                    this.setState({
                        pageId: 2,
                    });
                }}/>);
            case 2:
            case 3:
                return (<Welcome pid={this.state.pageId}/>);
            default:
                return (<CircularProgress/>);
        }
    }

    render() {
        return (
            <div>
                {
                    this.switchPage()
                }
            </div>
        );
    }
}
export default Navigation
 