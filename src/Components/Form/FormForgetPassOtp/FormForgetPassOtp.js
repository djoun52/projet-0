import React, { useState, useContext, useEffect, useRef } from 'react'
import { ThemeContext } from '../../../Context/ThemeContext';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'


export default function FormForgetPassOtp() {
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

        axios.post('http://localhost:4000/reset-password', info, { withCredentials: true })
            .then(response => {
                setErrorForm({
                    state: false,
                    message: ''
                })
                // navigate("/")
            })
            .catch(() => {
                setErrorForm({
                    state: true,
                    message: 'LE CODE NE CORESPOND PAS'
                })
            });

    }

    const handleInput = (e, key) => {
        let valueInputin = e.target.value
        let valueInputOut
        let newArrawState = [...otpInp];
        // console.log(e.target)
        navigator.clipboard.readText().then(data => {

            if (valueInputin === data) {
                copyOtp()
                return true
            }
        })

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
                }

                newArrawState[index] = valueInputOut;
            }
        }

        setOtpInp(newArrawState);
        // console.log(otpInp)
        if (key < 5) {
            setaAtiveOtpIndex(key + 1)
        } else {
            setaAtiveOtpIndex(0)
        }



    }

    async function copyOtp() {
        let newOtp = new Array(opt_lenght).fill("");
        let copyText = await navigator.clipboard.readText();

        if (copyText.length === 6) {
            for (let index = 0; index < otpInp.length; index++) {
                newOtp[index] = copyText[index];
            }
            setOtpInp(newOtp)
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
            <button
                className={theme ? "btn-dark center mt-1" : "btn-light center mt-1"}
                onClick={copyOtp}
            >
                Copier le code
            </button>

            {errorForm.state && (
                <>
                    <h2>Error formulaire</h2>
                    <p>{errorForm.message}</p>
                </>
            )}
        </>
    )

}
