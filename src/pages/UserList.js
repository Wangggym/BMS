import React from 'react'
import PropTypes from 'prop-types'

//文件引入
import { get, del } from '../utils/request'
export default class UserList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userList: []
        }
    }
    componentDidMount() {
        get('http://localhost:3000/user')
            .then(res => {
                this.setState({
                    userList: res
                })
            })
    }
    handleDelete(user) {
        const confirmed = confirm(`确定要删除用户 ${user.name} 吗？`)
        if (confirmed) {
            del('http://localhost:3000/user/' + user.id)
                .then(res => {
                    this.setState({
                        //filer 数组过滤器--保留true
                        userList: this.state.userList.filter(item => item.id !== user.id)
                    })
                    alert('删除成功！')
                })
                .catch(err => {
                    console.error(err)
                    alert('删除失败！')
                })
        }
    }
    handleEdit(user) {
        this.context.router.push('user/edit/' + user.id)
    }
    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <th>用户ID</th>
                        <th>姓名</th>
                        <th>年龄</th>
                        <th>性别</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.userList.map(user => {
                        return (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.age}</td>
                                <td>{user.gender === 'male' ? '男' : '女'}</td>
                                <td><a href="javascript:void(0)" onClick={() => this.handleDelete(user)}>删除</a></td>
                                <td><a href="javascript:void(0)" onClick={() => this.handleEdit(user)}>编辑</a></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }
}

UserList.contextTypes = {
    router: React.PropTypes.object.isRequired
};