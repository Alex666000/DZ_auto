import React, {useEffect, useState} from "react"
import s2 from "../../s1-main/App.module.css"
import s from "./HW13.module.css"
import SuperButton from "../hw04/common/c2-SuperButton/SuperButton"
import axios from "axios"
import success200 from "./images/200.svg"
import error400 from "./images/400.svg"
import serverError500 from "./images/500.svg"

/*
* 1 - дописать функцию send
* 2 - дизэйблить кнопки пока идёт запрос
* 3 - сделать стили в соответствии с дизайном
* */
export type RootObjectYourBody = {
    success: boolean;
}
export type RootObjectYourQuery = {}


type ResponseType = {
    errorText: string
    info: string
    yourBody: { success: boolean }
    yourQuery: {} | any
}

const HW13 = () => {
    const [code, setCode] = useState("")
    const [text, setText] = useState("")
    const [info, setInfo] = useState("")
    const [image, setImage] = useState("")

    const send = (x?: boolean | null) => () => {
        const url = (x === null)
            ? "https://xxxxxx.ccc" // имитация запроса на не корректный адрес
            : "https://incubator-personal-page-back.herokuapp.com/api/3.0/homework/test"

        setInfo("...loading")

        axios.post<ResponseType>(url, {success: x})
            .then((res) => {
                console.log(res)

                if (res.status === 200) {
                    setImage(success200)
                    setText(res.data.errorText)
                    setInfo(res.data.info)
                }
            })
            .catch((err) => {
                console.log(err)

                setImage(error400)
                setText(err.response.data.errorText)
                setInfo(err.response.data.info)

                if (err.request.status === 500) {
                    setImage(serverError500)
                }
            })
            .finally(() => {
//.................................................................
            })

    }

    return (
        <div id={"hw13"}>
            <div className={s2.hwTitle}>Homework #13</div>

            <div className={s2.hw}>
                <div className={s.buttonsContainer}>
                    <SuperButton
                        id={"hw13-send-true"}
                        onClick={send(true)}
                        xType={"secondary"}
                        disabled={info === "...loading"}
                        // дописать

                    >
                        Send true
                    </SuperButton>
                    <SuperButton
                        id={"hw13-send-false"}
                        onClick={send(false)}
                        xType={"secondary"}
                        disabled={info === "...loading"}
                        // дописать

                    >
                        Send false
                    </SuperButton>
                    <SuperButton
                        id={"hw13-send-undefined"}
                        onClick={send(undefined)}
                        xType={"secondary"}
                        disabled={info === "...loading"}
                        // дописать

                    >
                        Send undefined
                    </SuperButton>
                    <SuperButton
                        id={"hw13-send-null"}
                        onClick={send(null)} // имитация запроса на не корректный адрес
                        xType={"secondary"}
                        disabled={info === "...loading"}
                        // дописать
                    >
                        Send null
                    </SuperButton>
                </div>

                <div className={s.responseContainer}>
                    <div className={s.imageContainer}>
                        {image && <img src={image} className={s.image} alt="status"/>}
                    </div>

                    <div className={s.textContainer}>
                        <div id={"hw13-code"} className={s.code}>
                            {code}
                        </div>
                        <div id={"hw13-text"} className={s.text}>
                            {text}
                        </div>
                        <div id={"hw13-info"} className={s.info}>
                            {info}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HW13
