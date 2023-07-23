import {Fragment, useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import Modal from './Modal';
import {format} from 'date-fns';
import toast from 'react-hot-toast';
import CheckButton from './CheckButton';

const child = {
  hidden: {y: 20, opacity: 0},
  visible: {
    y: 0,
    opacity: 1,
  },
};

const ListItem = ({
  task,
  status,
  time,
  deleteTodo,
  updateTodo,
  tasks,
  postTodo,
}) => {
  const [stateCheck, setStateCheck] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  useEffect(() => {
    if (status === 'complete') {
      setStateCheck(true);
    } else {
      setStateCheck(false);
    }
  }, [status]);

  const handleDelete = () => {
    deleteTodo(task?.id);
    toast.success('Todo Deleted Successfully');
  };

  const handleCheck = () => {
    setStateCheck(!stateCheck);
    updateTodo(task?.id, {
      ...task,
      status: stateCheck ? 'incomplete' : 'complete',
    });
    toast.success('Todo Update Successfully');
  };

  return (
    <Fragment>
      <motion.div className="list-item" variants={child}>
        <div className="detail-item">
          <CheckButton checked={stateCheck} handleCheck={() => handleCheck()} />
          <div className="detail-teks">
            <p
              className={`taks-title ${
                status === 'complete' ? 'completed' : ''
              }`}
            >
              {task.title}
            </p>
            <p className="taks-time">
              {format(new Date(time), 'p, MM/dd/yyyy')}
            </p>
          </div>
        </div>
        <div className="detail-actions">
          <div className="button-container">
            <button className="edit" onClick={() => setUpdateModalOpen(true)}>
              EDIT
            </button>
            <button className="delete" onClick={() => handleDelete()}>
              DELETE
            </button>
          </div>
        </div>
      </motion.div>
      {updateModalOpen && (
        <Modal
          type={'Edit'}
          setShowModal={setUpdateModalOpen}
          task={task}
          tasks={tasks}
          updatedTodo={updateTodo}
        />
      )}
    </Fragment>
  );
};

export default ListItem;
