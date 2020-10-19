import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable'

import './item-add-form.css';

export default class ItemAddForm extends Component {

    constructor(props) {
        super(props);
        this.def = this.props.def;
        this.text = React.createRef();
        this.text.current = this.def;
        this.contentEditable = React.createRef();
        this.form = React.createRef();
    }

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        });
    };

    onSubmit = () => {
        if (this.text.current && this.text.current.length) {
            this.props.onAddItem(this.text.current);
        }
        this.text.current = this.def;
    }

    onChange = (e) => {
        this.text.current = e.target.value;
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
        return (
            <div className="input-group input-group-sm mb-3">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <div className="item-add-form__plus"><i className="fa fa-plus"></i></div>
                    </div>
                </div>
                <ContentEditable
                    innerRef={this.contentEditable}
                    className="item-add-form__text"
                    html={this.text.current}
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