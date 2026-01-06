import { useState, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchLogin } from '../../store/user/action';
import { setServerError } from '../../store/error/action';
import { selectServerError } from '../../store/error/selectors';
import { AppDispatchType } from '../../store';
import { Link, Navigate } from 'react-router-dom';

import { AppRoute, CityName } from '../../const';
import { setCity } from '../../store/offers/action';
import { selectIsError } from '../../store/error/selectors';
import { selectIsAuth } from '../../store/user/selectors';
import Message from '../../components/error-message/error-message';


function LoginScreen() {
  const dispatch: AppDispatchType = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const isError = useSelector(selectIsError);
  const serverError = useSelector(selectServerError);


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const cities: CityName[] = Object.values(CityName);
  const [randomCity] = useState(
    () => cities[Math.floor(Math.random() * cities.length)]
  );

  if (isAuth) {
    return <Navigate to={AppRoute.Root} />;
  }

  const validatePassword = (pwd: string) => /[A-Za-z]/.test(pwd) && /\d/.test(pwd);

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    if (!validatePassword(password)) {
      dispatch(setServerError('Пароль должен содержать минимум одну английскую букву и одну цифру'));
      return;
    }

    if (serverError) {
      dispatch(setServerError(''));
    }

    dispatch(fetchLogin({ email, password }));
  };


  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          {isError && <Message />}
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.Root}>
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button className="login__submit form__submit button" type="submit">
                Sign in
              </button>
            </form>
          </section>

          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                className="locations__item-link"
                to={AppRoute.Root}
                onClick={() => dispatch(setCity(randomCity))}
              >
                <span>{randomCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginScreen;
