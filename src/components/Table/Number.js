import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import firebase from '../../Firebase';


const Number = () => {
  const val = useSelector(state => state);

  const [update, setUpdate] = useState([])
  const snapshotToArray = (snapshot) => {
    const returnArr = [];

    snapshot.forEach((childSnapshot) => {
        const item = childSnapshot.val();
        // item.key = childSnapshot.key;
        returnArr.push(item);
    });

    return returnArr;
}

  useEffect(()=>{
    const fetchData = async () => {
      firebase.database().ref('phone/').on('value', resp =>{
        setUpdate([]);
        setUpdate(snapshotToArray(resp))
      })
    }
    fetchData()
  }, [val]);

  
  return(
  <section className="table">
    <p className="table__text">Телефон:</p>
    <ul>
      {
        update.map(res =>{
          return <li key={Math.random()} className="table__text">+{res.text}</li>
        })
      }
      </ul>
  </section> 
)}

export default Number;
