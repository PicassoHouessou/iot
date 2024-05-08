import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <div className="main-footer">
            <span>&copy; 2024. Picasso Houessou. All Rights Reserved.</span>
            <span>
                Created by:{' '}
                <Link to="http://picassohouessou.com" target="_blank">
                    Picasso Houessou
                </Link>
            </span>
        </div>
    );
}
