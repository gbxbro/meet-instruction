import { Container } from '@mui/material';
import React, { Component } from 'react';
import { connect } from 'react-redux';

type Props = {

    /**
     * Instruction from parsed JSON.
     */
    instruction: Array<Object>,

    /**
     * Sidebar active element's ID.
     */
    _sidebarActiveItem: string,

    /**
     * Sidebar active element's content.
     */
    _sidebarActiveItemContent: string,

    /**
     * The redux {@code dispatch} function.
     */
    dispatch: Function
}

/**
 * Class for layout's Content component.
 *
 * @abstract
 */
class Content extends Component<Props> {

    /**
     * Implements React's {@link Component#render}.
     *
     * @inheritdoc
     */
    render() {
        const { _sidebarActiveItemContent } = this.props;

        return (
            <section className = 'content'>
                <Container>
                    <div
                        className = 'content__item'
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML = {{ __html: _sidebarActiveItemContent }} />
                </Container>
            </section>
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
    const { sidebarActiveItem, sidebarActiveItemContent } = state.layout;

    return {
        _sidebarActiveItem: sidebarActiveItem,
        _sidebarActiveItemContent: sidebarActiveItemContent
    };
}

export default connect(mapStateToProps)(Content);
