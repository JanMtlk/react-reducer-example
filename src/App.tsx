import React, { useReducer } from 'react';



type TodoType = {
  id: number;
  text: string;
  done: boolean;
};

function todoReducer (state: TodoType[], action: {
  type: 'ADD_TODO';
  text: string;
} | {
  type: 'TOGGLE_TODO';
  id: number;
} | {
  type: 'REMOVE_TODO';
  id: number;
}) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat({
        id: Math.random(), // not really unique
        text: action.text,
        done: false
      });
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case 'REMOVE_TODO':
      return state.filter(todo => todo.id !== action.id);
    default:
      throw new Error();
  }

}
function App() {
  const [todos, todosDispatch] = useReducer(todoReducer, []);
  const [text, setText] = React.useState('');


  return (
    <div className="App">
      {todos.map(todo => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.done}
            onChange={() => todosDispatch({ type: 'TOGGLE_TODO', id: todo.id })}
          />
          {todo.text}
          <button onClick={() => todosDispatch({ type: 'REMOVE_TODO', id: todo.id })}>Remove</button>
          </div>
      ))}

      <form
        onSubmit={e => {
          e.preventDefault();
          todosDispatch({ type: 'ADD_TODO', text });
          setText('');
        }}
      >
        <input value={text} onChange={e => setText(e.target.value)} />
        <button type="submit">Add Todo</button>
        </form>
    </div>
  );
}

export default App;
