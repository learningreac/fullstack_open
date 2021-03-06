import React from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';

const NewAnecdote = () => {
    const dispatch = useDispatch();

    const addNewAnec = async (event) => {
        event.preventDefault();
        const content = event.target.anec.value;
        event.target.anec.value = "";
        dispatch(createAnecdote(content))
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addNewAnec}>
                <div><input name="anec" /></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default NewAnecdote