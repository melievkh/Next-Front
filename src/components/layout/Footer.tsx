import { APP_NAME } from '@/config/app.config';

const Footer = () => {
  return (
    <footer className="w-full h-[60px] flex justify-between items-center border-t-1 mt-10">
      <span>
        Copyright &copy; {`${new Date().getFullYear()}`}{' '}
        <span className="font-weight-semibold">{`${APP_NAME}`}</span> All rights
        reserved.
      </span>
      <div>
        <a className="text-gray" href="/#" onClick={(e) => e.preventDefault()}>
          Term & Conditions
        </a>
        <span className="mx-2 text-muted"> | </span>
        <a className="text-gray" href="/#" onClick={(e) => e.preventDefault()}>
          Privacy & Policy
        </a>
      </div>
    </footer>
  );
};

export default Footer;
