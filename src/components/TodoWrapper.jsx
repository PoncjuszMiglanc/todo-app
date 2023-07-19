import TodoItem from './TodoItem';
import { useState, useReducer } from 'react';
import './todo-wrapper.css';
import ACTIONS from '../assets/ACTIONS.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';

const TodoWrapper = () => {
	const reducer = (todos, action) => {
		switch (action.type) {
			case ACTIONS.ADD: {
				return [...todos, action.payload];
			}
			case ACTIONS.EDIT: {
				return todos.map((todo) => {
					if (todo.id === action.payload && todo.isCompleted === false) {
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
		if (todo) {
			dispatch({
				type: ACTIONS.ADD,
				payload: {
					id: Math.random(),
					todo: todo,
					isCompleted: false,
					isEdited: false,
				},
			});

			setTodo('');
		} else {
			alert('nic nie wpisałeś');
		}
	};

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
						<FontAwesomeIcon icon={faSquarePlus} />
					</button>
				</form>
				{todos.map((todo) => {
					return (
						<>
							<TodoItem key={todo.id} todo={todo} dispatch={dispatch} />
						</>
					);
				})}
			</div>
		</>
	);
};

export default TodoWrapper;
