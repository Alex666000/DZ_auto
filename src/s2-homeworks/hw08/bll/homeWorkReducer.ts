import {initialPeople, UserType} from "../HW8"
import {ifError} from "assert";

export const initialState: UserType[] = [
    // студенты могут поменять имя/возраст/количество объектов, _id должны быть целочисленные
    {_id: 0, name: "Кот", age: 3},
    {_id: 1, name: "Александр", age: 66},
    {_id: 2, name: "Коля", age: 16},
    {_id: 3, name: "Виктор", age: 44},
    {_id: 4, name: "Дмитрий", age: 40},
    {_id: 5, name: "Ирина", age: 55},
]

type ActionType =
    | { type: "sort"; payload: "up" | "down" }
    | { type: "check"; payload: number }

export const homeWorkReducer = (state: UserType[], action: ActionType): UserType[] => { // need to fix any
    switch (action.type) {
        case "sort": {
            const copyState = [...state]
            if (action.payload === 'up') {
                 copyState.sort( (a, b) => {
                     if (a.name < b.name) //сортируем строки по возрастанию
                         return -1
                     if (a.name > b.name)
                         return 1
                     return 0 // Никакой сортировки
                 })
            } else {
                copyState.sort( (a, b) => {
                    if (b.name < a.name) //сортируем строки по возрастанию
                        return -1
                    if (b.name > a.name)
                        return 1
                    return 0 // Никакой сортировки
                })
            }
            return  copyState


        }
        case "check": {
            // need to fix
            return state.filter(user => user.age > 18)

        }
        default:
            return state
    }
}



