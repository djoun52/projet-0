import React from 'react'
import "../Form.css";
import { ThemeContext } from '../../../Context/ThemeContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';


export default function FormVerifAccount() {

  const [input, setInput] = useState({
    token: '',
  })
  const [errorForm, setErrorForm] = useState(false)
  const navigate = useNavigate()
  const { theme } = useContext(ThemeContext)
  const { id } = useSelector(state => ({
    ...state.userReducer,
  }))
  const handleForm = (e) => {
    e.preventDefault();
    let info = {
      userId: id,
      OTP: input.token
    }
    axios.post('http://localhost:4000/verify-email', info, { withCredentials: true })
      .then(response => {
        setInput({
          token: '',
        })
        setErrorForm(false)
        navigate("/")
      })
      .catch(() => {
        setErrorForm(true)
      });

  }


  const changeInput = (e) => {

    if (e.target.classList.contains('inp-token')) {
      const newObjState = { ...input, token: e.target.value };
      setInput(newObjState);
    }
  }
  return (
    <>
      <form className="container-form" onSubmit={handleForm}>

        <label htmlFor="password">votre code</label>
        <input
          type="number"
          name="token"
          id="token"
          className='inp-token'
          value={input.token}
          onInput={changeInput}
          placeholder="" />
        <button
          className={theme ? "btn-dark" : "btn-light"}
          type="submit">Valider</button>
      </form>
      {
        errorForm && (
          <h2>Error formulaire</h2>
        )
      }
    </>
  )

}
