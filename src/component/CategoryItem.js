/**
 * Created by chauncey on 2017/1/9.
 */
import React from 'react'
import ItemFrame from './ItemFrame'
import InputFrame from './InputFrame'
import Folder from 'material-ui/svg-icons/file/folder'
import Dialog from 'material-ui/Dialog'

class CategoryItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startInput: false,
            newActionDialog: false,
            delete: false,
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    menuList = [
        {
            name: '新建动作', func: () => {
            this.setState({
                newActionDialog: true
            });
        }
        },
        {
            name: '重命名', func: () => {
            this.setState({startInput: true})
        }
        },
        {
            name: '删除', func: () => {
            this.setState({
                delete: true
            });
            this.props.deleteFunc(()=>{
                this.setState({
                    delete:false,
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

    createNewAction = (name) => {
        this.props.createNewAction(name, () => {
            this.setState({
                newActionDialog: false,
            });
        });
    };

    render() {
        return (
            <div>
                {
                    this.state.startInput ?
                        <InputFrame
                            text={this.props.text}
                            leftIcon={<Folder/>}
                            saveFunc={this.saveFunc.bind(this)}
                            cancelFunc={() => (this.setState({startInput: false}))}
                        />
                        :
                        <ItemFrame
                            text={this.props.text}
                            leftIcon={<Folder/>}
                            items={this.menuList}
                            delete={this.state.delete}
                        />
                }
                <Dialog
                    title={"在" + this.props.text + "下新建动作"}
                    open={this.state.newActionDialog}
                    modal={true}
                >
                    <InputFrame
                        saveFunc={this.createNewAction.bind(this)}
                        cancelFunc={() => (this.setState({newActionDialog: false}))}
                    />
                </Dialog>
            </div>
        );
    }
}
export default CategoryItem
 