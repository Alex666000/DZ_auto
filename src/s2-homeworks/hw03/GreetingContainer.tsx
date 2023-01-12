import React, {ChangeEvent, KeyboardEvent, MouseEvent, useState} from "react"
import Greeting from "./Greeting"
import {UserType} from "./HW3"

type GreetingContainerPropsType = {
    users: UserType[] // need to fix any
    addUserCallback: (name: string) => void // need to fix any
}

export const pureAddUser = (name: string, setError: (error: string) => void, setName: (value: string) => void, addUserCallback: (name: string) => void) => {
    // если имя пустое - показать ошибку, иначе - добавить юзера и очистить инпут
    if (!name) {
        setError("Ошибка")
    } else {
        addUserCallback(name)
        setName("")
    }
}

export const pureOnBlur = (name: string, setError: (value: string) => void) => { // если имя пустое - показать ошибку
    if (!name) {
        setError("Ошибка")
    }
}

export const pureOnEnter = (e: KeyboardEvent, addUser: (name: string) => void) => { // если нажата кнопка Enter - добавить
    if (e.keyCode === 13) {
        // словами вводить или name писать?
        addUser("Alex")
    }
}

// более простой и понятный для новичков
// function GreetingContainer(props: GreetingPropsType) {

// более современный и удобный для про :)
const GreetingContainer = ({
                               users,
                               addUserCallback,
                           }: GreetingContainerPropsType) => {
    // деструктуризация пропсов
    const [name, setName] = useState<string>("") // need to fix any
    const [error, setError] = useState<string>("") // need to fix any

    const setNameCallback = (e: ChangeEvent<HTMLInputElement>) => { // need to fix any
        setName(e.currentTarget.value) // need to fix
        error && setError("Ошибка")
    }
    const addUser = (e: MouseEvent<HTMLButtonElement>) => {
        pureAddUser(name, setError, setName, addUserCallback)
    }

    const onBlur = () => {
        pureOnBlur(name, setError)
    }

    const onEnter = (e: KeyboardEvent) => {
        // pureAddUser(e.keyCode,setError, setName, addUserCallback)    }
        console.log(e)
    }
        const totalUsers = users.length // need to fix

        const lastUserName = users[totalUsers - 1]?.name   // need to fix


        return (
            <Greeting
                name={name}
                setNameCallback={setNameCallback}
                addUser={addUser}
                onBlur={onBlur}
                onEnter={onEnter}
                error={error}
                totalUsers={totalUsers}
                lastUserName={lastUserName}
            />
        )

}


export default GreetingContainer
