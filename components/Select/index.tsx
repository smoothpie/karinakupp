import { useState } from "react"
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import s from "./Select.module.css"

export default function Select({ options, selectedOption, onChange, label }: any) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className={s.container}>
      <div
        className={showDropdown ? `${s.label} ${s.labelOpen}` : s.label}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        {selectedOption.label}
        <FaChevronDown />
      </div>
      {showDropdown && (
        <div className={s.options}>
          {options.map((option: any, index: number) => (
            <div className={s.option} onClick={() => onChange(option.value)} key={index}>
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}