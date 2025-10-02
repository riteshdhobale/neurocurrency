import { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Trash2, Plus, TrendingUp, TrendingDown, Zap } from 'lucide-react';
import { TodoItem } from '../types';
import { todoManager } from '../utils/todoManager';
import { matchActivity } from '../data/activityPresets';

interface TodoListProps {
  onTodoComplete: (todo: TodoItem) => void;
}

export default function TodoList({ onTodoComplete }: TodoListProps) {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = () => {
    setTodos(todoManager.getAllTodos());
  };

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;

    const matchedPreset = matchActivity(newTodoTitle);

    const newTodo = todoManager.addTodo({
      title: newTodoTitle,
      activityPreset: matchedPreset || undefined,
      estimatedDopamineImpact: matchedPreset?.dopamineImpact
    });

    setTodos(todoManager.getAllTodos());
    setNewTodoTitle('');
  };

  const handleCompleteTodo = (id: string) => {
    const completedTodo = todoManager.completeTodo(id);
    if (completedTodo) {
      setTodos(todoManager.getAllTodos());
      onTodoComplete(completedTodo);
    }
  };

  const handleDeleteTodo = (id: string) => {
    todoManager.deleteTodo(id);
    setTodos(todoManager.getAllTodos());
  };

  const activeTodos = todos.filter(t => !t.completed);
  const completedTodos = todos.filter(t => t.completed);

  const getDopamineIndicator = (todo: TodoItem) => {
    if (!todo.activityPreset) return null;

    const { type, dopamineImpact, crashAmount } = todo.activityPreset;

    if (type === 'good') {
      return (
        <div className="flex items-center space-x-2 text-emerald-400 text-xs">
          <TrendingUp className="h-3 w-3" />
          <span>+{dopamineImpact}</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center space-x-2 text-rose-400 text-xs">
          <TrendingDown className="h-3 w-3" />
          <span>-{crashAmount || 0}</span>
        </div>
      );
    }
  };

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-cyan-500/10 p-2 rounded-xl">
            <Zap className="h-5 w-5 text-cyan-400" />
          </div>
          <h2 className="text-xl font-bold text-white">Plan Your Day</h2>
        </div>
        <div className="text-sm text-slate-400">
          {activeTodos.length} active
        </div>
      </div>

      <form onSubmit={handleAddTodo} className="mb-6">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            placeholder="What are you planning to do?"
            className="flex-1 bg-slate-800 text-white placeholder-slate-500 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm"
          />
          <button
            type="submit"
            disabled={!newTodoTitle.trim()}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-3 rounded-xl hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </form>

      <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
        {activeTodos.length === 0 && (
          <div className="text-center py-8 text-slate-500 text-sm">
            No tasks planned yet. Add your first activity!
          </div>
        )}

        {activeTodos.map(todo => (
          <div
            key={todo.id}
            className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 hover:border-cyan-500/30 transition-all duration-200 group"
          >
            <div className="flex items-start space-x-3">
              <button
                onClick={() => handleCompleteTodo(todo.id)}
                className="text-slate-400 hover:text-cyan-400 transition-colors mt-1"
              >
                <Circle className="h-5 w-5" />
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-white text-sm font-medium break-words">{todo.title}</p>
                  {getDopamineIndicator(todo)}
                </div>

                {todo.activityPreset && (
                  <div className="mt-2 flex items-center space-x-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      todo.activityPreset.type === 'good'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-rose-500/10 text-rose-400'
                    }`}>
                      {todo.activityPreset.name}
                    </span>
                    <span className="text-xs text-slate-500">
                      {todo.activityPreset.xpReward >= 0 ? '+' : ''}{todo.activityPreset.xpReward} XP
                    </span>
                  </div>
                )}
              </div>

              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="text-slate-500 hover:text-rose-400 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {completedTodos.length > 0 && (
        <div className="mt-6 pt-6 border-t border-slate-800">
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className="text-sm text-slate-400 hover:text-white transition-colors mb-3"
          >
            {showCompleted ? 'Hide' : 'Show'} completed ({completedTodos.length})
          </button>

          {showCompleted && (
            <div className="space-y-2">
              {completedTodos.map(todo => (
                <div
                  key={todo.id}
                  className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-3 opacity-60"
                >
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-400 text-sm line-through break-words">{todo.title}</p>
                      {todo.activityPreset && (
                        <span className="text-xs text-slate-600 mt-1 inline-block">
                          {todo.activityPreset.name}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteTodo(todo.id)}
                      className="text-slate-600 hover:text-rose-400 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
