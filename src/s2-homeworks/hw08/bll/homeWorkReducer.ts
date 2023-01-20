import {initialPeople, UserType} from "../HW8"

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
    | { type: "sort-up"; payload: "up" }
    | { type: "sort-down"; payload: "down" }
    | { type: "check"; payload: number }

export const homeWorkReducer = (state: UserType[], action: ActionType): UserType[] => { // need to fix any
    switch (action.type) {
        case "sort-up":
            // -1 значит не меняем местами 1 - меняем местами по алфавиту:
            return [...state]
                .sort((a, b) =>
                    b.name > a.name
                        ? 1 : b.name < a.name ? -1 : 0)
        case "sort-down": {
            return [...state]
                .sort((a, b) =>
                    b.name > a.name
                        ? 1 : b.name < a.name ? -1 : 0)
        }

        case "check": {

            return state.filter(u => u.age > 18) // need to fix
        }
        default:
            return state
    }
}


