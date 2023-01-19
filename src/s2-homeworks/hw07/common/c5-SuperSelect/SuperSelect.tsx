import React, {
    SelectHTMLAttributes,
    DetailedHTMLProps,
    ChangeEvent,
} from 'react'
import s from './SuperSelect.module.css'
import {OptionType} from "../../HW7";
// залазим внутрь DetailedHTMLProps и смотрим дефолтные пропсы - их уточняем атрибутами select
type DefaultSelectPropsType = DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
>


type SuperSelectPropsType = DefaultSelectPropsType & {
    options?: OptionType[]
    onChangeOption?: (option: any) => void
}

const SuperSelect: React.FC<SuperSelectPropsType> = ({
    options,
// className - явл-тся дефолтным пропсом
// но т.к он нам нужен в этом файле его тоже деструктуризируем - иначе он попал бы в {...restProps}
    className,
    // onChange - явл-тся дефолтным пропсом но т.к он нам нужен в этом файле его тоже деструктуризируем
// - иначе он попал бы в {...restProps}
    onChange,
    onChangeOption,
    ...restProps
}) => {

    const mappedOptions: any[] = options
        ? options.map((option) => (
              <option
                  id={'hw7-option-' + option.id}
                  className={s.option}
                  key={option.id}
                  value={option.id}
              >
                  {option.value}
              </option>
          ))
        : [] // map options with key

    const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
        // делают студенты
        onChange && onChange(e)
        onChangeOption?.(e.currentTarget.value)
    }

    const finalSelectClassName = s.select + (className ? ' ' + className : '')

    return (
        <select
            className={finalSelectClassName}
            onChange={onChangeCallback}
            {...restProps}
        >
            {mappedOptions}
        </select>
    )
}

export default SuperSelect
