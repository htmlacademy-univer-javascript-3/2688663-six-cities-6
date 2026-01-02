import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { AppRoute, AuthorizationStatus } from '../../const';
import { selectAuthorizationStatus } from '../../store/user/selectors';
import Spinner from '../spinner/spinner'; // Лучше оставить спиннер

type ProtectedRouteProps = {
  children: JSX.Element;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const authorizationStatus = useSelector(selectAuthorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <Spinner />; 
  }

  return authorizationStatus === AuthorizationStatus.Auth 
    ? children 
    : <Navigate to={AppRoute.Login} />;
}

export default ProtectedRoute;