import { t } from 'i18next';
import { useAppSelector } from '../../../../redux/hooks';
import { User } from '../../../../utils/types';

export default function Basic() {
  const user = useAppSelector(state => state.userReducer);

  return (
    <>
      <h2>{t('basic_information')}</h2>
      <form className="profile-form">
        {['run', 'name', 'first_surname', 'email'].map(key => {
          return (
            <div
              key={key}
              className="profile-form-group"
            >
              <label
                className="profile-form-label"
                htmlFor={key}
              >
                {t(key)}:
              </label>
              <input
                className="profile-form-input"
                id={key}
                type="text"
                placeholder={t(key)}
                disabled
                defaultValue={`${user[key as keyof User] ?? ''}${
                  key === 'run' ? `-${user.dv}` : ''
                }`}
              />
            </div>
          );
        })}
      </form>
    </>
  );
}
