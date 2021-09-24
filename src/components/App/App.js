// import { useState } from 'react';
import Auth from '../Auth/Auth';
import Regist from '../Regist/Regist';
import TaskWrapper from '../TaskWrapper/TaskWrapper';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import './App.css';
import { useSelector } from 'react-redux';

function App() {

  const {isAuth} = useSelector(state => state.authReducer)

  return (
    <div className="App">
      {/* <nav>
        <Link className='App__link' to='/'>Home</Link>
        <Link className='App__link' to='/login'>Sign in</Link>
        <Link className='App__link' to='/regist'>Sign up</Link>
      </nav> */}

      {isAuth || localStorage.getItem('token') ?

      <Switch>
        <Route exact path='/'>
          <TaskWrapper/>
        </Route>
        <Redirect to='/' />
      </Switch> 

      :

      <Switch>
        <Route exact path='/login'>
          <Auth/>
        </Route>

        <Route exact path='/regist'>
          <Regist/>
        </Route>

        <Redirect to='/login' />
      </Switch>
      }
    </div>
  );
}

export default App;
