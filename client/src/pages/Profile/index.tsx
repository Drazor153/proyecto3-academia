import { FaUser } from 'react-icons/fa';
import { profileItems } from '../../utils/pages';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import Fade from '../../components/Fade';
import { Academic, Basic, Security } from './components';
import { useEffect, useRef } from 'react';

function Switcher({ tab }: { tab: string | undefined }) {
  switch (tab) {
    case 'basic':
      return <Basic />;
    case 'academic':
      return <Academic />;
    case 'security':
      return <Security />;
    default:
      return <>Hola</>;
  }
}

export default function Profile() {
  useTranslation();

  const navigate = useNavigate();
  const { tab } = useParams();
  const nodeRef = useRef(null);

  const allowedParams = profileItems.map(({ path }) => path.split('/')[2]);
  useEffect(() => {
    if (![undefined, ...allowedParams].includes(tab)) {
      navigate('/profile');
    }
  }, [tab]);

  return (
    <>
      <h1>{t('profile')}</h1>
      <main className="profile">
        <aside className="profile-container">
          <h2>{t('options')}</h2>
          <FaUser className="faUser" />
          <div className="profile-options">
            {profileItems.map(({ path, name }) => (
              <NavLink
                className={({ isActive }) =>
                  `profile-option link ${isActive ? 'active' : ''}`
                }
                key={name}
                to={path}
              >
                {name}
              </NavLink>
            ))}
          </div>
        </aside>
        <Fade
          nodeRef={nodeRef}
          show={allowedParams.includes(tab ?? '')}
          className={`profile-${tab}-content`}
        >
          {Switcher({ tab })}
        </Fade>
      </main>
    </>
  );
}
