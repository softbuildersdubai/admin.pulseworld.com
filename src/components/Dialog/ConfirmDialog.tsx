import { useState } from 'react';
import Dialog from './BasicDialog';
import DialogButton from './DialogButton';
import Loader from '../Loader/Loader';

interface Props {
  title: string;
  children: React.ReactNode;
  open: boolean;
  onClose: any;
  onConfirm: any;
}
export default function ConfirmDialog(props: Props) {
  const { open, onClose, title, children, onConfirm } = props;
  const [loading, setLoading] = useState(false);
  if (!open) {
    return <></>;
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <h2 className="text-xl text-white">{title}</h2>
      <div className="py-5 text-white">{children}</div>
      <div className="flex justify-end">
        <div className="p-1">
          <DialogButton onClick={() => onClose()} className="bg-secondary hover:bg-secondary-light">
            No
          </DialogButton>
        </div>
        <div className="p-1">
          <DialogButton
            onClick={async () => {
              setLoading(true);
              await onConfirm();
              setLoading(false);
              // onClose();
            }}
          >
            {loading ? <Loader width={25} /> : <>Yes</>}
          </DialogButton>
        </div>
      </div>
    </Dialog>
  );
}
