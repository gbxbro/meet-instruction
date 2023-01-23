import React, { Component } from 'react';

import { ReactComponent as LabelLogoIcon } from '../../../assets/images/icons/label-logo.svg';
import { ReactComponent as LogoIcon } from '../../../assets/images/icons/logo.svg';

type Props = {

    /**
     * Define logo variant with label.
     */
    label: boolean,

    /**
     * Set class name for icon.
     */
    className: number
}

/**
 * Class for Logo component.
 *
 * @abstract
 */
class Logo extends Component<Props> {
    /**
     * Implements React's {@link Component#render}.
     *
     * @inheritdoc
     */
    render() {
        const { label, className } = this.props;

        return (
            <div className = { `logo${` ${className}`}` }>
                <a
                    className = 'logo__link'
                    href = '/'>
                    {label ? <LabelLogoIcon className = { className } /> : <LogoIcon className = { className } />}
                </a>
            </div>
        );
    }
}

export default Logo;
