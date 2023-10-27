import { TailSpin } from 'react-loading-icons';
import { AiOutlineLock } from 'react-icons/ai';
import { t } from 'i18next';

function Logout({ show }: { show: string }) {
	return (
		<>
			<div className={'logout-overlay ' + show} />
			<div className={'logout-container ' + show}>
				<div className="logout-icons">
					<TailSpin
						stroke="#8d2840"
						className="tailspin"
					/>
					<AiOutlineLock className="lock" />
				</div>
				<div className="logout-text">
					<p>{t('logging_out')}</p>
				</div>
			</div>
		</>
	);
}

export default Logout;
