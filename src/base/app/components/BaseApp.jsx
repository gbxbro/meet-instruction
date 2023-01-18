import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { Layout } from '../../../features/layout';
import store from '../../../store';
import '../../../assets/styles/style.css';

type Props = {

}

/**
 * Base (abstract) class for main App component.
 *
 * @abstract
 */
class BaseApp extends Component<Props> {
    /**
     * Initializes a new {@code BaseApp} instance.
     *
     * @param {Props} props - The read-only React {@code Component} props with
     * which the new instance is to be initialized.
     */
    constructor(props: Props) {
        super(props);

        this.state = {

        };
    }

    /**
     * Implements React's {@link Component#render}.
     *
     * @inheritdoc
     */
    render() {
        return (
            <Provider store = { store }>
                <Layout />
            </Provider>
        );
    }
}

export default BaseApp;
