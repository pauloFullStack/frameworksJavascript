import { BiArrowBack } from 'react-icons/bi';
import { Link } from 'react-router-dom';

function ToGoBack({ routeHost }) {


  return (
    <>
      <Link className='bi-arrow-back' to={routeHost} >
        <BiArrowBack />
      </Link>
    </>
  );
}


export default ToGoBack;
