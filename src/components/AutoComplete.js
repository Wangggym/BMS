import React from 'react'
import PropTypes from 'prop-types'
import style from '../styles/autoComplete.less'

function getItemValue(item) {
    return item.value || item
}
class AutoComplete extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            defaultValue: '',
            activeItemIndex: -1
        }
    }
    handleChange(value) {
        this.setState({ defaultValue: '', activeItemIndex: -1 })
        this.props.onValueChange(value)
    }
    handleKeyDown(e) {
        const { activeItemIndex } = this.state
        const { options } = this.props
        switch (e.keyCode) {
            case 13: {
                if (activeItemIndex >= 0) {
                    e.preventDefault()
                    e.stopPropagation()
                    this.handleChange(getItemValue(options[activeItemIndex]))
                }
                break
            }
            case 38:
            case 40: {
                e.preventDefault()
                this.moveItem(e.keyCode === 38 ? 'up' : 'down')
                break
            }
        }
    }
    moveItem(direction) {
        const { activeItemIndex } = this.state
        const { options } = this.props
        const lastIndex = options.length - 1
        let newIndex = -1
        if (direction === 'up') {
            if (activeItemIndex === -1) {
                newIndex = lastIndex
            } else {
                newIndex = activeItemIndex - 1
            }
        } else {
            if (activeItemIndex < lastIndex) {
                newIndex = activeItemIndex + 1
            } else {
                newIndex = 0
            }
        }
        let newDisplayValue = '';
        if (newIndex >= 0) {
            newDisplayValue = getItemValue(options[newIndex]);
        }
        this.setState({ defaultValue: newDisplayValue, activeItemIndex: newIndex })
    }
    handleLeave() {
        this.setState({ defaultValue: '', activeItemIndex: -1 })
    }
    handleEnter(index) {
        const currentItem = this.props.options[index]
        this.setState({ activeItemIndex: index, defaultValue: getItemValue(currentItem) })
    }
    handleClick(index) {

        this.props.onValueChange(e.target.value)
    }
    render() {
        const { defaultValue, activeItemIndex } = this.state
        const { value, options } = this.props
        return (
            <div className={style.wrapper}>
                <input type='text'
                    value={defaultValue || value}
                    onChange={e => this.handleChange(e.target.value)}
                    onKeyDown={this.handleKeyDown.bind(this)} />
                <ul className={style.options} onMouseLeave={this.handleLeave.bind(this)}>
                    {options.map((item, index) => {
                        return (
                            <li
                                key={index}
                                className={activeItemIndex === index ? style.active : ''}
                                onClick={() => this.handleChange(getItemValue(item))}
                                onMouseEnter={() => this.handleEnter(index)} >
                                {item.text || item}
                            </li>)
                    })}
                </ul>
            </div>
        )
    }
}

AutoComplete.PropTypes = {
    value: React.PropTypes.string.isRequired,
    options: React.PropTypes.array.isRequired,
    onValueChange: React.PropTypes.func.isRequired
}

export default AutoComplete