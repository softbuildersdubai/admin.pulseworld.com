//MATERIAL-UI
import ListItem from '@mui/material/ListItem';
//REDUX-TOOLKIT
import { useSelector, useDispatch } from 'react-redux';
import { setActiveMenu, selectDrawer, setDrawerOpen } from '../../store/drawer/drawerSlice';
//ROUTER-DOM
import { useLocation, useNavigate } from 'react-router-dom';
//COMPONENTS
import MenuIcon from './MenuIcon';
import { selectUser } from '../../store/user/userSlice';

const SubMenu = ({ subMenu, length, index }: { subMenu: any; length: number; index: number }) => {
  const drawer = useSelector(selectDrawer);
  const user = useSelector(selectUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpenChange = (newOpen: boolean) => {
    dispatch(setDrawerOpen(newOpen));
  };
  const location = useLocation();

  // Define a function to recursively check submenu URLs
  const isMenuActive = (menu) => {
    if (location.pathname.startsWith(menu.url)) {
      return true;
    }
    if (menu.options && menu.options.length > 0) {
      for (const subMenu of menu.options) {
        if (isMenuActive(subMenu)) {
          return true;
        }
      }
    }
    return false;
  };

  return (
    <ListItem
      key={subMenu.key}
      disablePadding
      className={`mx-2 !w-normal cursor-pointer rounded ${
        drawer.activeMenu === subMenu.url && `bg-selectedDrawerBg !w-full`
      }`}
      disabled={subMenu.disable}
      sx={{
        color: isMenuActive(subMenu) && drawer.openItemKey === subMenu.key ? '#26A5FF !important' : 'white',
      }}
      onClick={() => {
        if (subMenu.disable) {
          return;
        }

        if (subMenu?.url) {
          // if (subMenu.url !== drawer.activeMenu) {
          dispatch(setActiveMenu(subMenu));
          navigate(subMenu.url);
          handleOpenChange(false);
          // }
        }
      }}
    >
      {user.adminPermissions?.length > 0 ? (
        subMenu.permissions?.some((permission) => {
          return user?.adminPermissions?.includes(permission);
        }) ? (
          <MenuIcon menu={subMenu} type={'submenu'} length={length} index={index} />
        ) : (
          <></>
        )
      ) : (
        <MenuIcon menu={subMenu} type={'submenu'} length={length} index={index} />
      )}
      {/* <MenuIcon menu={subMenu} type={'submenu'} length={length} index={index} /> */}
    </ListItem>
  );
};

export default SubMenu;
