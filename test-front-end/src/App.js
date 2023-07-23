import {useEffect, useState} from 'react';
import './App.css';
import ListHeader from './components/ListHeader';
import ListItem from './components/ListItem';
import {httpHelper} from './utils/helper';

function App() {
  const [stateData, setStateData] = useState(null);
  const url = 'http://localhost:5420/todos';
  const api = httpHelper();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    api
      .get(url)
      .then((result) => setStateData(result))
      .catch((err) => console.log(err));
  };

  const filterData = (filter, filt) => {
    if (filt === 'all') {
      setStateData(filter);
    } else if (filt === 'incomplete') {
      const data = filter.filter((e) => e?.status === filt);
      setStateData(data);
    } else if (filt === 'complete') {
      const data = filter.filter((e) => e?.status === filt);
      setStateData(data);
    }
  };

  const getDataFilter = (filt) => {
    api
      .get(url)
      .then((result) => {
        filterData(result, filt);
      })
      .catch((err) => console.log(err));
  };

  const deleteTodo = (id) => {
    api
      .del(`${url}/${id}`, {})
      .then((res) => getData())
      .catch((err) => console.log(err));
  };

  const updateTodo = (id, todo) => {
    api
      .put(`${url}/${id}`, {body: todo})
      .then((res) => getData())
      .catch((err) => console.log(err));
  };

  const postTodo = (todo) => {
    api
      .post(`${url}`, {body: todo})
      .then((res) => getData())
      .catch((err) => console.log(err));
  };

  if (!stateData) return null;

  return (
    <div className="app">
      <ListHeader
        listName={'Todo List'}
        postTodo={postTodo}
        getDataFilter={getDataFilter}
      />
      {stateData?.map((task) => (
        <ListItem
          tasks={stateData}
          key={task?.id}
          task={task}
          status={task?.status}
          time={task?.time}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
      ))}
    </div>
  );
}

export default App;
