import { useSelector } from 'react-redux';
import { selectActiveMenu } from '../../store/drawer/drawerSlice';
import { useLocation } from 'react-router-dom';

const MenuIcon = ({ menu, type, length, index }: { menu: any; type: any; length: number; index: number }) => {
  const activeMenu = useSelector(selectActiveMenu);

  const location = useLocation();

  const indexClass = length === 0 ? 'pt-2' : '';
  const subMenuClass = `ml-5 gap-2 ` + indexClass;
  const menuClass = ' gap-3';

  return (
    <div className={`flex-1 flex items-center ${type === 'menu' ? menuClass : subMenuClass}`}>
      {type === 'menu' ? (
        <img
          className="w-4 h-4"
          src={
            activeMenu === menu.url || menu.options.some((subMenu: any) => location.pathname.startsWith(subMenu.url))
              ? menu.icon_dark
              : menu.icon_light
          }
          alt={menu.name}
        />
      ) : (
        <div>
          <div className={`${length === index && 'rounded-bl'} w-4 border-b border-l border-secondary h-4`}></div>

          <div className={`${length !== index && 'border-l border-secondary'} w-4  h-4`}></div>
        </div>
      )}

      <span className="text-[0.65rem] sm:text-xs whitespace-nowrap">{menu.name}</span>
    </div>
  );
};

export default MenuIcon;
