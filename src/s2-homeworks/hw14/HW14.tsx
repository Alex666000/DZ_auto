import React, {useCallback, useEffect, useState} from "react"
import s2 from "../../s1-main/App.module.css"
import s from "./HW14.module.css"
import axios from "axios"
import SuperDebouncedInput from "./common/c8-SuperDebouncedInput/SuperDebouncedInput"
import {useSearchParams} from "react-router-dom"
import {debounce} from "lodash";

/*
* 1 - дописать функцию onChangeTextCallback в SuperDebouncedInput
* 2 - дописать функцию sendQuery в HW14
* 3 - дописать функцию onChangeText в HW14
* 4 - сделать стили в соответствии с дизайном
* 5 - добавить HW14 в HW5/pages/JuniorPlus
* */

const getTechs = (find: string) => {
    return axios
        .get<{ techs: string[] }>(
            `https://incubator-personal-page-back.herokuapp.com/api/3.0/homework/test2`,
            {params: {find}}
        )
        .catch((e) => {
            alert(e.response?.data?.errorText || e.message)
        })
}

const HW14 = () => {
    const [techs, setTechs] = useState<string[]>([])
    const [find, setFind] = useState("")
    const [isLoading, setLoading] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()


    const sendQuery = (value: string) => {
        setLoading(true)
        setSearchParams(value)
        getTechs(value)
            .then((res) => {
                setLoading(false)
                // делает студент
                // сохранить пришедшие данные - после ответа
                res && setTechs(res.data.techs)
            })
            .catch((e) => {
                // console.error(e)
                setTechs([])
            })
    }

    // необязательно библиотечку устанавливать

    /*  const updateSearchValue = useCallback(debounce((str: string) => {
          setSearchParams(str)
      }, 15000), [])*/

    const onChangeText = (value: string) => {
        setFind(value)
        // делает студент
        // добавить/заменить значение в квери урла
        // setSearchParams(
        setSearchParams(value)
        // updateSearchValue(value)
        //
    }

    useEffect(() => {
        const params = Object.fromEntries(searchParams)
        sendQuery(params.find || "")
        setFind(params.find || "")

    }, [])

    const mappedTechs = techs.map(t => (
        <div key={t} id={"hw14-tech-" + t} className={s.tech}>
            {t}
        </div>
    ))

    return (
        <div id={"hw14"}>
            <div className={s2.hwTitle}>Homework #14</div>

            <div className={s2.hw}>
                <SuperDebouncedInput
                    id={"hw14-super-debounced-input"}
                    value={find}
                    onChangeText={onChangeText}
                    onDebouncedChange={sendQuery}
                />

                <div id={"hw14-loading"} className={s.loading}>
                    {isLoading ? "...ищем" : <br/>}
                </div>

                {mappedTechs}
            </div>
        </div>
    )
}

export default HW14
