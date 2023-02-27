import React, {useEffect, useState} from "react"
import s2 from "../../s1-main/App.module.css"
import s from "./HW15.module.css"
import axios, {AxiosError} from "axios"
import SuperPagination from "./common/c9-SuperPagination/SuperPagination"
import {useSearchParams} from "react-router-dom"
import SuperSort from "./common/c10-SuperSort/SuperSort"
/*
* 1 - дописать SuperPagination
* 2 - дописать SuperSort
* 3 - проверить pureChange тестами
*
* 3 - дописать sendQuery, onChangePagination, onChangeSort в HW15
* 4 - сделать стили в соответствии с дизайном
* 5 - добавить HW15 в HW5/pages/JuniorPlus
* */

type TechType = {
    id: number
    tech: string
    developer: string
}

type ParamsType = {
    sort: string
    page: number
    count: number
}

const getTechs = (params: ParamsType) => {
    return axios
        .get<{ techs: TechType[], totalCount: number }>(
            "https://incubator-personal-page-back.herokuapp.com/api/3.0/homework/test3",
            // `https://incubator-personal-page-back.herokuapp.com/api/3.0/homework/test3/?page=${params.page}&count=${params.count}`,
            // параметры отправляемые на сервер:
            {params}
        )
        .catch((e) => {
            alert(e.response?.data?.errorText || e.message)
        })
}

const HW15 = () => {
    const [sort, setSort] = useState("")
    // текущая страница (каждая страница возвращает по 4 записи --- count)
    const [page, setPage] = useState(1)

    // размер страницы (записей tech - кол-во элементов что храним на каждой стр.) - у нас 4 tech === 4
    const [count, setCount] = useState(4)

    // стейт для загрузки
    const [idLoading, setLoading] = useState(false)

    // всего пользователей всех techs === 100
    const [totalCount, setTotalCount] = useState(100)

    const [searchParams, setSearchParams] = useSearchParams()
    const [techs, setTechs] = useState<TechType[]>([])

    const sendQuery = (params: any) => {
        setLoading(true)
        getTechs(params)
            .then((res) => {
                // делает студент
                // сохранить пришедшие данные
                if (res) {
                    setTechs(res.data.techs)
                    setTotalCount(res.data.totalCount)
                }
            })
            .catch((error: AxiosError) => {
                alert("error")
            })
            .finally(() => {
                setLoading(false)
            })
    }
// при изменении страницы по клику на span снова отправляем запрос
    const onChangePagination = (newPage: number, newCount: number) => {
        // делает студент
        // setPage(
        setPage(newPage || 1)
        // setCount(
        setCount(newCount || 4)
        // sendQuery(
        const params = Object.fromEntries(searchParams)
        const pageQuery = newPage !==  1 ? newPage.toString() : page
        const countQuery = newCount !==  4 ? newCount.toString() : count
        sendQuery({page: pageQuery, count: countQuery})
        // setSearchParams(
        setSearchParams(params)

        console.log(params)
    }

    const onChangeSort = (newSort: string) => {
        // делает студент
        // setSort(
        setSort(newSort)
        // setPage(1) // при сортировке сбрасывать на 1 страницу
        setPage(1)
        // sendQuery(
        const params = Object.fromEntries(searchParams)
        if (params.pageQuery !== '' || params.countQuery !== '') {
            sendQuery({newSort})
        }
        // setSearchParams(
        setSearchParams(params)

    }
// получаем все элементы - делаем запрос к АПИ
    useEffect(() => {
        const params = Object.fromEntries(searchParams)
        sendQuery({page: params.page, count: params.count})
        setPage(+params.page || 1)
        setCount(+params.count || 4)
    }, [])

    const mappedTechs = techs.map(tech => (
        <div key={tech.id} className={s.row}>
            <div id={"hw15-tech-" + tech.id} className={s.tech}>
                {tech.tech}
            </div>

            <div id={"hw15-developer-" + tech.id} className={s.developer}>
                {tech.developer}
            </div>
        </div>
    ))

    return (
        <div id={"hw15"}>
            <div className={s2.hwTitle}>Homework #15</div>

            <div className={s2.hw}>
                {idLoading && <div id={"hw15-loading"} className={s.loading}></div>}
                <SuperPagination
                    currentPage={page}
                    itemsCountForPage={count}
                    totalCount={totalCount}
                    onChange={onChangePagination}
                />

                <div className={s.rowHeader}>
                    <div className={s.techHeader}>
                        tech
                        <SuperSort
                            sort={sort}
                            value={"tech"}
                            onChange={onChangeSort}/>
                    </div>

                    <div className={s.developerHeader}>
                        developer
                        <SuperSort
                            sort={sort}
                            value={"developer"}
                            onChange={onChangeSort}/>
                    </div>
                </div>
                {mappedTechs}
            </div>
        </div>
    )
}

export default HW15

