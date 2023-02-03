import React from "react"
import SuperButton from "../hw04/common/c2-SuperButton/SuperButton"
import s2 from "../../s1-main/App.module.css"
import preloader from "./bll/Spinner-2.gif";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "./bll/store";
import {loadingAC} from "./bll/loadingReducer";

/*
* 1 - в файле loadingReducer.ts дописать типы и логику
* 2 - получить isLoading из редакса
* 3 - дописать функцию setLoading
* 4 - сделать стили в соответствии с дизайном
* */

const HW10 = () => {
    // useSelector, useDispatch // пишет студент
    const dispatch = useDispatch()
    const isLoading = useSelector<AppStoreType, boolean>(state => state.loading.isLoading)



    const setLoading = () => { // пишет студент // показать крутилку на 1,5 секунд
        // показываем крутилку
        dispatch(loadingAC(true))
// через 1.5 сек убираем её
        setTimeout(() => {
            dispatch(loadingAC(false))
        }, 1500)
        // console.log('loading...')
    }

    return (
        <div id={"hw10"}>
            <div className={s2.hwTitle}>Homework #10</div>
            <div className={s2.hw}>
                {isLoading ? (
                    <div id={"hw10-loading"}>
                        <img src={preloader}/>
                    </div>
                ) : (
                    <SuperButton
                        id={"hw10-button-start-loading"}
                        onClick={setLoading}
                    >
                        Set loading...
                    </SuperButton>
                )}
            </div>
        </div>
    )
}

export default HW10
