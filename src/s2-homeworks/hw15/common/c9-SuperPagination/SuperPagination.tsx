import React, {ChangeEvent} from "react"
import SuperSelect from "../../../hw07/common/c5-SuperSelect/SuperSelect"
import {Pagination} from "@mui/material"
import s from "./SuperPagination.module.css"

export type SuperPaginationPropsType = {
    id?: string
    currentPage: number
    itemsCountForPage: number
    totalCount: number
    onChange: (page: number, count: number) => void
}

const SuperPagination: React.FC<SuperPaginationPropsType> = (
    {
        currentPage, itemsCountForPage, totalCount, onChange, id = "hw15",
    }
) => {
// количество страниц
    const lastPage =  Math.ceil(totalCount / itemsCountForPage) // пишет студент // вычислить количество страниц

    const onChangeCallback = (event: ChangeEvent<any>, currentPage: number) => {
        // пишет студент
        onChange(currentPage, event.target.value)
    }

    const onChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        // пишет студент
        onChange(currentPage, +event.target.value)
    }

    let techValue = [
        {id: 4, value: 4},
        {id: 7, value: 7},
        {id: 10, value: 10},
    ];
    return (
        <div className={s.pagination}>
            <Pagination
                showFirstButton
                showLastButton
                color="primary"
                id={id + "-pagination"}
                sx={{
                    // стили для Pagination // пишет студент
                }}
                page={currentPage}
                count={lastPage}
                onChange={onChangeCallback}
                hideNextButton
                hidePrevButton
            />

            <span className={s.text1}>
                показать
            </span>

            <SuperSelect
                id={id + "-pagination-select"}
                value={itemsCountForPage}
                options={techValue}
                onChange={onChangeSelect}
            />

            <span className={s.text2}>
                строк в таблице
            </span>
        </div>
    )
}

export default SuperPagination
