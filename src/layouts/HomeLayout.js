import React from 'react'

export default class HomeLayout extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { title, children } = this.props
        return (
            <div>
                <header>
                    <h1>{title}</h1>
                </header>
                <main>
                    {children}
                </main>
            </div>
        )
    }
}
