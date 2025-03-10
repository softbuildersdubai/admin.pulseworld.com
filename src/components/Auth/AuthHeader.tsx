import { Link } from 'react-router-dom';

const authHeader = ({ title, subtitle, link }: { title: string; subtitle?: string; link?: string }) => {
  return (
    <div className="flex flex-row items-center justify-center gap-2 text-secondary text-center text-xs lg:text-sm md:leading-6">
      <p>{title}</p>
      {link && (
        <Link to={link} className="text-buttonColor">
          {subtitle}
        </Link>
      )}
    </div>
  );
};

export default authHeader;
