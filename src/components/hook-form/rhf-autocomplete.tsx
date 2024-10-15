import { useFormContext, Controller } from 'react-hook-form';
// @mui
import TextField from '@mui/material/TextField';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';

// ----------------------------------------------------------------------

interface Props<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> extends AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
  name: string;
  label?: string;
  placeholder?: string;
  helperText?: React.ReactNode;
  hasMore?: boolean;
  loadMore?: () => void;
  required?: boolean;
}

export default function RHFAutocomplete<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
>({
  name,
  label,
  placeholder,
  helperText,
  hasMore,
  loadMore,
  required = false,
  ...other
}: Omit<Props<T, Multiple, DisableClearable, FreeSolo>, 'renderInput'>) {
  const { control, setValue } = useFormContext();

  const handleScroll = (event: any) => {
    const { target } = event;
    if (target.scrollTop + target.clientHeight >= target.scrollHeight - 200 && hasMore) {
      loadMore?.();
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          onChange={(_, newValue) => setValue(name, newValue, { shouldValidate: true })}
          ListboxProps={{
            ...other.ListboxProps,
            onScroll: (event) => {
              other.ListboxProps?.onScroll?.(event);
              handleScroll(event);
            },
          }}
          renderInput={(params) => (
            <TextField
              label={label}
              placeholder={placeholder}
              error={!!error}
              helperText={error ? error?.message : helperText}
              required={required}
              {...params}
            />
          )}
          {...other}
        />
      )}
    />
  );
}
