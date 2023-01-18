import React, { Component } from 'react';

/**
 * Logo class.
 *
 * @abstract
 */
class Logo extends Component {

    /**
     * Implements React's {@link Component#render}.
     *
     * @inheritdoc
     */
    render() {
        return (
            <div className = 'logo'>
                <a
                    className = 'logo__link'
                    href = '/'>
                    <img
                        alt = 'logo'
                        src = 'https://static.tildacdn.com/tild6166-3965-4239-a437-326132303463/Logo_mint.svg' />
                </a>
            </div>
        );
    }
}

export default Logo;
