interface ResetButtonProps {
  onClick: () => void;
}

export default function ResetButton({
  onClick,
}: ResetButtonProps): React.ReactElement {
  return (
    <button className="btn-secondary" type="button" onClick={onClick}>
      Reset
    </button>
  );
}
