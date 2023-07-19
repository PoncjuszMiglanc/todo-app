import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import './todo-item.css';
import ACTIONS from './ACTIONS.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faPenToSquare,
	faCheck,
	faTrashCan,
	faSquareXmark,
	faSquareCheck,
} from '@fortawesome/free-solid-svg-icons';

const TodoItem = ({ todo, dispatch }) => {
	const [myInput, setMyInput] = useState(todo.todo);
	const inputRef = useRef(null);

	//------- tutaj -----------
	const focusHandler = () => {
		dispatch({ type: ACTIONS.EDIT, payload: todo.id });
		if (todo.isCompleted === false) {
			setTimeout(() => {
				inputRef.current.focus();
			}, 50);
		} else {
			alert('nie można edytować skończonego zadania');
		}
	};

	return (
		<>
			<div className="item">
				{todo.isEdited ? (
					<input
						className="item__input"
						onChange={(e) => setMyInput(e.target.value)}
						value={myInput}
						ref={inputRef}
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
						<FontAwesomeIcon icon={faSquareCheck} />
					</button>
				) : (
					<button
						className="item__toggle done"
						onClick={() =>
							dispatch({ type: ACTIONS.UNCOMPLETE, payload: todo.id })
						}
					>
						<FontAwesomeIcon icon={faSquareXmark} />
					</button>
				)}
				{!todo.isEdited ? (
					<button className="item__edit" onClick={focusHandler}>
						<FontAwesomeIcon icon={faPenToSquare} />
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
						<FontAwesomeIcon icon={faCheck} />
					</button>
				)}

				<button
					className="item__delete"
					onClick={() => dispatch({ type: ACTIONS.DELETE, payload: todo.id })}
				>
					<FontAwesomeIcon icon={faTrashCan} />
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
