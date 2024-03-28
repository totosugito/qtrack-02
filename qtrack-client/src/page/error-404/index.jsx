import React from 'react';
import { useTranslation } from 'react-i18next';

function Error404() {
  const [t] = useTranslation();

  return (
    <h1>
      {t('common.pageNotFound', {
        context: 'title',
      })}
    </h1>
  );
}

export default Error404;
