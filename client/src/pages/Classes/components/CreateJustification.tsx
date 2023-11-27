import { t } from 'i18next';
import Select from 'react-select';

export function CreateJustification() {
  return (
    <>
      <section>
        <form>
          <label htmlFor="title">{t('title')}</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder={t('title')}
            required
          />
          <label htmlFor="content">{t('content')}</label>
          <textarea
            name="content"
            id="content"
            placeholder={t('content')}
            required
          />
          <label htmlFor="category">{t('category')}</label>
          <Select
            name="category"
            placeholder={t('category')}
            className="react-select-container"
            classNamePrefix="react-select"
            required
          />
          <label>{t('expires')}</label>
          <input
            type="date"
            name="expiresAt"
            id="expiresAt"
            min={new Date().toISOString().split('T')[0]}
            max={
              new Date(new Date().setMonth(new Date().getMonth() + 1))
                .toISOString()
                .split('T')[0]
            }
            required
          />

          <label htmlFor="target">{t('target')}</label>
          <Select
            name="target"
            placeholder={t('target')}
            className="react-select-container"
            classNamePrefix="react-select"
            required
          />

          <label htmlFor="image">{t('image')}</label>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
          />
        </form>
      </section>
    </>
  );
}

export default CreateJustification;
