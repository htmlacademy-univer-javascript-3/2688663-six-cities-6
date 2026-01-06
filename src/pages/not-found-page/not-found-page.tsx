import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

function NotFoundScreen(): JSX.Element {
  return (
    <div>
      <Header/>
      <h1>Not Found 404</h1>
      <Link to={AppRoute.Root}>
        <span>To main</span>
      </Link>
      <Footer />
    </div>
  );
}

export default NotFoundScreen;
