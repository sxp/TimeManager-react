/**
 * Created by chauncey on 2016/12/29.
 */

import axios from 'axios/dist/axios.min'
class HttpTool {
    static test = true;

    static getQQurl() {
        return axios.get("/auth/qq/url");
    }

    static getQQInfo() {
        return axios.get("/auth/qq/info");
    }

    static getAccountInfo() {
        return axios.get("/json/accountInfo");
    }

    static createNewAcc(name) {
        if (HttpTool.test) {
            return axios.get("/auth/qq/create1");
        } else {
            return axios.post("/auth/qq/create", {
                name: name
            });
        }
    }

    static getActionList() {
        return axios.get("/json/myActionList");
    }

    static getCurrentAction() {
        return axios.get("/json/current");
    }

    static acitonDo(id) {
        if (HttpTool.test) {
            return axios.get("/json/do");
        } else {
            return axios.post("/json/do", {
                id: id
            });
        }
    }

    static getCategoryList() {
        return axios.get("/json/myCategoryList");
    }

    static categoryRename(id, name) {
        if (HttpTool.test) {
            return axios.get("/json/saveCategory");
        } else {
            return axios.post("/json/saveCategory", {
                id: id,
                name: name
            })
        }
    }

    static actionRename(id, name, changeOld) {
        if (HttpTool.test) {
            return axios.get("/json/saveAction");
        } else {
            return axios.post("/json/saveAction", {
                changeOld: changeOld,
                id: id,
                name: name
            });
        }
    }

    static addAction(cid, name) {
        if (HttpTool.test) {
            return axios.get("/json/addAction");
        } else {
            return axios.post("/json/addAction", {
                cid: cid,
                name: name
            });
        }
    }

    static deleteCategory(id) {
        if (HttpTool.test) {
            return axios.get("/json/deleteCategory");
        } else {
            return axios.post("/json/deleteCategory", {
                id: id
            });
        }
    }

    static deleteAction(id) {
        if (HttpTool.test) {
            return axios.get("/json/deleteAction");
        } else {
            return axios.post("/json/deleteAction", {
                id: id
            });
        }
    }

    static addCategory(name) {
        if (HttpTool.test) {
            return axios.get("/json/addCategory");
        } else {
            return axios.post("/json/addCategory", {
                name: name
            });
        }
    }

    static logout() {
        if (!HttpTool.test) {
            return axios.post("/logout");
        }
    }
}
export default HttpTool;
