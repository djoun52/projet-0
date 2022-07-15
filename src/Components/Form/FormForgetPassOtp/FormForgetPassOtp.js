import React, { useState, useContext, useEffect, useRef } from 'react'
import { ThemeContext } from '../../../Context/ThemeContext';
import axios from 'axios';
import { useNavigate, useSearchParams } from "react-router-dom";

export default function FormForgetPassOtp() {


    const [errorForm, setErrorForm] = useState({
        state: false,
        message: ''
    })
    const [activeOtpIndex, setaAtiveOtpIndex] = useState(0)
    const navigate = useNavigate()
    const { theme } = useContext(ThemeContext)
    const [isVerifying, setIsVerifying] = useState(true);
    const [isValid, setIsValid] = useState(false);
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const id = searchParams.get("id");


    useEffect(() => {
        isValidToken();
    }, []);
    
    const isValidToken = async () => {
        const { error, valid } = await verifyPasswordResetToken(token, id);
        setIsVerifying(false);
        if (error) {
            navigate("/auth/reset-password", { replace: true });
            return updateNotification("error", error);
        }

        if (!valid) {
            setIsValid(false);
            return navigate("/auth/reset-password", { replace: true });
        }

        setIsValid(true);
    };


    const handleForm = (e) => {
        e.preventDefault();




    }

    const handleInput = (e, key) => {


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
            )}
        </>
    )

}
