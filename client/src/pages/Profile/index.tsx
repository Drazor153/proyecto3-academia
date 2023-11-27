import { FaUser } from 'react-icons/fa';
import { profileItems } from '../../utils/pages';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
// import Fade from '../../components/Fade';
import { Academic, Basic, Security } from './components';
import { useEffect, useRef } from 'react';
import { useAppSelector } from '@/redux/hooks';

// function Switcher({ tab }: { tab: string | undefined }) {
//   switch (tab) {
//     case 'basic':
//       return <Basic />;
//     case 'academic':
//       return <Academic />;
//     case 'security':
//       return <Security />;
//     default:
//       return <>Hola</>;
//   }
// }

export default function Profile() {
  useTranslation();

  const { run, dv, name, first_surname, email } = useAppSelector(
    state => state.userReducer,
  );

  return (
    <>
      <h1>{t('profile')}</h1>
      <main className="profile">
        <section className="profile-personal-info">
          <h2>{t('personal_info')}</h2>
          <FaUser className="faUser" />
          <div className="info">
            <div className="info-item">
              <span className="info-item-label">{t('run')}</span>
              <span className="info-item-value">{`${run}-${dv}`}</span>
            </div>
            <div className="info-item">
              <span className="info-item-label">{t('name')}</span>
              <span className="info-item-value">{`${name} ${first_surname}`}</span>
            </div>
            <div className="info-item">
              <span className="info-item-label">{t('email')}</span>
              <span className="info-item-value">
                {email ?? t('no_information')}
              </span>
            </div>
          </div>
        </section>
        <hr />
        <div className="profile-academic-info">das</div>
      </main>
    </>
  );
}
