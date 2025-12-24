import { Navigate } from "react-router-dom";

import { AppRoute, AuthorizationStatus } from "../../const";

type ProtectedRouteProps = {
    restrictedFor: AuthorizationStatus;
    redirectTo: AppRoute; 
    children: JSX.Element;
}

function ProtectedRoute({
    restrictedFor,
    redirectTo, 
    children,
}: ProtectedRouteProps) {
    const authorizationStatus = AuthorizationStatus.NoAuth;

    return restrictedFor === authorizationStatus ? (
        <Navigate to={redirectTo} />
    ) : (
        children
    );
}

export default ProtectedRoute;