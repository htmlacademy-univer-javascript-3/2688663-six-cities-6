import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppRoute } from '../../const';
import { AppDispatchType } from '../../store';
import { fetchCheckAuth } from '../../store/user/action';

import ProtectedRoute from '../protected-route/protected-route';
import FavoritesPage from '../../pages/favorites/favorites';
import LoginScreen from '../../pages/login/login';
import MainPage from '../../pages/main/main';
import OfferPage from '../../pages/offer/offer';
import NotFoundScreen from '../../pages/not-found-page/not-found-page';

function App() {
  const dispatch = useDispatch<AppDispatchType>();

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(fetchCheckAuth());
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<MainPage/>}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginScreen/>}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <ProtectedRoute>
              <FavoritesPage/>
            </ProtectedRoute>
          }
        />
        <Route
          path={`${AppRoute.Offer}/:id`}
          element={<OfferPage/>}
        />
        <Route
          path={AppRoute.NotFound}
          element={<NotFoundScreen/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
