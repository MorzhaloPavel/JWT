import { observer } from 'mobx-react-lite';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { Context } from '.';
import LoginForm from './components/LoginForm';
import { IUser } from './models/response/IUser';
import UserService from './services/UserService';

function App() {
  const {store} = useContext(Context)
  const [users, setUsers] = useState<IUser[]>([])

  useEffect(() => {
    if(localStorage.getItem('token')) {
      store.checkAuth()
    }
  })

  async function getUsers() {
    try {
      const response = await UserService.fetchUser()
      setUsers(response.data)
    } catch (e) {
      
    }
  }

  if(store.isLoading) {
    return (
      <div>Загрузка...</div>
    )
  }

  if(!store.isAuth) {
    return (
      <> 
      <h1>Авторизуйтесь</h1>
        <LoginForm/>
      </>
    )
  }

  return (
    <div>
      <h1>Пользователь авторизован ${store.user.email}</h1>
      <h1>{store.user.isActivated ? 'Аккаунт подтвержден по почте' : 'Подтвердите аккаунт'}</h1>
      <button onClick={() => store.logout}>Выйти</button>
      <div>
        <button onClick={getUsers}>Получить список пользователей</button>
      </div>
      {users.map( user => 
        <div key={user.email} >{user.email}</div>
      )}
    </div>
  );
}

export default observer(App)
