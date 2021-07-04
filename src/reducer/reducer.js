export  const phoneList = (state = [], action) => {
  switch(action.type) {
    case "ADD_PHONE":
      return [...state, {text:action.text}]
    default : return state
  }
}

