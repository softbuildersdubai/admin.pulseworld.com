import Button from '../Button';

type Props = {
  btnText: string;
  disabled?: boolean;
  loading?: boolean;
  cancelBtnText?: string;
  onSubmit: () => void;
  onCancel: () => void;
  showCancelButton?: boolean;
};

const SaveBar = ({
  btnText,
  loading,
  cancelBtnText = 'Cancel',
  onSubmit,
  onCancel,
  showCancelButton = true,
}: Props) => {
  return (
    <div className="w-full flex justify-end items-center gap-2">
      {showCancelButton && (
        <Button buttonType="button" onClick={onCancel} className="!py-2">
          {cancelBtnText}
        </Button>
      )}

      <Button
        buttonType="submit"
        loading={loading}
        onClick={onSubmit}
        disable={loading}
        className="!py-2"
        loadingType="circular"
      >
        {btnText}
      </Button>
    </div>
  );
};

export default SaveBar;
