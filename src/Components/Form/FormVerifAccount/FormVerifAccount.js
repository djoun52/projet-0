import React, { useState, useContext, useEffect, useRef } from 'react'
import "../Form.css";
import { ThemeContext } from '../../../Context/ThemeContext';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'
// import { useSelector } from 'react-redux';

export default function FormVerifAccount() {

  const opt_lenght = 6

  const [otpInp, setOtpInp] = useState(new Array(opt_lenght).fill(""))

  const [errorForm, setErrorForm] = useState({
    state: false,
    message: ''
  })
  const [activeOtpIndex, setaAtiveOtpIndex] = useState(0)
  const inputRef = useRef()
  const navigate = useNavigate()
  const { theme } = useContext(ThemeContext)

  const params = useParams()

  useEffect(() => {
    inputRef.current?.focus()

  }, [activeOtpIndex])



  const handleForm = (e) => {
    e.preventDefault();

    let info = {
      userId: params.userId,
      OTP: otpInp.join('')
    }

    axios.post('http://localhost:4000/verify-email', info, { withCredentials: true })
      .then(response => {
        setErrorForm(false)
        navigate("/")
      })
      .catch(() => {
        setErrorForm({
          state: true,
          message: ''
        })
      });

  }

  const handleInput = (e, key) => {
    let valueInputin = e.target.value
    let valueInputOut
    let newArrawState = [...otpInp];
    // console.log(e.target)
    for (let index = 0; index < otpInp.length; index++) {
      if (key === index) {
        if (valueInputin.length === 1) {
          valueInputOut = e.target.value
        } else if (valueInputin.length === 2) {
          for (let k = 0; k < valueInputin.length; k++) {
            if (otpInp[index] !== valueInputin[k]) {
              valueInputOut = valueInputin[k]
            }
          }
          if (!valueInputOut) {
            valueInputOut = valueInputin[0]
          }
        } else if (valueInputin.length > 2) {
          setErrorForm({
            state: true,
            message: 'don\'t copy '
          })
          return false
        }

        newArrawState[index] = valueInputOut;
      }
    }

    setOtpInp(newArrawState);
    // console.log(otpInp)
    if (key < 5 ){
      setaAtiveOtpIndex(key + 1)
    }else{
      setaAtiveOtpIndex(0)
    }



  }


  return (
    <>

      <form className="container-form" onSubmit={handleForm}>

        <label className="mb-1" htmlFor="otp">Votre code</label>
        <div className="flex justify-ctr">
          {otpInp.map((_, index) => {
            return (
              <input
                key={index}
                ref={activeOtpIndex === index ? inputRef : null}
                type="number"
                value={otpInp[index] || ""}
                onChange={(e) => handleInput(e, index)}
                className={theme ? "arrayinp-dark" : "arrayinp"}
              />
            )
          })}

        </div>

        <button
          className={theme ? "btn-dark center" : "btn-light center"}
          type="submit">Valider</button>
      </form>
      {errorForm.state && (
        <>
          <h2>Error formulaire</h2>
          <p>{errorForm.message}</p>
        </>
      )
      }
    </>
  )

}
