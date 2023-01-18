import React, {DetailedHTMLProps, InputHTMLAttributes, HTMLAttributes, useState,} from "react"
import s from "./SuperEditableSpan.module.css"
import SuperInputText from "../../../hw04/common/c1-SuperInputText/SuperInputText"
import editIcon from "./editIcon.svg"


// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement>

// тип пропсов обычного спана
type DefaultSpanPropsType = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement>

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута, кроме type
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperEditableSpanPropsType = Omit<DefaultInputPropsType, "type"> & {
    // и + ещё пропсы которых нет в стандартном инпуте
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string

    spanProps?: DefaultSpanPropsType & { defaultText?: string }// пропсы для спана
}

const SuperEditableSpan: React.FC<SuperEditableSpanPropsType> = (
    {
        autoFocus,
        onBlur,
        onEnter,
        spanProps,

        ...restProps // все остальные дефолтные пропсы попадут в объект restProps
    }
) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const {children, onDoubleClick, className, defaultText, ...restSpanProps} =
    spanProps || {}

    const onEnterCallback = () => {
        // выключить editMode при нажатии Enter // делают студенты
        setEditMode(false)
        onEnter?.()
    }
    const onBlurCallback = (e: React.FocusEvent<HTMLInputElement>) => {
        // выключить editMode при нажатии за пределами инпута // делают студенты
        setEditMode(false)
        onBlur?.(e)
    }
    const onDoubleClickCallBack = (
        e: React.MouseEvent<HTMLSpanElement, MouseEvent>
    ) => {
        // включить editMode при двойном клике // делают студенты
        setEditMode(true)
        onDoubleClick?.(e)
    }
    const spanClassName = s.span
        + (className ? " " + className : "")

    return (
        <>
            {/*показывается или инпут или спан*/}
            {editMode
                ? (
                    <SuperInputText
                        onDoubleClick={onDoubleClickCallBack}
                        autoFocus={autoFocus || true}
                        onBlur={onBlurCallback}
                        onEnter={onEnterCallback}
                        className={s.input}
                        // отдаём инпуту остальные пропсы если они есть (value например там внутри)
                        {...restProps}
                    />
                    /* показывается или инпут или спан */
                ) : (
                    <div className={s.spanBlock}>
                        <img
                            src={editIcon}
                            className={s.pen}
                            alt={"edit"}
                        />
                        <span
                            onDoubleClick={onDoubleClickCallBack}
                            className={spanClassName}
                            {...restSpanProps}
                        >
                        {/*если нет захардкодженного текста для спана, то значение инпута*/}

                            {children || restProps.value || defaultText}
                    </span>
                    </div>
                )}
        </>
    )
}

export default SuperEditableSpan
