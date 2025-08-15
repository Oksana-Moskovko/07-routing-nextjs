import css from "../SearchBox/SearchBox.module.css";

interface SearchBoxProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export default function SearchBox({ onChange, value }: SearchBoxProps) {
  return (
    <>
      <input
        className={css.input}
        type="text"
        placeholder="Search notes"
        value={value}
        onChange={onChange}
      />
    </>
  );
}
