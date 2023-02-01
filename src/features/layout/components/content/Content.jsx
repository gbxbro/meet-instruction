import { Container } from '@mui/material';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { compareIds } from '../../functions';

import ContentItem from './ContentItem';
import Pagination from './Pagination';


type Props = {

    /**
     * Instruction from parsed JSON.
     */
    items: Array<Object>,

    /**
     * Sidebar active element's ID.
     */
    _sidebarActiveItemId: string,

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
     * Initializes a new {@code Sidebar} instance.
     *
     * @param {Props} props - The read-only React {@code Component} props with
     * which the new instance is to be initialized.
     */
    constructor(props: Props) {
        super(props);

        // this._getPreviousPage = this._getPreviousPage.bind(this);
        // this._getNextPage = this._getNextPage.bind(this);

        this.state = {
            page: {
                prev: null,
                current: null,
                next: null
            }
        };
    }

    _getPaginationPages = (items = [], id = []) => {
        for (let i = 0; i < items?.length; i++) {
            if (compareIds(items[i]?.id, id)) {
                const prev = i - 1 >= 0
                    ? items[i - 1]
                    : null;

                const next = i + 1 < items.length
                    ? items[i + 1]
                    : null;

                return {
                    prev,
                    current: items[i],
                    next
                };
            }
        }
    };

    /**
     * Sets local state (parsedInstruction) after parsing JSON instruction.
     *
     * @inheritdoc
     * @returns {void}
     */
    componentDidUpdate(prevProps) {
        const { _sidebarActiveItemId: prevId } = prevProps;
        const { items = [], _sidebarActiveItemId: id } = this.props;

        if (!compareIds(prevId, id)) {

            if (items?.length && id?.length) {
                const pages = this._getPaginationPages(items, [ id[0] ]);

                this.setState(prev => {
                    return {
                        ...prev,
                        page: {
                            prev: pages?.prev,
                            current: pages?.current,
                            next: pages?.next
                        }
                    };
                });
            }
        }
    }

    /**
     * Implements React's {@link Component#render}.
     *
     * @inheritdoc
     */
    render() {
        const { page: { prev, current, next } } = this.state;

        return (
            <section className = 'content'>
                <Container>
                    {current && (
                        <>
                            <ContentItem item = { current } />
                            <Pagination
                                nextPage = { next }
                                prevPage = { prev } />
                        </>
                    )}
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
    const { sidebarActiveItemId } = state.layout;

    return { _sidebarActiveItemId: sidebarActiveItemId };
}

export default connect(mapStateToProps)(Content);
