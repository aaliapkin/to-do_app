import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.maxId = 100;
    this.state = {
      todoData: [
        this.createItem('Master Luke here is your rightful owner.'),
        this.createItem('He is here... Obi-Wan Kenobi! What makes you think so?'),
        this.createItem('My father will know how to retrieve it. You must see this droid safelydelivered to him on Alderaan.'),
        this.createItem('General Kenobi, years ago you served my father in the Clone Wars. '),
        this.createItem('Come on. There are two Banthas down there but I don\'t see any...wait a second, they\'re Sandpeople all right.'),
        this.createItem('Jabba\'s through with you. He has no time for smugglers who drop their shipments at the first sign of an Imperial cruiser. Even I get boarded sometimes. '),
        this.createItem('Add clear filter button')
      ],
      term: ''
    };
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const newArray = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1)
      ];
      return {
        todoData: newArray
      }
    });
  };

  createItem(text) {
    return {
      label: text,
      important: false,
      done: false,
      id: this.maxId++
    };
  }

  addItem = (text) => {
    const newItem = this.createItem(text);
    this.setState(({ todoData }) => {
      return {
        todoData: this.sortItems([...todoData, newItem])
      };
    });
  }

  setProperty(arr, id, propName, lambda) {
    const idx = arr.findIndex((el) => el.id === id)
    const oldItem = arr[idx];
    const newItem = {
      ...oldItem,
      [propName]: lambda(oldItem.[propName])
    };
    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1)
    ];
  }

  swapIndex(arr, fromIndex, toIndex) {
    const data = [...arr];
    const item = data.splice(fromIndex, 1)[0];
    data.splice(toIndex, 0, item);
    return data;
  };

  onSwapIndex = (fromIndex, toIndex) => {
    this.setState(({ todoData }) => {
      return { todoData: this.swapIndex(todoData, fromIndex, toIndex) };
    });
  }

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return { todoData: this.sortItems(this.setProperty(todoData, id, 'important', value => !value)) };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return { todoData: this.setProperty(todoData, id, 'done', value => !value) };
    });
  };

  onSearchChange = (term) => {
    this.setState({ term });
  }

  onFilterChange = (filter) => {
    this.setState({ filter });
  }

  onChangeText = (newText, id) => {
    this.setState(({ todoData }) => {
      return { todoData: this.setProperty(todoData, id, 'label', value => newText) };
    });
  }

  sortItems(arr) {
    return arr.sort((a, b) => {
      if (!a.important && b.important) {
        return 1;
      } else if (a.important && !b.important) {
        return -1;
      }
      return 0;
    });
  }

  search(arr, term) {
    if (term.length === 0) {
      return arr;
    }
    return arr.filter((el) => (el.label.toLowerCase().indexOf(term.toLowerCase()) > -1));
  }

  render() {

    const { todoData, term } = this.state;
    const visibleItems = this.search(todoData, term);
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    const draggable = (term === '') ? true : false;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange} />
        </div>

        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
          onChangeText={this.onChangeText}
          onSwapIndex={this.onSwapIndex}
          draggable={draggable} />

        <ItemAddForm onAddItem={this.addItem} def="New Item..." />
      </div>
    );
  };
};
