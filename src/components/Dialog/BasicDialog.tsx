import ExitIcon from '../Button/ExitIcon';
import IconButton from '../Button/IconButton';

interface Props {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  className?: string;
}
export default function Dialog(props: Props) {
  const { open, onClose, className } = props;
  if (!open) {
    return <></>;
  }
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
      <div className={`relative p-8 bg-[#2c2c2c] w-full max-w-md m-auto flex-col flex rounded-lg ${className}`}>
        <div>{props.children}</div>
        <span className="absolute top-0 right-0">
          <IconButton className="text-white" onClick={() => onClose()}>
            <ExitIcon />
          </IconButton>
        </span>
      </div>
    </div>
  );
}
