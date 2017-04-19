import React, {Component, PropTypes } from 'react'

class UserAdd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            form: {
                name:{
                    valid: false,
                    value: '',
                    error: ''
                },
                age:{
                    valid: false,
                    value: '',
                    error: ''
                },
                gender:{
                    valid: false,
                    value: '',
                    error: ''
                },
            }
        }
    }
    handleChange(field, value, type="string") {
        if(type === "number") {
            value = +value
        }
        const { form } = this.state
        const newFiledObj = {value, valid: true, error: ''}
        switch(field) {
            case 'name': 
                if(value.split('').length >= 2) {
                    newFiledObj.error = '最多输入四个字符串'
                    newFiledObj.valid = false
                } else if(value.split('').lenght === 0 || value == " ") {
                    newFiledObj.error = '请输入用户名'
                    newFiledObj.valid = false
                }
                break
            case 'age' : 
                if(value <= 0 || value >120) {
                    newFiledObj.error = '请输入1~120之间的数字'
                    newFiledObj.valid = false
                }
                break
            case 'gender' : 
                if(!value) {
                    newFiledObj.error = '请填入性别'
                    newFiledObj.valid = false
                }
                break
            }
        this.setState({
            form: {
                ...form,
                [field]: newFiledObj
            }
        })
    }
    handleSubmit(e) {
        e.preventDefault()
        const { form:{name, age, gender} } = this.state
        if(!name.valid || !age.valid || !gender.valid) {
            alert('请填写正确信息')
            return
        }
        fetch('http://localhost:3000/user',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: name.value,
                age: age.value,
                gender: gender.value
            })
        }).then(res => res.json()).then(res => {
            if(res.id) {
                alert('添加成功')
                this.setState({
                    form: {
                        name:{
                            valid: false,
                            value: '',
                            error: ''
                        },
                        age:{
                            valid: false,
                            value: '',
                            error: ''
                        },
                        gender:{
                            valid: false,
                            value: '',
                            error: ''
                        },
                    }
                })
            }else {
                alert('添加失败')
            }
        }).catch(err => console.error(err))
    }
    render() {
        const { form:{name, age, gender} } = this.state
        return (
            <div>
                <header>
                    <h1>this is UserAdd</h1>
                </header>
                <main>
                    <form onSubmit={e => this.handleSubmit(e)}>
                        <label>用户名：</label>
                        <input type="text" value={name.value} onChange={e => this.handleChange('name',e.target.value.trim())}/>
                        {!name.valid && <span>{name.error}</span>}
                        <br/>
                        <lable>年龄：</lable>
                        <input type="number" value={age.value || ''} onChange={e => this.handleChange('age',e.target.value,'number')}/>
                        {!age.valid && <span>{age.error}</span>}
                        <br/>
                        <label>性别：</label>
                        <select value={gender.value} onChange={e => this.handleChange('gender',e.target.value)}>
                            <option value="">选择您的性别</option>
                            <option value="male">男</option>
                            <option value="female">女</option>
                        </select>
                        {!gender.valid && <span>{gender.error}</span>}
                        <br/>
                        <input type="submit" value="提交"/>
                    </form>
                </main>
            </div>
        )
    }
}

export default UserAdd