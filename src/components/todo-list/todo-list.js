import React, { Component } from 'react';
import ReactDragListView from 'react-drag-listview'

import TodoListItem from '../todo-list-item';
import './todo-list.css';

export default class TodoList extends Component {

  onSwapIndex = (fromIndex, toIndex) => {
    if(toIndex === undefined) {
      return;
    }
    const { todos, onSwapIndex } = this.props;
    const activeElements = todos.filter((el) => {
      return !el.done;
    });
    const fromId = activeElements[fromIndex].id;
    const toId = activeElements[toIndex].id;
    const realFromIndex = todos.findIndex((el) => (el.id === fromId));
    const realToIndex = todos.findIndex((el) => (el.id === toId));
    onSwapIndex(realFromIndex, realToIndex);
  }

  render() {
    const { todos, onDeleted, onToggleImportant,
      onToggleDone, onChangeText,
      draggable } = this.props;

    const activeElements = todos.filter((el) => {
      return !el.done;
    }).map((item) => {
      const { id, ...itemProps } = item;
      return (
        <li key={id}>
          <TodoListItem {...itemProps}
            onDeleted={() => onDeleted(id)}
            onToggleImportant={() => onToggleImportant(id)}
            onToggleDone={() => onToggleDone(id)}
            onChangeText={(newText) => onChangeText(newText, id)}
            draggable={draggable} />
        </li>
      );
    });

    const doneElements = todos.filter((el) => {
      return el.done;
    }).map((item) => {
      const { id, ...itemProps } = item;
      return (
        <li key={id}>
          <TodoListItem {...itemProps}
            onDeleted={() => onDeleted(id)}
            onToggleImportant={() => onToggleImportant(id)}
            onToggleDone={() => onToggleDone(id)}
            onChangeText={(newText) => onChangeText(newText, id)} />
        </li>
      );
    });

    return (
      <>
        <ReactDragListView
          onDragEnd={this.onSwapIndex}
          nodeSelector="li"
          handleSelector=".todo-list-item__handle--active">
          <ul className="todo-list">
            {activeElements}
          </ul>
        </ReactDragListView>
        <ul className="todo-list">
          {doneElements}
        </ul>
      </>
    );
  };
};

// onDragEnd={(fromIndex, toIndex) => onSwapIndex(fromIndex, toIndex)}