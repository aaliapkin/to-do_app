import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable'

import './item-add-form.css';

export default class ItemAddForm extends Component {

    state = {
        text: ''
    }

    constructor(props) {
        super(props);
        this.contentEditable = React.createRef();
    }

    onLabelChange = (e) => { // delete me
        this.setState({
            label: e.target.value
        });
    };

    onSubmit = () => {
        const {text} = this.state;
        if (text && text.length) {
            this.props.onAddItem(text);
        } else {
            this.props.onAddItem("New item..");
        }
        this.setState({text: ""});
    }

    onChange = (e) => {
        const text = e.target.value
        this.setState({text});
    }

    onKeyDown = (e) => {
        if (e.keyCode === 13) {
            if (!e.shiftKey) {
                e.preventDefault();
                this.contentEditable.current.blur();
                this.onSubmit();
            }
        }
    }

    render() {

        let contentClassName = ''
        const {text} = this.state;
        
        if(text === '') {
            contentClassName = 'item-add-form__text item-add-form__text--empty'
        } else {
            contentClassName = 'item-add-form__text'
        }

        return (
            <div className="input-group input-group-sm mb-3">
                <div className="input-group-prepend">
                    <button className="btn btn-secondary" onClick={this.onSubmit}>
                        <i className="fa fa-plus"></i>
                    </button>
                </div>
                <ContentEditable
                    innerRef={this.contentEditable}
                    className={contentClassName}
                    html={text}
                    onChange={this.onChange}
                    onKeyDown={this.onKeyDown} />
            </div>
        );
    }
}


/* <input type="text"
className="form-control"
onChange={this.onLabelChange}
placeholder="New Item"
value={this.state.label}
onBlur={this.onSubmit} /> */