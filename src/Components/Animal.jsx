import React from 'react'
import s from '../styles/modules/animal.module.scss'

const Animal = ({
  animal,
  loading
}) => {
  const today = new Date().getFullYear()
  const birthYear = new Date(animal.birth_date).getFullYear()
  const age = today - birthYear

  if (!loading) {
    return (
      <div>Loading...</div>
    )
  }
  return (
    <div className={s.animal}>
      <h1>Карточка животного</h1>
      {animal && (
        <table >
          <thead>
            <tr>
              <th>Кличка</th>
              <th>Тип</th>
              <th>Подтип</th>
              <th>Возраст</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{animal.name ? animal.name : 'Неизвестна'}</td>
              <td>{animal.spec_parent_name ? animal.spec_parent_name : 'Неизвестен'}</td>
              <td>{animal.spec_name ? animal.spec_name : 'Неизвестен'}</td>
              <td>{animal.birth_date ? age : 'Неизвестен'}</td>
            </tr>
        </tbody>
      </table>
      )}
    </div>
  )
}

export default Animal