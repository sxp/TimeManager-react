/**
 * Created by chauncey on 2017/1/9.
 */
import React from 'react'
import ItemFrame from './ItemFrame'
import InputFrame from './InputFrame'

class ActionItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startInput: false,
            delete: false,
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    menuList = [
        {
            name: '重命名', func: () => {
            this.setState({startInput: true})
        }
        },
        {
            name: '删除', func: () => {
            this.setState({delete: true});
            this.props.deleteFunc(() => {
                this.setState({
                    delete: false,
                });
            });
        }
        }
    ];

    saveFunc(name) {
        this.props.saveFunc(name, () => {
            this.setState({
                startInput: false,
            });
        });
    }

    render() {
        return (
            <div>
                {
                    this.state.startInput ?
                        <InputFrame
                            text={this.props.text}
                            saveFunc={this.saveFunc.bind(this)}
                            cancelFunc={() => (this.setState({startInput: false}))}
                        />
                        :
                        <ItemFrame
                            text={this.props.text}
                            items={this.menuList}
                            delete={this.state.delete}
                        />
                }
            </div>
        );
    }
}
export default ActionItem
 