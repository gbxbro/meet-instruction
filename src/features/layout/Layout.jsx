import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Content, Footer, Header } from './';

type Props = {
    _isShowSidebar: boolean
}

/**
 * Class for main Footer component.
 *
 * @abstract
 */
class Layout extends Component<Props> {

    /**
     * Implements React's {@link Component#render}.
     *
     * @inheritdoc
     */
    render() {
        const { _isShowSidebar } = this.props;

        return (
            <div className = { `app${_isShowSidebar ? ' app_indent' : ''}` }>
                <Header />
                <main className = 'main'>
                    <Content />
                </main>
                <Footer />
            </div>
        );
    }

}

/**
 * Function that maps parts of Redux state tree into component props.
 *
 * @param {Object} state - Redux state.
 * @returns {Object}
 */
function mapStateToProps(state) {
    const { isShowSidebar } = state.layout;

    return {
        _isShowSidebar: isShowSidebar
    };
}

export default connect(mapStateToProps)(Layout);
