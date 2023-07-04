import { useState } from 'react';
import PropTypes from 'prop-types';
import './todo-item.css';
import ACTIONS from './ACTIONS.js';

const TodoItem = ({ todo, dispatch }) => {
	const [myInput, setMyInput] = useState(todo.todo);

	return (
		<>
			<div className="item">
				{todo.isEdited ? (
					<input
						className="item__input"
						onChange={(e) => setMyInput(e.target.value)}
						value={myInput}
						type="text"
					/>
				) : (
					<div className={`item__name ${todo.isCompleted ? 'done' : ''}`}>
						<p className="item__paragraph">{todo.todo}</p>
					</div>
				)}
				{!todo.isCompleted ? (
					<button
						className="item__toggle"
						onClick={() =>
							dispatch({ type: ACTIONS.COMPLETE, payload: todo.id })
						}
					>
						Niezrobione
					</button>
				) : (
					<button
						className="item__toggle done"
						onClick={() =>
							dispatch({ type: ACTIONS.UNCOMPLETE, payload: todo.id })
						}
					>
						Zrobione
					</button>
				)}
				{!todo.isEdited ? (
					<button
						className="item__edit"
						onClick={() => dispatch({ type: ACTIONS.EDIT, payload: todo.id })}
					>
						Edit
					</button>
				) : (
					<button
						className="item__edit"
						onClick={() =>
							dispatch({
								type: ACTIONS.EDITED,
								payload: { id: todo.id, todo: myInput },
							})
						}
					>
						Edited
					</button>
				)}

				<button
					className="item__delete"
					onClick={() => dispatch({ type: ACTIONS.DELETE, payload: todo.id })}
				>
					Delete
				</button>
			</div>
		</>
	);
};

TodoItem.propTypes = {
	todo: PropTypes.object,
	dispatch: PropTypes.func,
};

export default TodoItem;
