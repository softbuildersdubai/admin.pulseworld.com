//REACT
import { useEffect, useState, useRef } from 'react';
//MATERIAL-UI
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
//REDUX-TOOLKIT
import { useUserActions } from '../../store/user/userActions';
import { selectUser } from '../../store/user/userSlice';
import { useSelector } from 'react-redux';
import { notification_badge } from '../../store/notifications/notificationsSlice';
//IMAGES
import { bell, menu, user_default } from '../../images/other';
import NotificationsDrawer from '../NotificationDrawer';
import { useNavigate } from 'react-router-dom';

type HeaderProps = {
  handleDrawer: (event: any) => void;
};

export default function Header({ handleDrawer }: HeaderProps): JSX.Element {
  const screen640 = useMediaQuery('(min-width:640px)');
  const navigate = useNavigate();

  const [isProfileDropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  const [drawerState, setDrawerState] = useState({
    right: false,
  });

  const toggleDrawer = (anchor: 'right', open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setDrawerState({ ...drawerState, [anchor]: open });
  };

  const toggleDropdown = (): void => setDropdownOpen((prevState) => !prevState);

  const badge = useSelector(notification_badge);

  const handleClickOutside = (event: any) => {
    const targetNode = event.target as Node;

    if (
      profileDropdownRef.current &&
      !profileDropdownRef.current.contains(event.target as Node) &&
      !(targetNode instanceof Element && targetNode.closest('.profile-icon'))
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const { userLogout } = useUserActions();
  const userProfile = () => navigate('/profile');

  const user = useSelector(selectUser);

  return (
    <div className="w-full flex items-center justify-between lg:justify-end px-2">
      {!screen640 && (
        <>
          <button onClick={handleDrawer} className="ml-2">
            <img src={menu} alt="menu" />
          </button>
        </>
      )}

      <div className="flex items-center">
        <div className="relative">
          <IconButton
            onClick={toggleDrawer('right', true)}
            className="bell-icon"
            sx={{
              borderRadius: '50%',
            }}
          >
            <img className="w-5 h-5" src={bell} alt="bell" />
            <span
              className={`absolute h-5 w-5 rounded-full bg-[#FC3400] top-0 right-0 text-white text-xs border-[1px] border-white
                        flex items-center justify-center ${badge ? '' : 'hidden'}`}
            >
              {badge}
            </span>
          </IconButton>
          <NotificationsDrawer open={drawerState['right']} toggleDrawer={toggleDrawer('right', false)} />
        </div>

        <div className="relative">
          <IconButton
            onClick={toggleDropdown}
            className="profile-icon flex gap-2"
            sx={{
              borderRadius: '4rem',
            }}
          >
            <img
              src={user?.profilePicture?.path || user_default}
              alt="avatar"
              className="object-contain w-8 h-8 rounded-full ring-1 ring-white cursor-pointer"
            />

            <span className="text-sm">
              {user && (
                <>
                  {user.accountType === 'INDIVIDUAL' ? (
                    <>
                      {user.firstName ? (
                        <>{user.firstName.length <= 8 ? user.firstName + ' ' + user.lastName : user.firstName}</>
                      ) : (
                        <>{user?.username}</>
                      )}
                    </>
                  ) : (
                    <>
                      {user.companyName ? (
                        <>
                          {!screen640 && user.companyName.length > 12 ? (
                            <>{user.companyName.substring(0, 12) + '...'}</>
                          ) : (
                            <>{user.companyName}</>
                          )}
                        </>
                      ) : (
                        <>{user.username}</>
                      )}
                    </>
                  )}
                </>
              )}
            </span>
            <span className={`${isProfileDropdownOpen ? '-rotate-90' : 'rotate-90'} text-sm`}>{'>'}</span>
          </IconButton>

          {isProfileDropdownOpen && (
            <div
              ref={profileDropdownRef}
              className="absolute top-[4rem] w-36 right-0
                            bg-gradient-to-r from-[#303030] to-[#232323] backdrop-blur-[23.33px]
                            rounded-lg shadow-md"
            >
              <ul className="p-2 text-xs text-input">
                <li
                  onClick={userProfile}
                  className="flex items-center gap-2 p-2 hover:text-buttonColor cursor-pointer group"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                    <g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd">
                      <path d="M16 9a4 4 0 1 1-8 0a4 4 0 0 1 8 0m-2 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0" />
                      <path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11s11-4.925 11-11S18.075 1 12 1M3 12c0 2.09.713 4.014 1.908 5.542A8.986 8.986 0 0 1 12.065 14a8.984 8.984 0 0 1 7.092 3.458A9 9 0 1 0 3 12m9 9a8.963 8.963 0 0 1-5.672-2.012A6.992 6.992 0 0 1 12.065 16a6.991 6.991 0 0 1 5.689 2.92A8.964 8.964 0 0 1 12 21" />
                    </g>
                  </svg>
                  Profile
                </li>
                <li
                  onClick={userLogout}
                  className="flex items-center gap-2 p-2 hover:text-buttonColor cursor-pointer group"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 1024 1024">
                    <path
                      fill="currentColor"
                      d="M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8c-7 8.5-14.5 16.7-22.4 24.5a353.84 353.84 0 0 1-112.7 75.9A352.8 352.8 0 0 1 512.4 866c-47.9 0-94.3-9.4-137.9-27.8a353.84 353.84 0 0 1-112.7-75.9a353.28 353.28 0 0 1-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8c47.9 0 94.3 9.3 137.9 27.8c42.2 17.8 80.1 43.4 112.7 75.9c7.9 7.9 15.3 16.1 22.4 24.5c3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82C271.7 82.6 79.6 277.1 82 516.4C84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7c3.4-5.3-.4-12.3-6.7-12.3m88.9-226.3L815 393.7c-5.3-4.2-13-.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112a8 8 0 0 0 0-12.6"
                    />
                  </svg>
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
