/**
 * Created by chauncey on 2017/1/5.
 */
import React from 'react'
import CategoryItem from '../component/CategoryItem'
import ActionItem from '../component/ActionItem'
import HttpTool from '../tools/HttpTool'
import CircularProgress from 'material-ui/CircularProgress'
import Dialog from 'material-ui/Dialog'
import InputFrame from '../component/InputFrame'
import RaisedButton from 'material-ui/RaisedButton'

const style = {
    marginTop: '10px'
};

class Action extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryList: [],
            loading: true,
            newCategoryDialog: false,
        }
    }

    componentDidMount() {
        HttpTool.getCategoryList().then(
            res => {
                this.setState({
                    categoryList: res.data,
                    loading: false,
                });
            }
        );
    }

    componentWillUnmount() {

    }

    saveCategory = (id, name, cb) => {
        HttpTool.categoryRename(id, name).then(
            res => {
                if (res.data.res == "0") {
                    this.saveCategoryName(id, name);
                }
                cb();
            }
        );
    };

    saveCategoryName = (id, name) => {
        const list = this.state.categoryList;
        for (let i = 0; i < list.length; ++i) {
            const c = list[i];
            if (c.id == id) {
                c.name = name;
                break;
            }
        }
        this.setState({
            categoryList: list
        });
    };

    saveAction = (id, name, cb) => {
        HttpTool.actionRename(id, name, false).then(
            res => {
                if (res.data.res == "0") {
                    this.saveActionName(id, name);
                }
                cb();
            }
        );
    };

    saveActionName = (id, name) => {
        let finded = false;
        const list = this.state.categoryList;
        for (let i = 0; i < list.length; ++i) {
            const c = list[i];
            for (let j = 0; j < c.children.length; ++j) {
                const child = c.children[j];
                if (child.id == id) {
                    child.name = name;
                    finded = true;
                    break;
                }
            }
            if (finded) {
                break;
            }
        }
        this.setState({
            categoryList: list
        });
    };

    createNewAction = (cid, name, cb) => {
        HttpTool.addAction(cid, name).then(
            res => {
                if (res.data.res == "0") {
                    this.saveNewAction(cid, res.data.data.id, res.data.data.name);
                }
                cb();
            }
        );
    };

    saveNewAction = (cid, id, name) => {
        const list = this.state.categoryList;
        for (let i = 0; i < list.length; ++i) {
            const c = list[i];
            if (c.id == cid) {
                c.children.push({id: id, name: name});
                break;
            }
        }
        this.setState({
            categoryList: list
        });
    };

    deleteCategroy = (id, cb) => {
        HttpTool.deleteCategory(id).then(
            res => {
                if (res.data.res == "0") {
                    this.saveDeleteCategroy(id);
                }
                cb();
            }
        );
    };

    saveDeleteCategroy = (id) => {
        const list = this.state.categoryList;
        for (let i = 0; i < list.length; ++i) {
            const c = list[i];
            if (c.id == id) {
                list.splice(i, 1);
                break;
            }
        }
        this.setState({
            categoryList: list
        });
    };

    deleteAction = (id, cb) => {
        HttpTool.deleteAction(id).then(
            res => {
                if (res.data.res == "0") {
                    this.saveDeleteAction(id);
                }
                cb();
            }
        );
    };

    saveDeleteAction = (id) => {
        let finded = false;
        const list = this.state.categoryList;
        for (let i = 0; i < list.length; ++i) {
            const c = list[i];
            for (let j = 0; j < c.children.length; ++j) {
                const child = c.children[j];
                if (child.id == id) {
                    c.children.splice(j, 1);
                    finded = true;
                    break;
                }
            }
            if (finded) {
                break;
            }
        }
        this.setState({
            categoryList: list
        });
    };

    createNewCategory = (name) => {
        HttpTool.addCategory(name).then(
            res => {
                if (res.data.res == "0") {
                    this.saveNewCategory(res.data.data.id, res.data.data.name);
                }
                this.setState({newCategoryDialog: false});
            }
        );
    };

    saveNewCategory = (id, name) => {
        const list = this.state.categoryList;
        list.push({id: id, name: name, children: []});
        this.setState({
            categoryList: list,
        });
    };

    render() {
        return (
            <div className="row">
                <CircularProgress style={this.state.loading ? {display: ''} : {display: 'none'}}/>
                <Dialog
                    title={"新建分类"}
                    open={this.state.newCategoryDialog}
                    modal={true}
                >
                    <InputFrame
                        saveFunc={this.createNewCategory.bind(this)}
                        cancelFunc={() => (this.setState({newCategoryDialog: false}))}
                    />
                </Dialog>
                <div className="col-md-8 col-md-offset-2" style={style}>
                    <div className="panel-body">
                        {
                            this.state.categoryList.map(
                                cg => (
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <CategoryItem
                                                text={cg.name}
                                                saveFunc={this.saveCategory.bind(this, cg.id)}
                                                createNewAction={this.createNewAction.bind(this, cg.id)}
                                                deleteFunc={this.deleteCategroy.bind(this, cg.id)}
                                            />
                                        </div>
                                        <div className="panel-body">
                                            {
                                                cg.children.map(
                                                    child => (
                                                        <ActionItem
                                                            text={child.name}
                                                            saveFunc={this.saveAction.bind(this, child.id)}
                                                            deleteFunc={this.deleteAction.bind(this, child.id)}
                                                        />
                                                    )
                                                )
                                            }
                                        </div>
                                    </div>
                                )
                            )
                        }
                        <div style={{float: 'right'}}>
                            <RaisedButton label="新建分类" onTouchTap={() => (this.setState({newCategoryDialog: true}))}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Action
 