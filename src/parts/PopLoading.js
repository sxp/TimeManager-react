/**
 * Created by chauncey on 2016/12/30.
 */
import React from 'react'
import Dialog from 'material-ui/Dialog'
import CircularProgress from 'material-ui/CircularProgress'
import {deepOrange600} from 'material-ui/styles/colors'

class PopLoading extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div>
                <Dialog
                    modal={true}
                    open={this.props.open}
                    style={{textAlign: 'center'}}
                >
                    <CircularProgress size={100} thickness={10} color={deepOrange600}/>
                </Dialog>
            </div>
        );
    }
}
export default PopLoading
 