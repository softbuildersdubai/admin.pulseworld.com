import { Drawer, useMediaQuery } from '@mui/material';
import React from 'react';
import SubHeading from '../SubHeading';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNotificationsActions } from '../../store/notifications/notificationsAction';
import { useSelector } from 'react-redux';
import { notification_badge, selectNotifications } from '../../store/notifications/notificationsSlice';
import { RotatingLines } from 'react-loader-spinner';

const NotificationsDrawer = ({ open, toggleDrawer }: { open: any; toggleDrawer: (anchor, open) => void }) => {
  const screen640 = useMediaQuery('(min-width:640px)');

  const { getNotifications, readNotification } = useNotificationsActions();
  const notifications = useSelector(selectNotifications);
  const [page, setPage] = React.useState(1);
  const badge = useSelector(notification_badge);

  const fetchNotifications = async () => {
    await getNotifications(page + 1);
  };

  React.useEffect(() => {
    if (!notifications.pageLoaded) getNotifications(page);
  }, []);

  React.useEffect(() => {
    if (open && badge > 0) readNotification();
  }, [open]);

  const colors = {
    SUCCESS: 'text-greenSecondary bg-greenSecondary',
    ERROR: 'text-errorColor bg-errorColor',
    INFO: 'text-buttonColor bg-buttonColor',
    WARNING: 'text-warningColor bg-warningColor',
  };

  return (
    <div>
      <React.Fragment key={'right'}>
        <Drawer
          anchor="right"
          open={open}
          onClose={() => toggleDrawer('right', false)}
          sx={{
            '.MuiDrawer-paper': {
              width: screen640 ? '30rem' : '100%',
              backgroundColor: '#0A0A0A',
              backgroundImage: 'linear-gradient(rgba(10, 10, 10, 1), rgba(10, 10, 10, 1))',
            },
          }}
          // className='overflow-y-auto'
        >
          <div className="w-full relative flex flex-col">
            <div className="w-full bg-bgSecondary sticky top-0 left-0 right-0 flex justify-between items-center px-8 py-4 ">
              <SubHeading heading={`Notifications ${badge > 0 ? `(${badge})` : ''}`} />
              <button onClick={() => toggleDrawer('right', false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 30 30" fill="none">
                  <path
                    d="M22.5 7.5L7.5 22.5"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.5 7.5L22.5 22.5"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div
              id="scrollableDiv"
              style={{
                height: '90vh',
                overflow: 'auto',
              }}
              className="hide-scrollbar"
            >
              <InfiniteScroll
                dataLength={notifications.list.length}
                next={() => {
                  fetchNotifications();
                  setPage((prev) => prev + 1);
                }}
                hasMore={notifications.totalPages - notifications.currentPage > 0 ? true : false}
                loader={
                  <div className="flex m-3 justify-center">
                    <RotatingLines
                      visible={true}
                      width="20"
                      strokeWidth="3"
                      animationDuration="0.75"
                      strokeColor="white"
                    />
                  </div>
                }
                scrollableTarget="scrollableDiv"
              >
                {notifications.list.map((noti, index) => (
                  <React.Fragment key={index}>
                    <div className={`space-y-2 py-4 px-8`}>
                      <span className={`py-1 text-sm rounded bg-opacity-5 ${colors[noti.code]}`}>{noti.title}</span>
                      <span className="flex text-sm font-light">{noti.message}</span>
                      <span className="flex text-xs text-gray-400">{noti.createdAt}</span>
                    </div>
                    <div className={`border-t-0 border border-[#222222] text-secondary mx-8`} />
                  </React.Fragment>
                ))}
              </InfiniteScroll>
            </div>
          </div>
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default NotificationsDrawer;
