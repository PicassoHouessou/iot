import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
    const { t } = useTranslation();
    return (
        <div className="main-footer">
            <span>&copy; 2024. Picasso Houessou. All Rights Reserved.</span>
            <span>
                {t('Créé par :')}{' '}
                <Link to="https://picassohouessou.com" target="_blank">
                    Picasso Houessou
                </Link>
            </span>
        </div>
    );
}
