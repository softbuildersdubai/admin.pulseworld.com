//ROUTER-DOM
import { useNavigate } from 'react-router-dom';

//IMAGES
import { logo, error404, facebook, linkedin, tumblr } from '../../images/other';

// COMPONENTS
import Button from '../../components/Button';

const Error = () => {
  const navigate = useNavigate();
  const homeNavigate = (): void => navigate('/');

  return (
    <div className="flex flex-col items-center py-10 bg-bgErrorMobile screen900:bg-bgErrorWeb bg-no-repeat bg-cover bg-center h-screen overflow-y-hidden">
      <img
        onClick={homeNavigate}
        className="cursor-pointer flex justify-center items-center w-52"
        src={logo}
        alt="logo"
      />

      <div className="flex items-center flex-col justify-center h-full gap-4">
        <img className="w-56 h-56" src={error404} alt="error404" />

        <p className="uppercase font-extrabold text-white">Page not found</p>

        <p className="uppercase font-semibold tracking-wide text-sm text-textSecondary">
          Sorry we can’t found the page that you’re looking for
        </p>

        <Button className=" !py-2 !px-10" loadingType="circular" buttonType="submit" onClick={homeNavigate}>
          Go to Dashboard
        </Button>
      </div>
      <div className="flex items-center gap-8">
        <img className="w-8 h-8 cursor-pointer" src={facebook} alt="facebook" />
        <img className="w-8 h-8 cursor-pointer" src={linkedin} alt="linkedin" />
        <img className="w-8 h-8 cursor-pointer" src={tumblr} alt="tumblr" />
      </div>
    </div>
  );
};

export default Error;
