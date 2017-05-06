import React from 'react'
import PropTypes from 'prop-types'
import HomeLayout from '../layouts/HomeLayout'
export default class BookList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bookList: []
        }
    }
    componentWillMount() {
        fetch('http://localhost:3000/book')
            .then(res => res.json())
            .then(res => {
                this.setState({
                    bookList: res
                })
            })
    }
    handleDelete(book) {
        const confirmed = confirm(`确认删除图书${book.name}吗?`)
        if (confirmed) {
            fetch('http://localhost:3000/book/' + book.id, {
                method: 'delete'
            })
                .then(res => res.json())
                .then(res => {
                    alert('删除成功!')
                    this.setState({
                        bookList: this.state.bookList.filter(item => item.id !== book.id)
                    })
                })
                .catch(err => {
                    alert('删除失败!')
                    console.error(err)
                })
        }
    }
    handleEdit(book) {
        this.context.router.push('/book/edit/' + book.id)
    }
    render() {
        const { bookList } = this.state
        return (
            <HomeLayout title="图书列表">
                <table>
                    <thead>
                        <tr>
                            <th>图书ID</th>
                            <th>名称</th>
                            <th>价格</th>
                            <th>拥有者</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookList.map(book => {
                            return (
                                <tr key={book.id}>
                                    <td>{book.id}</td>
                                    <td>{book.name}</td>
                                    <td>{book.price}</td>
                                    <td>{book.owner_id}</td>
                                    <td><a href="javascript:void(0)" onClick={() => this.handleDelete(book)}>删除</a></td>
                                    <td><a href="javascript:void(0)" onClick={() => this.handleEdit(book)}>编辑</a></td>
                                </tr>)
                        })}
                    </tbody>
                </table>
            </HomeLayout>
        )
    }
}

BookList.contextTypes = {
    router: React.PropTypes.object.isRequired
}

