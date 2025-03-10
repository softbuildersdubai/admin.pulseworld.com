import React from 'react';
// import ConfirmDialog from '../Dialog/ConfirmDialog';

type Props = { openAcceptDialog: boolean; setOpenAcceptDialog: any };

const VerificationActionsDialogs = (props: Props) => {
  return (
    <div>
      {/* <ConfirmDialog
        title="Approved Verification?"
        open={openAcceptDialog}
        onClose={() => setOpenAcceptDialog(false)}
        onConfirm={async () => {
          setAcceptedLoading(true);
          const res = await verification_action(params.id, VERIFICATION_ACTION_STATUS.VERIFIED);
          if (!res.status) {
            errorAlert(res.message);
            setAcceptedLoading(false);
            setConfirmOpen(false);
            return;
          }
          await getCustomerVerificationRequests(true);
          setAcceptedLoading(false);
          setConfirmOpen(false);
          navigate('/users/verifications');
          successAlert(res.message);
        }}
      >
        Are you sure you want to Approve this verification?
      </ConfirmDialog> */}
    </div>
  );
};

export default VerificationActionsDialogs;
