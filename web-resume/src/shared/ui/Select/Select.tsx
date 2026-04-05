export interface SelectOption<T> {
  value: T;
  label: string;
  disabled?: boolean;
}

export interface SelectProps<T> {
  options: SelectOption<T>[];
  label?: string;
  error?: string;
  placeholder?: string;
  onChangeValue?: (value: T) => void;
  value?: T;
  id?: string;
  name?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
}

export function Select<T extends string | number>({
                                                    options,
                                                    label,
                                                    error,
                                                    placeholder = 'Выберите значение',
                                                    onChangeValue,
                                                    value,
                                                    id,
                                                    name,
                                                    className = '',
                                                    disabled,
                                                    required,
                                                  }: SelectProps<T>) {

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeValue?.(e.target.value as T);
  };

  return (
    <>
      <div className={`select-wrapper ${className}`}>
        {label && (
          <label htmlFor={id} className="select-label">
            {label}
          </label>
        )}

        <select
          id={id}
          name={name}
          value={value !== undefined ? value : ''}
          className={`select-input ${error ? 'select-input--error' : ''}`}
          onChange={handleChange}
          disabled={disabled}
          required={required}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>

          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>

        {error && <span className="select-error">{error}</span>}
      </div>
    </>
  )
}