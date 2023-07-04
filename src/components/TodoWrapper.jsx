import TodoItem from './TodoItem';
import { useState, useReducer, useEffect } from 'react';
import './todo-wrapper.css';
import ACTIONS from './ACTIONS.js';

const TodoWrapper = () => {
	const reducer = (todos, action) => {
		switch (action.type) {
			case ACTIONS.ADD:
				return [...todos, action.payload];
			case ACTIONS.EDIT: {
				return todos.map((todo) => {
					if (todo.id === action.payload) {
						return { ...todo, isEdited: true };
					} else {
						return todo;
					}
				});
			}
			case ACTIONS.EDITED: {
				return todos.map((todo) => {
					if (todo.id === action.payload.id) {
						return { ...todo, isEdited: false, todo: action.payload.todo };
					} else {
						return todo;
					}
				});
			}
			case ACTIONS.COMPLETE: {
				return todos.map((todo) => {
					if (todo.id === action.payload) {
						return { ...todo, isCompleted: true };
					} else {
						return todo;
					}
				});
			}
			case ACTIONS.UNCOMPLETE: {
				return todos.map((todo) => {
					if (todo.id === action.payload) {
						return { ...todo, isCompleted: false };
					} else {
						return todo;
					}
				});
			}
			case ACTIONS.DELETE: {
				return todos.filter((todo) => {
					return todo.id !== action.payload;
				});
			}

			default:
		}
	};

	const [todos, dispatch] = useReducer(reducer, []);
	const [todo, setTodo] = useState('');

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch({
			type: ACTIONS.ADD,
			payload: {
				id: Math.random(),
				todo: todo,
				isCompleted: false,
				isEdited: false,
			},
		});
		console.log('to jest nasz todo', todo);
		setTodo('');
	};

	useEffect(() => {
		console.log('a to nasza tablica z todosami ', todos);
	}, [todos]);

	return (
		<>
			<div className="todo">
				<h1 className="todo__header">Todo List App</h1>
				<form className="todo__form" onSubmit={submitHandler}>
					<input
						className="todo__input"
						type="text"
						placeholder="co chcesz dzisiaj zrobić?"
						value={todo}
						onChange={(e) => setTodo(e.target.value)}
					/>
					<button className="todo__submit" type="submit">
						Wyślij
					</button>
				</form>
				{todos.map((todo, index) => {
					return (
						<>
							<TodoItem key={index} todo={todo} dispatch={dispatch} />
							{/* JEST PROBLEM, ŻE WYSYŁA TEŻ PUSTEGO INPUTA 
							OGÓLNIE DO BUTTONÓW DAĆ IKONKI ZAMIAST TEKSTU
						*/}
						</>
					);
				})}
			</div>
		</>
	);
};

export default TodoWrapper;
