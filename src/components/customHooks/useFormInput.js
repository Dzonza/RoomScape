import { useEffect, useState } from 'react';

export default function useFormInput(value, delay = 500) {
  const [debounceValue, setDebounceValue] = useState('');
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounceValue;
}
