import {useEffect, useState} from 'react';
import Modal from './Modal';

const ListHeader = ({listName, postTodo, getDataFilter}) => {
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');

  const updateFilter = (e) => {
    setFilterStatus(e?.target?.value);
  };

  useEffect(() => {
    if (filterStatus) {
      getDataFilter(filterStatus);
    }
  }, [filterStatus]);

  return (
    <div className="list-header">
      <h1>{listName}</h1>
      <div className="button-container">
        <button className="create" onClick={() => setShowModal(!showModal)}>
          Add Task
        </button>
        <select
          className="filter"
          onClick={(e) => updateFilter(e)}
          value={filterStatus}
          onChange={(e) => setFilterStatus(e?.target?.value)}
        >
          <option value="all">All</option>
          <option value="incomplete">Incomplete</option>
          <option value="complete">Completed</option>
        </select>
      </div>
      {showModal && (
        <Modal
          type={'create'}
          setShowModal={setShowModal}
          postedTodo={postTodo}
        />
      )}
    </div>
  );
};

export default ListHeader;
