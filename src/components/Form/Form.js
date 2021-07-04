import React, { useState} from 'react';
import { config } from '../../utils/config';
import { useDispatch} from 'react-redux';
import addPhone from '../actions/actions';
import firebase from '../../Firebase';

const Form = () => {
  const [selectValue, setSelectValue] = useState('7');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(false)
  // const val = useSelector(state => state);
  const dispath = useDispatch();

  const selectVal = e => {
    setSelectValue(e.target.value);
  }



  const inpValue = e =>{
    if(isNaN(e.target.value)){
      setError(true)
      e.target.value = '';
    } else {
      setError(false)
      setPhone(e.target.value)
    }
   
  }

  const handleSetPhone = (e) =>{
    e.preventDefault();
    if(phone !== ''){
      const res = dispath(addPhone(`${selectValue} ${phone}`));
      const newPhone = firebase.database().ref('phone/').push();
      newPhone.set(res) 
    }
    
    setPhone('')
  }

  const flag = () =>{
    let flag;
    config.map(c=>{
      return selectValue == c.code ? flag  = c.flag : false;
    })
    return flag;
  }

  return (
    <form 
      onSubmit={handleSetPhone}
      className="telephon" 
    >
        <div className="telephon__input-form">
        <select value={selectValue} onChange={selectVal} className={`telephon__select ${flag()}`}>
            {
              config.map(reg =>{
                return <option key={reg.country} value={reg.code}  >+{reg.code}</option>
              })
            }
          </select>
          <input 
            type="phone" 
            className="telephon__input"
            minLength="3" 
            maxLength="10" 
            onChange={inpValue}
            value={phone}
          ></input>
          
        </div>
        <p className={error ? `telephon__error-show`:`telephon__error`}>Можно использовать только цифры</p>
        <button className="telephon__btn">Отправить</button>
      </form>
  )
}

export default Form;