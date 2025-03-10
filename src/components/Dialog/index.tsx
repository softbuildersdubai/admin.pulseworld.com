import { Dialog } from '@mui/material';

export default function GlobalDialog({
  title,
  content,
  size,
  nextButtonText,
  nextButtonAction,
  backButtonText,
  backButtonAction,
  contentClass,
  open,
  onClose,
  closeButtonShow = true,
}: {
  title?: string;
  content: React.ReactNode;
  nextButtonText?: string;
  nextButtonAction?: () => void;
  backButtonAction?: () => void;
  backButtonText?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  contentClass?: string;
  open: boolean;
  onClose?: () => void;
  closeButtonShow?: boolean;
}): JSX.Element {
  const getSizeMaxWidth = (size: string) => {
    switch (size) {
      case 'xs':
        return 'xs';
      case 'sm':
        return 'sm';
      case 'md':
        return 'md';
      case 'lg':
        return 'lg';
      case 'xl':
        return 'xl';
      default:
        return 'md';
    }
  };

  return (
    <Dialog open={open} fullWidth={true} maxWidth={getSizeMaxWidth(size ? size : 'md')} onClose={onClose}>
      <div className="flex flex-col gap-4 py-4 lg:py-8 px-4 lg:px-6">
        {title && <div className="text-md text-Heading font-medium">{title}</div>}
        <div className={`${contentClass}`}>{content}</div>
        <div className="flex items-center gap-4 justify-end">
          {closeButtonShow && (
            <button
              className="flex flex-row gap-4 border border-primary text-xs lg:text-sm px-4 py-1 lg:py-2 lg:px-8 text-primary rounded hover:bg-primary hover:text-white"
              onClick={onClose}
            >
              Close
            </button>
          )}
          <div className="flex gap-4">
            {backButtonText && (
              <button
                className="flex flex-row gap-4 border border-primary text-xs lg:text-sm px-4 py-1 lg:py-2 lg:px-8 text-primary rounded hover:bg-primary hover:text-white"
                onClick={backButtonAction}
              >
                {backButtonText}
              </button>
            )}

            {nextButtonText && (
              <button
                className="flex flex-row gap-4 bg-primary text-xs lg:text-sm px-4 py-1 lg:py-2 lg:px-8 text-white rounded hover:bg-bronze"
                onClick={nextButtonAction}
              >
                {nextButtonText}
              </button>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
}
