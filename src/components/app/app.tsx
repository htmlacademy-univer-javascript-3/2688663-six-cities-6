import {Route, BrowserRouter, Routes} from 'react-router-dom'
import {Helmet, HelmetProvider} from 'react-helmet-async'

import MainScreen from '../../pages/main/main';
import FavoritesScreen from '../../pages/favorites/favorites';
import LoginScreen from '../../pages/login/login';
import OfferScreen from '../../pages/offer/offer';
import NotFoundScreen from '../../pages/not-found-page/not-found-page';
import ProtectedRoute from '../protected-route/protected-route';

import { AppRoute, AuthorizationStatus } from '../../const';

type AppProps = {
    offersCount: number;
}


function App({offersCount}: AppProps) {
  return (
    <HelmetProvider>
        <BrowserRouter>
            <Routes>
                <Route
                    path = {AppRoute.Root}
                    element = {<MainScreen offersCount={offersCount}></MainScreen>}
                />
                <Route
                    path = {AppRoute.Favorites}
                    element = {
                        <ProtectedRoute
                            restrictedFor={AuthorizationStatus.NoAuth}
                            redirectTo={AppRoute.Login}
                        >
                            <FavoritesScreen/>
                        </ProtectedRoute>
                }
                />
                <Route
                    path = {AppRoute.Login}
                    element = {
                        <ProtectedRoute
                            restrictedFor={AuthorizationStatus.Auth}
                            redirectTo={AppRoute.Root}
                        >
                            <LoginScreen />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path = {`${AppRoute.Offer}/:offerId`}
                    element = {<OfferScreen/>}
                />
                <Route
                    path={AppRoute.NotFound}
                    element={<NotFoundScreen />}
    />
                <Route
                    path='*'
                    element= {<NotFoundScreen/>}
                />
            </Routes>
        </BrowserRouter>
    </HelmetProvider>
  
  )
}


export default App;
