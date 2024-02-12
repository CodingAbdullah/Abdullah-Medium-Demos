import { FC, FormEvent, useState } from 'react';
import Alert from '../Alert/Alert';
import axios from 'axios';

// Insert tasks
const InsertTaskPage: FC = () => {
    const [task, updateTask] = useState('');
    const [alert, updateAlert] = useState('');

    const formHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        
        let options = {
            method: 'POST',
            body: JSON.stringify({ task }),
            headers : {
                'content-type': 'application/json'
            }
        }

        axios.post('http://localhost:5000/insert-task', options)
        .then(() => {
            updateAlert('success');
        })
        .catch(() => {
            updateAlert('failure');
        })
    }

    return (
        <div className='insert-task-page'>
            <h1>Insert Task</h1>
            <p><i>Feel free to insert any tasks </i></p>
            { alert === '' ? null : <Alert type={ alert } /> }
            <form style={{ marginLeft: 'auto', marginRight: 'auto', width: '50%' }} 
                onSubmit={ formHandler } className='insert-task-form'>
                <div className="mb-3">
                    <label className="form-label">Task Description</label>
                    <input type="text" onChange={ e => updateTask(e.target.value) } className="form-control" placeholder="Task Description" />
                </div>
                <br />
                <button type="submit" className='btn btn-success'>Submit</button>
            </form>
        </div>
    )

}

export default InsertTaskPage;