import { TodoItem } from '../types';

class TodoManager {
  private todos: TodoItem[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      this.todos = JSON.parse(savedTodos);
    }
  }

  private saveToStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  getAllTodos(): TodoItem[] {
    return [...this.todos];
  }

  getActiveTodos(): TodoItem[] {
    return this.todos.filter(todo => !todo.completed);
  }

  getCompletedTodos(): TodoItem[] {
    return this.todos.filter(todo => todo.completed);
  }

  addTodo(todo: Omit<TodoItem, 'id' | 'createdAt' | 'completed'>): TodoItem {
    const newTodo: TodoItem = {
      ...todo,
      id: Date.now().toString(),
      completed: false,
      createdAt: Date.now()
    };

    this.todos.unshift(newTodo);
    this.saveToStorage();
    return newTodo;
  }

  completeTodo(id: string): TodoItem | null {
    const todo = this.todos.find(t => t.id === id);
    if (todo && !todo.completed) {
      todo.completed = true;
      todo.completedAt = Date.now();
      this.saveToStorage();
      return todo;
    }
    return null;
  }

  deleteTodo(id: string): boolean {
    const index = this.todos.findIndex(t => t.id === id);
    if (index !== -1) {
      this.todos.splice(index, 1);
      this.saveToStorage();
      return true;
    }
    return false;
  }

  updateTodo(id: string, updates: Partial<TodoItem>): TodoItem | null {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      Object.assign(todo, updates);
      this.saveToStorage();
      return todo;
    }
    return null;
  }
}

export const todoManager = new TodoManager();
