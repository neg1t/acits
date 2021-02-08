import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { useHistory } from "react-router-dom"
import Modal from '../Components/Modal'
import Animal from '../Components/Animal'
import { getCurrentAnimal, logout, getTodayAnimals, checkResponse } from '../api/requests'
import { logoutAction, fetchTodayAnimalsAction } from '../redux/actions'
import s from '../styles/modules/today.module.scss'

let TodayPage = ({
  todayAnimals, 
  dispatchToday,
  dispatchLogout
}) => {
  const token = localStorage.getItem('token')
  const history = useHistory()
  const [modalActive, setModalActive] = useState(false)
  const [currentAnimal, setCurrentAnimal] = useState({})
  const [loading, setLoading] = useState(false)

  const onAnimalClickHandler = async (id) => {
    getCurrentAnimal(id, token).then(res => {
      checkResponse(res)
      return res.json()
    }).then(data => {
      setCurrentAnimal(data)
      setLoading(true)
    }).catch(err => {
      if (err) {
        return logout(dispatchLogout, history)
      }
    })
  }

  const fetchTodayAnimals = async () => {
    getTodayAnimals(token).then(res => {
      checkResponse(res)
      return res.json()
    }).then(data => {
      dispatchToday(data.results)
    }).catch(err => {
      if (err) {
        return logout(dispatchLogout, history)
      }
    })
  }

  useEffect(() => {
    if (todayAnimals.length === 0) {
      fetchTodayAnimals()
    } 
  }, [])

  return (
    <div className={s.container}>
      <h1>Назначения на сегодня</h1>
      <table className={s.today}>
        <thead>
          <tr>
            <th>Кличка</th>
            <th>Назначение</th>
          </tr>
        </thead>
        <tbody>
          {todayAnimals.map(i => (
            <tr 
              key={i.prescription} 
              onClick={() => {
                  onAnimalClickHandler(i.animal.id)
                  setModalActive(true)
                }}
            >
              <td>{i.animal.name}</td>
              <td>{i.my_type}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal active={modalActive} setActive={setModalActive} animal={currentAnimal} setLoading={setLoading}>
        <Animal animal={currentAnimal} loading={loading} />
      </Modal>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    todayAnimals: state.reducer.todayAnimals,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    dispatchToday: (data) => dispatch(fetchTodayAnimalsAction(data)),
    dispatchLogout: () => dispatch(logoutAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodayPage)