import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable'

import './todo-list-item.css';


export default class TodoListItem extends Component {

  constructor(props) {
    super(props);
    this.text = React.createRef();
    this.contentEditable = React.createRef();
    this.onChangeText = this.props.onChangeText;
  }

  onChange = (e) => {
    this.text.current = e.target.value;
    this.onChangeText(this.text.current);
  }

  onKeyDown = (e) => {
    if (e.keyCode === 13) {
      if (!e.shiftKey) {
        e.preventDefault();
        this.contentEditable.current.blur();
        this.onChangeText(this.text.current);
      }
    }
  }

  render() {
    const { label, onDeleted,
      onToggleImportant, onToggleDone,
      important, done, draggable } = this.props

    const hidden = false;

    this.text.current = label;

    const handleStyle = draggable === true ? 'todo-list-item__handle--active' : 'todo-list-item__handle--inactive';
    return (
      <form onSubmit={this.onSave}>
        <div className={`input-group input-group-sm mb-3 todo-list-item ${done ? 'done' : ''} ${important ? 'important' : ''}`}
          onMouseEnter={this.onMouseEnder}
          onMouseLeave={this.onMouseLeave}>
          <div className="input-group-prepend">
            <div className={`input-group-text todo-list-item__handle ${handleStyle}`}>
              <i className="fa fa-ellipsis-v" /><i className="fa fa-ellipsis-v" />
            </div>
            <div className="input-group-text">
              <input type="checkbox"
                checked={done}
                onChange={onToggleDone} />
            </div>
          </div>
          <ContentEditable
            innerRef={this.contentEditable}
            className="todo-list-item__text"
            html={this.text.current}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown} />
          <div className="input-group-append">
            <button type="button"
              className="btn btn-success btn-sm"
              onClick={onToggleImportant}>
              <i className="fa fa-exclamation" />
            </button>
            <button type="button"
              className={`btn btn-danger btn-sm ${hidden ? 'todo-list-item__button--hidden' : ''}`}
              onClick={onDeleted}>
              <i className="fa fa-trash-o" />
            </button>
          </div>
        </div>
      </form>
    );
  };
};