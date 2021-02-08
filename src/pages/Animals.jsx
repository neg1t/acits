import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { useHistory } from "react-router-dom"
import Modal from '../Components/Modal'
import Animal from '../Components/Animal'
import { getCurrentAnimal, logout, getAllAnimals, checkResponse } from '../api/requests'
import { logoutAction, fetchAnimalsAction } from '../redux/actions'
import s from '../styles/modules/animals.module.scss'

let Animals = ({
  animals,
  dispatchAnimals,
  dispatchLogout
}) => {
  const token = localStorage.getItem('token')
  const history = useHistory()
  const [modalActive, setModalActive] = useState(false)
  const [currentAnimal, setCurrentAnimal] = useState({})
  const [loading, setLoading] = useState(false)

  const fetchAnimals = async () => {
    getAllAnimals(token).then(res => {
      checkResponse(res)
      return res.json()
    }).then(data => {
      dispatchAnimals(data.results)
    }).catch(err => {
      if (err) {
        return logout(dispatchLogout, history)
      }
    })
  }

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

  useEffect(() => {
    if (animals.length === 0) {
      fetchAnimals()
    }
  }, [])

  return (
    <div className={s.container}>
      <div className={s.animals}>
        <h1>Животные в приюте</h1>
        <table >
          <thead>
            <tr>
              <th>Кличка</th>
              <th>Тип</th>
              <th>Подтип</th>
            </tr>
          </thead>
          <tbody>
            {animals.map(i => (
              <tr 
                key={i.id} 
                onClick={() => {
                  onAnimalClickHandler(i.id)
                  setModalActive(true)
                }}
              >
                <td>{i.name}</td>
                <td>{i.spec_parent_name}</td>
                <td>{i.spec_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal active={modalActive} setActive={setModalActive} animal={currentAnimal} setLoading={setLoading}>
        <Animal animal={currentAnimal} loading={loading} />
      </Modal>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    animals: state.reducer.animals
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    dispatchAnimals: data => dispatch(fetchAnimalsAction(data)),
    dispatchLogout: () => dispatch(logoutAction())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Animals);