interface DownCaretProps {
  className?: string;
}

export const DownCaret = ({ className }: DownCaretProps) => (
  <svg
    width="9"
    height="7"
    viewBox="0 0 9 7"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1 1L5 5L9 1" stroke="#635FC7" strokeWidth="2" />
  </svg>
);
