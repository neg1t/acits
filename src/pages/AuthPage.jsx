import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux';
import s from '../styles/modules/auth.module.scss'
let AuthPage = ({
  dispatch,
  toaster
}) => {
  const { register, handleSubmit } = useForm()
  useEffect(() => {
    if (toaster) {
      return toast.error('Время действия токена закончилось. Пожалуйста, войдите снова!', {
        position: "top-right",
        autoClose: 6000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        })
    }
  }, [toaster])

  const getAuth = async (formData) => {
    const userData = {username: formData.login, password: formData.password}
    const options = {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(userData)}

    await fetch('https://acits-api.herokuapp.com/api/token/', options).then(res => {
      if (!res.ok) {
        return toast.error('Имя пользователя или пароль введены не верно', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          })
      }
      return res.json()
    }).then(data => {
      if (data.access) {
        localStorage.setItem('token', data.access)
        dispatch({
          type: 'AUTH'
        })
      }
    })
  }
  return (
    <div className={s.auth}>
      <form onSubmit={handleSubmit(getAuth)}>
        <label htmlFor="login">Логин</label>
        <input placeholder='username' type="text" name='login' ref={register({required: true})} />
        <label htmlFor="password">Пароль</label>
        <input placeholder='password' type="password" name='password' ref={register({required: true})} />
        <button type='submit'>Войти</button>
      </form>
      <ToastContainer />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    toaster: state.reducer.toast
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage)