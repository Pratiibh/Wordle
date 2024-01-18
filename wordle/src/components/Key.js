import React, { useContext } from 'react'
import { AppContext } from '../App'

function Key({ keyVal , bigKey, disabled, enabled, almost}) {
  const { onSelectLetter, onDelete, onEnter } = useContext(AppContext)

  const selectLetter = () => {
    if(keyVal === "ENTER") {
      onEnter();
    } else if (keyVal === "DELETE") {
      onDelete();
    } else {
      onSelectLetter(keyVal);
    }
  }
  return (
    <div className="key" id={bigKey ? "big": enabled ? "enabled" : almost ? "almostEnabled" : disabled && "disabled"} onClick={selectLetter}>
      {keyVal}
      </div>
  )
}

export default Key