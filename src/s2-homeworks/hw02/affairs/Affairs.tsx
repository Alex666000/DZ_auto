import React from "react"
import Affair from "./affair/Affair"
import {AffairType, FilterType} from "../HW2"
import s from "./Affairs.module.css"

type AffairsPropsType = {
    data: AffairType[] // need to fix any
    setFilter: (filter: FilterType) => void
    deleteAffairCallback: (_id: number) => void
    filter: FilterType
}

function Affairs(props: AffairsPropsType) {
    // убрали дублирование кода
    const setFilter = (filter: FilterType) => {
        // need to fix
        props.setFilter(filter)

    }
    /* дублирование кода: см.выше
        const setAll = () => {
            // need to fix
            props.setFilter("all")

        }
        const setHigh = () => {
            // need to fix
            props.setFilter("high")
        }
        const setMiddle = () => {
            // need to fix
            props.setFilter("middle")
        }
        const setLow = () => {
            // need to fix
            props.setFilter("low")
        }*/

    const cnAll = s.button + " " + s.all + (props.filter === "all" ? " " + s.active : "")
    const cnHigh = s.button + " " + s.high + (props.filter === "high" ? " " + s.active : "")
    const cnMiddle = s.button + " " + s.middle + (props.filter === "middle" ? " " + s.active : "")
    const cnLow = s.button + " " + s.low + (props.filter === "low" ? " " + s.active : "")

    const mappedAffairs = props.data.map((affair: AffairType) => (
        <Affair
            key={affair._id} // key ОБЯЗАТЕЛЬНЫ в 99% - так что лучше их писать всегда при создании компонент в мапе
            affair={affair}
            deleteAffairCallback={props.deleteAffairCallback}
        />
    ))

    return (
        <div>
            <div className={s.buttonContainer}>
                <button
                    id={"hw2-button-all"}
                    onClick={() => {
                        setFilter("all")
                    }}
                    className={cnAll}
                >
                    All
                </button>
                <button
                    id={"hw2-button-high"}
                    onClick={() => {
                        setFilter("high")
                    }} className={cnHigh}
                >
                    High
                </button>
                <button
                    id={"hw2-button-middle"}
                    onClick={() => {
                        setFilter("middle")
                    }}
                    className={cnMiddle}
                >
                    Middle
                </button>
                <button
                    id={"hw2-button-low"}
                    onClick={() => {
                        setFilter("low")
                    }}
                    className={cnLow}
                >
                    Low
                </button>
            </div>
            <div className={s.affairs}>{mappedAffairs}</div>
        </div>
    )
}

export default Affairs
