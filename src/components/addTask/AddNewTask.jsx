import Modal from 'react-modal';
import styles from './addTask.module.scss';
import { useEffect, useState } from 'react';
import { addTaskApiCall, updateTaskApiCall } from '../../helper/ApiCallFunctions';
import { SweetAlert, SweetAlertError } from '../../helper/SweetAlert';

const modalStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#a2d2ff'
    },
}

Modal.setAppElement('#root');

const AddNewTask = ({ addTaskModal, setAddTaskModal, setAnyChange, editableTask, setEditableTask }) => {
    const isAnythingToEdit = !!editableTask;
    const [titleState, setTitleState] = useState('');
    const [descpState, setDescpState] = useState('');
    function closeModal() {
        setAddTaskModal(false);
        setEditableTask(null);
    }

    useEffect(() => {
        if (isAnythingToEdit) {
            setTitleState(editableTask.title);
            setDescpState(editableTask.description);
        }
    }, [editableTask]);

    function handleAddTaskForm(e) {
        e.preventDefault();
        const trimmedTitle = titleState.trim();
        const trimmedDescp = descpState.trim();
        if (!trimmedTitle || !trimmedDescp) {
            SweetAlertError('All Fields Are Mandatory!');
            setAddTaskModal(false);
            return;
        }
        isAnythingToEdit ? updateTaskApiCall(trimmedTitle, trimmedDescp, editableTask._id) : addTaskApiCall(trimmedTitle, trimmedDescp);
        isAnythingToEdit ? SweetAlert("Note Updated Successfully!") : SweetAlert("Note Created Successfully!");
        closeModal();
        setTitleState('');
        setDescpState('');
        setAnyChange(prev => !prev);
    }

    return <>
        <div>
            <Modal isOpen={addTaskModal} onRequestClose={closeModal} style={modalStyle} contentLabel='Add Task Modal'>
                <button onClick={closeModal} className={styles.modalCloseButton}>X</button>
                <h2>Add NOTE</h2>
                <form onSubmit={handleAddTaskForm} className={styles.addTaskForm}>
                    <input onChange={(e) => setTitleState(e.target.value)} value={titleState} type="text" placeholder='Title' />
                    <textarea onChange={(e) => setDescpState(e.target.value)} value={descpState} rows="4" placeholder='Description'></textarea>
                    <button type='submit'> {isAnythingToEdit ? "UPDATE" : "ADD"}</button>
                </form>
            </Modal>
        </div>
    </>
}

export default AddNewTask;