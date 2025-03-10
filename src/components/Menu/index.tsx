//REACT
import React, { useEffect } from 'react';

//MATERIAL-UI
import ListItem from '@mui/material/ListItem';
import Collapse from '@mui/material/Collapse';

//REDUX-TOOLKIT
import { useSelector, useDispatch } from 'react-redux';
import {
  selectActiveMenu,
  selectDrawer,
  setActiveMenu,
  setExpendMenu,
  setDrawerOpen,
} from '../../store/drawer/drawerSlice';

//ROUTER-DOM
import { useNavigate, useLocation } from 'react-router-dom';

//UTILS
import { allDrawerOptions } from '../../utils/drawerOptions';

//COMPONENTS
import SubMenu from './SubMenu';
import MenuIcon from './MenuIcon';
import { useUserActions } from '../../store/user/userActions';
import { up_arrow } from '../../images/other';
import { selectUser } from '../../store/user/userSlice';
import { calculateSubmenuCount } from '../../utils/utils';

const Menu = ({ menu }: { menu: any }) => {
  const { userLogout } = useUserActions();
  const activeMenu = useSelector(selectActiveMenu);
  const drawer = useSelector(selectDrawer);
  const user = useSelector(selectUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();

  const handleOpenChange = (newOpen: boolean) => {
    dispatch(setDrawerOpen(newOpen));
  };
  let count = 0;

  useEffect(() => {
    allDrawerOptions.forEach((drawerOption: any) => {
      drawerOption.options.forEach((menu: any) => {
        if (menu.url === location.pathname) {
          dispatch(
            setExpendMenu({
              expendMenu: true,
              expendKey: menu.key,
            })
          );
          return;
        }

        menu.options.forEach((subMenu: any) => {
          if (subMenu.url === location.pathname) {
            dispatch(
              setExpendMenu({
                expendMenu: true,
                expendKey: menu.key,
              })
            );
            return;
          }
        });
      });
    });
  }, [location]);

  return (
    <>
      <ListItem
        key={menu.key}
        disablePadding
        className={`ml-2 my-2 !w-normal cursor-pointer rounded py-[0.7rem] pl-3 ${
          activeMenu === menu.url && `bg-selectedDrawerBg !w-full`
        }`}
        sx={{
          color:
            activeMenu === menu.url || menu.options.some((subMenu: any) => location.pathname.startsWith(subMenu.url))
              ? '#26A5FF !important'
              : 'white',
        }}
        disabled={menu.disable}
        onClick={(e) => {
          if (menu.disable) {
            return;
          }

          if (e.target instanceof SVGSVGElement) {
            e.stopPropagation();
            dispatch(
              setExpendMenu({
                expendMenu: drawer.expendKey === menu.key ? !drawer.expendMenu : true,
                expendKey: menu.key,
              })
            );
            return;
          }

          if (menu.key === 'logout') {
            userLogout();
          }

          if (menu?.url) {
            // if (menu.url !== activeMenu) {
            dispatch(setActiveMenu(menu));
            navigate(menu.url);
            handleOpenChange(false);
            // }
          } else {
            dispatch(
              setExpendMenu({
                expendMenu: drawer.expendKey === menu.key ? !drawer.expendMenu : true,
                expendKey: menu.key,
              })
            );
          }
        }}
      >
        <MenuIcon menu={menu} type={'menu'} length={-1} index={-1} />
        {menu?.options.length > 0 && (
          <img
            src={up_arrow}
            alt=""
            className={`!text-base sm:!text-lg cursor-pointer ${
              drawer.expendKey === menu.key && drawer.expendMenu ? 'rotate-180' : 'rotate-90'
            }`}
          />
        )}
      </ListItem>
      {menu.options.length > 0 && (
        <Collapse in={drawer.expendMenu && menu.key === drawer.expendKey} timeout="auto" unmountOnExit>
          {menu.options.map((subMenu: any, index: number) => {
            const _length = calculateSubmenuCount(menu, user);

            count < _length + 1 && count++;

            return user.adminPermissions.length > 0 ? (
              <SubMenu key={subMenu.key} subMenu={subMenu} length={_length + 1} index={count} />
            ) : (
              <SubMenu key={subMenu.key} subMenu={subMenu} length={menu.options.length} index={index + 1} />
            );
          })}
        </Collapse>
      )}
    </>
  );
};

export default Menu;
