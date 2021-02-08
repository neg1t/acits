import React from 'react'
import s from "../styles/modules/modal.module.scss"

const Modal = ({
  active,
  setActive,
  children,
  setLoading
}) => {

  return (
    <div 
      className={active ?  s.modal + ' ' + s.active : s.modal}
      onClick={() => {
        setActive(false)
        setLoading(false)
      }}
    >
      <div 
        className={active ?  s.content + ' ' + s.active : s.content} 
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

export default Modal