import { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { viewTasks } from '../../utilFunctions/viewTasks';
import TaskType from '../../dataTypes/taskDataType';

// View Tasks page
const ViewTasksPage: FC = () => {

    const viewTaskQuery = useQuery({
        queryKey: ['view', 'task'],
        queryFn: viewTasks
    });

    if (viewTaskQuery.isPending){
        return (
            <div className='view-task-page'>
                Loading..
            </div>
        )
    }
    else if (viewTaskQuery.isSuccess){
        return (
            <div className='view-task-page'>
                <h1>View Tasks</h1>
                <p><i>Table below to view tasks</i></p>
                <table style={{ marginLeft: 'auto', marginRight: 'auto', width: '50%' }} className="table">
                    <thead>
                        <tr>
                            <th scope="col">Item Id</th>
                            <th scope="col">Task</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            viewTaskQuery.data!.LRUData.map((task: TaskType) => {
                                return (
                                    <tr>
                                        <th scope="row">{ task.id }</th>
                                        <td>{ task.description }</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
    else {
        return (
            <div className='view-task-page'>
                <h1>Error Loading Data..</h1>
            </div>
        )
    }
}

export default ViewTasksPage;