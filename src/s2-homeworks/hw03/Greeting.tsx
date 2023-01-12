import React, {MouseEvent,FocusEvent,ChangeEvent, KeyboardEvent} from 'react'
import s from './Greeting.module.css'
import {pureAddUser} from "./GreetingContainer";

type GreetingPropsType = {
    name: string // need to fix any
    setNameCallback: (e: ChangeEvent<HTMLInputElement>) => void // need to fix any
    addUser: (e: MouseEvent<HTMLButtonElement>) => void // need to fix any
    onBlur: (e: FocusEvent<HTMLInputElement>) => void // need to fix any
    onEnter: (e: KeyboardEvent<HTMLInputElement>) => void // need to fix any
    error: string // need to fix any
    totalUsers: number // need to fix any
    lastUserName?: string // need to fix any
}

// презентационная компонента (для верстальщика)
const Greeting: React.FC<GreetingPropsType> = (
    {
        name,
        setNameCallback,
        addUser,
        onEnter,
        onBlur,
        error,
        totalUsers,
        lastUserName,
    } // деструктуризация пропсов
) => {

    // если ошибка(переменная есть - то покажем такой-то класс иначе такой-то класс)
    const inputClass = error ? s.errorInput : s.some  // need to fix with (?:)

    return (
        <div id={'hw3-form'} className={s.greetingForm}>
            <div className={s.text}>
                {'Людей добавили: '}
                <span id={'hw3-users-total'}>
                    {totalUsers}
                </span>
            </div>

            <div className={s.inputAndButtonContainer}>
                <div>
                    <input
                        id={'hw3-input'}
                        value={name}
                        onChange={setNameCallback}
                        className={inputClass}
                        onKeyDown={onEnter}
                        onBlur={onBlur}
                    />
                    <div id={'hw3-error'} className={s.error}>
                        {error}
                    </div>
                </div>

                <button
                    id={'hw3-button'}
                    onClick={addUser}
                    className={s.button}
                    disabled={!name.trim()}
                >
                    add
                </button>
            </div>

            {lastUserName && (
                <div className={s.greeting}>
                    Привет <span id={'hw3-last-user'}>{lastUserName}</span>!
                </div>
            )}
        </div>
    )
}

export default Greeting
// 1) сначала вводим в инпут буквы - это значение сетаем setName(e.currentTarget.value, введеное имя попадает в переменную name локального стейта,
// добавляем user - для этого name берем из замыкания
/* const addUser = (e: MouseEvent<HTMLButtonElement>) => {
 pureAddUser(name, setError, setName, addUserCallback)
} */

// 2) если ошибка(переменная есть - то покажем такой-то класс иначе такой-то класс)
// const inputClass = error ? s.errorInput : s.some
