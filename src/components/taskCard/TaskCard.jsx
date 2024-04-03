import styles from './TaskCard.module.scss';
import { RiEditBoxLine } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import { handleDelete, handleHide } from '../../helper/ApiCallFunctions';

const TaskCard = ({ noteDetail, setAnyChange, setMultiDeleteNotes, openAddTaskModal, handleEditTask }) => {
    const updatedDate = noteDetail.updatedAt.substring(0, 10);
    const updatedTime = noteDetail.updatedAt.substring(11, 19);
    const addedDate = noteDetail.createdAt.substring(0, 10);
    const addedTime = noteDetail.createdAt.substring(11, 19);

    function handleEditFunction(noteDetail) {
        openAddTaskModal();
        handleEditTask(noteDetail);
    }

    function handleCheckBox(e, currentId) {
        if (e.target.checked) setMultiDeleteNotes(prev => [...prev, currentId]);
        else setMultiDeleteNotes(prev => [...prev].filter(ele => ele !== currentId));
    }

    return <div className={styles.taskCard} style={noteDetail.isHide ? { backgroundColor: "#ffe5ec" } : { backgroundColor: "#caf0f8" }}>
        <div className={styles.icons}>
            <input type="checkbox" onClick={(e) => handleCheckBox(e, noteDetail._id)} />
            <button onClick={() => handleHide(noteDetail._id, setAnyChange)} className={styles.hideUnhideButton} style={noteDetail.isHide ? { backgroundColor: "#ffffff" } : { backgroundColor: "#fca311" }}>{noteDetail.isHide ? "UNHIDE" : "HIDE"}</button>
            <RiEditBoxLine onClick={() => handleEditFunction(noteDetail)} />
            <MdDeleteForever onClick={() => handleDelete(noteDetail._id, setAnyChange)} />
        </div>
        <div className={styles.content}>
            <h2>{noteDetail.title}</h2>
            <p>{noteDetail.description}</p>
        </div>
        <div className={styles.addUpdateDate}>
            <p>Created At: {addedDate} {addedTime}IST</p>
            <p>Updated At: {updatedDate} {updatedTime}IST</p>
        </div>
    </div>
}

export default TaskCard;