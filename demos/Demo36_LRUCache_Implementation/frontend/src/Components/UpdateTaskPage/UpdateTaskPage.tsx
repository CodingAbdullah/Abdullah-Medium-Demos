import { ChangeEventHandler, FC, FormEvent, useEffect, useState } from 'react';
import Alert from '../Alert/Alert';
import axios from 'axios';
import IDSelector from '../IDSelector/IDSelector';
import IDType from '../../dataTypes/IDDataType';

// Update Tasks
const UpdateTaskPage: FC = () => {
    const [updateID, updateUpdateID] = useState('');
    const [description, updateDescription] = useState('');
    const [ids, updateIds] = useState<IDType>({ information: null });
    const [alert, updateAlert] = useState('');
    const [err, updateErr] = useState(false);

    // Run on Component Mount
    useEffect(() => {
        const fetchIDs = async () => {
            try {
                const response = await axios.get('http://localhost:5000/fetch-task-ids');

                // Set value to first one
                // Updating IDs
                if (response.data.LRUData.length > 0) {
                    updateUpdateID(response.data.LRUData[0]);
                    updateIds(prevState => {
                        return {
                            ...prevState,
                            information: response.data.LRUData
                        }
                    });
                }
                else {
                    // Set IDs to empty array
                    updateIds(prevState => {
                        return {
                            ...prevState,
                            information: []
                        }
                    });
                }
            }
            catch (err) {
                updateErr(true);
            }
        }
        fetchIDs();
    }, []);

    // Handle state whenever an ID is selected
    const updateIDHandler: ChangeEventHandler<HTMLSelectElement> = (event) => {
          updateUpdateID(event.target.value);
    }

    // Form handling the delete task action
    const formHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 

        // Set options for back-end call
        let options = {
            method: 'POST',
            body: JSON.stringify({ updateID, description }),
            headers : {
                'content-type': 'application/json'
            }
        }

        // Make back-end request to delete ID
        axios.post('http://localhost:5000/update-task', options)
        .then(() => {
            updateAlert('success');
        })
        .catch(() => {
            updateAlert('failure');
        });
    }

    // Check to see if IDs loaded
    if (ids.information === null){
        return <div><b>Loading...</b></div>
    }
    else if (err) {
        return <div><b>Error loading data...</b></div>
    }
    else {
        if (ids.information.length === 0) {
            return <div><b>LRU Cache is Empty!</b></div>
        }
        else {
            return (
                <div className='delete-task-page'>
                    <h1>Update Task</h1>
                    <p><i>Feel free to select any tasks to delete</i></p>
                    { alert === '' ? null : <Alert type={ alert } /> }
                    <form style={{ marginLeft: 'auto', marginRight: 'auto', width: '50%' }} 
                        onSubmit={ formHandler } className='insert-task-form'>
                        <div className="mb-3">
                            <label className="form-label">Task</label>
                            <IDSelector ids={ ids.information } idSelector={ updateIDHandler } />
                            <br />
                            <input className="form-control" type="text" placeholder="Description" onChange={ e => updateDescription(e.target.value) } />
                        </div>
                        <br />
                        <button type="submit" className='btn btn-success'>Submit</button>
                    </form>
                </div>
            )
        }
    }
}

export default UpdateTaskPage;