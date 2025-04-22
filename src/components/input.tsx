import type { ChangeEvent } from 'react'

interface InputProps {
  placeholder: string
  value: string
  onChange: (value: string) => void
}

const Input = ({ placeholder, value, onChange }: InputProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }
  return (
    <input
      className="input text-color h-12"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  )
}
export default Input
