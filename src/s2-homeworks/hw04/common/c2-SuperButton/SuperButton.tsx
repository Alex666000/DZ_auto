import React, {ButtonHTMLAttributes, DetailedHTMLProps} from "react"
import s from "./SuperButton.module.css"

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
    xType?: string
    disableButton?: boolean
}

const SuperButton: React.FC<SuperButtonPropsType> = (
    {
        xType,
        className,
        disabled,
        disableButton,
        ...restProps // все остальные пропсы попадут в объект restProps, там же будет children
    }
) => {
    const finalClassName = s.button + " " +
        (disabled
        ? s.disabled
        : xType === "red"
            ? s.red
            : xType === "secondary"
                ? s.secondary
                : s.default) + (className ? " " + className : "")
// проверяем переменную в консоле не склеились ли классы?
    console.log(finalClassName)

    return (
        <button
            disabled={disableButton}
            className={finalClassName}
            {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
        />
    )
}

export default SuperButton
