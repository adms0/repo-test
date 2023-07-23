import {useEffect, useState} from 'react';
import toast from 'react-hot-toast';
import {CSSTransition} from 'react-transition-group';

const Modal = ({type, setShowModal, task, updatedTodo, tasks, postedTodo}) => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('incomplete');
  const editMode = type === 'Edit' ? 'Edit' : 'Create';
  useEffect(() => {
    if (type === 'Edit' && task) {
      setTitle(task?.title);
      setStatus(task?.status);
    }
  }, [type, task, setShowModal]);

  const animationTiming = {
    enter: 400,
    exit: 1000,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === '') {
      toast.error('Please enter a title');
      return;
    }

    if (title && status) {
      if (type.toLowerCase() === 'create') {
        postedTodo({
          id: tasks?.length + 1,
          title,
          status,
          time: new Date().toLocaleString(),
        });
        toast.success('Task added successfully');
        setShowModal(false);
      }
      if (type === 'Edit') {
        if (task?.title !== title || task?.status !== status) {
          updatedTodo(task?.id, {...task, title, status});
          toast.success('Task updated successfully');
          setShowModal(false);
        } else {
          toast.error('error on updated');
          return;
        }
      }
    }
  };

  return (
    <CSSTransition
      in={setShowModal}
      timeout={animationTiming}
      mountOnEnter
      unmountOnExit
      classNames={{
        enter: '',
        enterActive: 'ModalOpen',
        exit: '',
        exitActive: 'ModalClosed',
      }}
    >
      {setShowModal && (
        <div className="overlay">
          <div className="modal">
            <div className="form-title-container">
              <h3>{`${editMode} Todo App`}</h3>
              <button onClick={() => setShowModal(false)}>X</button>
            </div>
            <div className="form-content" onSubmit={(e) => handleSubmit(e)}>
              <form>
                <label htmlFor="title">Title</label>
                <input
                  required
                  maxLength={30}
                  placeholder="please fill your task here"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e?.target?.value)}
                />
                <br />
                <label htmlFor="type">Status</label>
                <select
                  id="type"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="incomplete">Incomplete</option>
                  <option value="complete">Completed</option>
                </select>

                <input type="submit" className={editMode} />
              </form>
            </div>
          </div>
        </div>
      )}
    </CSSTransition>
  );
};

export default Modal;
