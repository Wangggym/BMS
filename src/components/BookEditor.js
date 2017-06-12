import React from 'react'
import PropTypes from 'prop-types'
import FormItem from './FormItem'
import formProvider from '../utils/formProvider'
import AutoComplete from './AutoComplete'
import request, { get } from '../utils/request';

class BookEditor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            recommendUsers: []
        }
    }
    componentWillMount() {
        const { setFormValues, editTarget } = this.props
        if (editTarget) {
            setFormValues(editTarget)
        }
    }
    getRecommendUsers(partialId) {
        get('http://localhost:3000/user?id_like=' + partialUserId)
            .then(res => {
                if (res.length === 1 && partialId === res[0].id) {
                    return
                }
                this.setState({
                    recommendUsers: res.map(user => {
                        return { text: `${user.id}(${user.name})`, value: user.id }
                    })
                })
            })
    }
    timer = 0
    handleValueChange(value) {
        const { onFormChange } = this.props
        onFormChange('owner_id', value)
        this.setState({ recommendUsers: [] })
        if (this.timer) {
            clearTimeout(this.timer)
        }
        if (value) {
            this.timer = setTimeout(() => {
                this.getRecommendUsers(value)
                this.timer = 0
            }, 200)
        }
    }
    handleSumbit(e) {
        e.preventDefault()
        const { form: { name, price, owner_id }, formValid, editTarget } = this.props
        if (!formValid) {
            alert('请填入正确信息!')
            return
        }
        let apiUrl = 'http://localhost:3000/book'
        let method = 'post'
        let editType = '添加'
        if (editTarget) {
            apiUrl += '/' + editTarget.id
            method = 'put'
            editType = '编辑'
        }
        request(method, apiUrl, {
            name: name.value,
            price: price.value,
            owner_id: owner_id.value
        })
            .then(res => {
                if (res.id) {
                    alert(`${editType}成功!`)
                    this.context.router.push('/book/list')
                } else {
                    alert(`${editType}失败!`)
                }
            })
            .catch(err => console.error(err))
    }
    render() {
        const { form: { name, price, owner_id }, onFormChange } = this.props
        const { recommendUsers } = this.state
        return (
            <form onSubmit={this.handleSumbit.bind(this)}>
                <FormItem label='书名' valid={name.valid} error={name.error}>
                    <input type='text' value={name.value} onChange={e => onFormChange('name', e.target.value)} />
                </FormItem>
                <FormItem label='价格' valid={price.valid} error={price.error}>
                    <input type='text' value={price.value} onChange={e => onFormChange('price', e.target.value)} />
                </FormItem>
                <FormItem label='拥有者' valid={owner_id.valid} error={owner_id.error}>
                    <AutoComplete
                        options={recommendUsers}
                        value={owner_id.value}
                        onValueChange={value => this.handleValueChange(value)} />
                </FormItem>
                <br />
                <input type='submit' value='提交' />
            </form>
        )
    }
}
BookEditor.contextTypes = {
    router: React.PropTypes.object.isRequired
};

BookEditor = formProvider({
    name: {
        defaultValue: '',
        rules: [
            {
                pattern(value) {
                    return value.length > 0;
                },
                error: '请输入书名'
            }
        ]
    },
    price: {
        defaultValue: '',
        rules: [
            {
                pattern: /^\d+$/,
                error: '请输入一个整数'
            },
            {
                pattern(value) {
                    return value > 0;
                },
                error: '价格必须大于0'
            }
        ]
    },
    owner_id: {
        defaultValue: '',
        rules: [
            {
                pattern: /^\d+$/,
                error: '请输入合法的用户ID'
            },
            {
                pattern(value) {
                    return value !== 0;
                },
                error: '请输入用户ID'
            }
        ]
    }
})(BookEditor)

export default BookEditor