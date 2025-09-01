import { Provider } from 'react-redux'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './components/Landing';
import { Fragment } from 'react/jsx-runtime';
import store from './redux/store';
import TaskPage from './components/Task/TasksPage';
import CreateTask from './components/Task/CreateTask';
import TimeEntry from './components/Task/TimeEntry';
import Reports from './components/Reports';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <Provider store={store}>
      <ToastContainer/>
      <BrowserRouter>
        <Fragment>
          <Routes>
            <Route exact path='/' element={<Landing />}></Route>
            <Route exact path='/tasks' element={<TaskPage />}></Route>
             <Route exact path='/daily-report' element={<Reports />}></Route>
            <Route exact path='/create-task' element={<CreateTask />}></Route>
             <Route exact path='/time-entry' element={<TimeEntry />}></Route>
          </Routes>
        </Fragment>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
