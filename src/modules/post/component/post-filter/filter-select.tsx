import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const FilterSelect = <T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: { label: string; value: T }[];
  onChange: (value: T) => void;
}) => {
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className='w-full max-w-sm font-semibold'>
        <SelectValue placeholder='Select an option' />
      </SelectTrigger>
      <SelectContent>
        {options.map(option => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
