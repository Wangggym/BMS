import React from 'react'
import PropTypes from 'prop-types'
//文件引入
import UserEditor from '../components/UserEditor'
import { get } from '../utils/request'
export default class UserEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null
        }
    }
    componentDidMount() {
        const userId = this.context.router.params.id;
        get('http://localhost:3000/user/' + userId)
            .then(res => {
                this.setState({
                    user: res
                })
            })
    }
    render() {
        const user = this.state.user
        return (
            <div>
                {user ? <UserEditor editTarget={user} /> : '加载中...'}
            </div>
        )
    }
}

UserEdit.contextTypes = {
    router: React.PropTypes.object.isRequired
};