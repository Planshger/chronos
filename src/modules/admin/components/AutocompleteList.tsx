import { Autocomplete, Stack, TextField, useTheme } from '@mui/material';
import { memo } from 'react';
import { Search } from '@mui/icons-material';

interface AutocompleteListProps {
  id: string;
  label?: string;
  onChange: (value: string, id: string) => void;
  options: string[];
  value: string | undefined;
  variant?: 'standard' | 'outlined' | 'filled';
  disableClearable: boolean;
}

function AutocompleteList({
  id,
  label,
  onChange,
  options,
  value,
  variant = 'standard',
  disableClearable,
}: AutocompleteListProps) {
  const theme = useTheme();

  return (
    <Stack direction="row" spacing={1} sx={{ width: '100%', minWidth: 0, flex: 1 }}>
      <Search sx={{ pt: 0.3, flexShrink: 0 }} />

      <Autocomplete
        id={`${id}-autocomplete`}
        sx={{ flex: 1, minWidth: 0 }}
        autoComplete
        disableClearable={disableClearable}
        freeSolo
        options={options}
        value={value}
        onChange={(event, newValue) => {
          onChange(newValue ?? '', id);
        }}
        slotProps={{
          paper: {
            sx: {
              bgcolor: theme.custom.background.glass,
              backdropFilter: 'blur(11px)',
              color: '#f1f5f9',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            },
          },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={label}
            variant={variant}
            size="small"
            sx={{
              '& .MuiAutocomplete-clearIndicator': { color: theme.palette.text.secondary },
              '& .MuiAutocomplete-popupIndicator': { color: 'grey.500' },
              '& input::-webkit-contacts-auto-fill-button': { visibility: 'hidden' },
            }}
          />
        )}
      />
    </Stack>
  );
}

export default memo(AutocompleteList);
