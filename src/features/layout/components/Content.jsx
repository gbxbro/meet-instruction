import { Container } from '@mui/material';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Element, scroller } from 'react-scroll';

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
     * Sidebar active element's content.
     */
    _sidebarActiveItemData: string,

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
        this._getPreviousPage = this._getPreviousPage.bind(this);
        this._getNextPage = this._getNextPage.bind(this);

        this.state = {
            page: {
                prev: null,
                current: null,
                next: null
            }
        };
    }

    /**
     * Co.
     *
     * @param {number} activeItemIndex - Me.
     * @returns {Object}
     */
    _getPreviousPage = activeItemIndex => {
        const { items } = this.props;

        for (let i = activeItemIndex - 1; i >= 0; i--) {
            if (items[i]?.isPage) {
                return items[i];
            }
        }

        return null;
    };

    /**
     * Co.
     *
     * @param {number} activeItemIndex - Me.
     * @returns {Object}
     */
    _getNextPage = activeItemIndex => {
        const { items } = this.props;

        for (let i = activeItemIndex + 1; i < items.length; i++) {
            if (items[i]?.isPage) {
                return items[i];
            }
        }

        return null;
    };

    /**
     * Sets local state (parsedInstruction) after parsing JSON instruction.
     *
     * @inheritdoc
     * @returns {void}
     */
    componentDidUpdate(prevProps) {
        const { _sidebarActiveItemId: prevSidebarActiveItemId } = prevProps;
        const { items = [], _sidebarActiveItemId: sidebarActiveItemId } = this.props;

        if (JSON.stringify(prevSidebarActiveItemId) !== JSON.stringify(sidebarActiveItemId)) {
            scroller.scrollTo(sidebarActiveItemId.join('.'), {
                containerId: 'app__content'
            });

            if (items?.length) {
                const activeItemIndex = items
                    .findIndex(item => JSON.stringify(item?.id) === JSON.stringify(sidebarActiveItemId));

                const prevPage = this._getPreviousPage(activeItemIndex);
                const nextPage = this._getNextPage(activeItemIndex);

                console.log('prev', prevPage);
                console.log('next', nextPage);
            }
        }
    }

    /**
     * Implements React's {@link Component#render}.
     *
     * @inheritdoc
     */
    render() {
        const { items, _sidebarActiveItemData: sidebarActiveItemData } = this.props;

        return (
            <section className = 'content'>
                <Container>
                    {sidebarActiveItemData?.items?.length > 0 ? (
                        <>
                            <div className = 'content__wrapper'>
                                <h1 className = 'content__title'>
                                    {sidebarActiveItemData?.id?.length
                                    && `${sidebarActiveItemData.id.map(i => i + 1).join('.')}. `}
                                    {sidebarActiveItemData?.title}
                                </h1>
                                <div
                                    className = 'content__markdown'
                                    // eslint-disable-next-line react/no-danger
                                    dangerouslySetInnerHTML = {{
                                        __html: sidebarActiveItemData?.content
                                    }} />
                            </div>
                            {sidebarActiveItemData.items.map((item, index) => (
                                <div
                                    className = 'content__wrapper'
                                    key = { `${[ sidebarActiveItemData?.id ].join('.')}.${index}` }>
                                    <Element name = { `${[ sidebarActiveItemData?.id ].join('.')}.${index}` }>
                                        <h1 className = 'content__title'>
                                            {item?.id?.length
                                            && `${item.id.map(i => i + 1).join('.')}. `}
                                            {item?.title}
                                        </h1>
                                        <div
                                            className = 'content__markdown'
                                            // eslint-disable-next-line react/no-danger
                                            dangerouslySetInnerHTML = {{ __html: item?.content }} />
                                    </Element>
                                </div>
                            ))}
                        </>
                    )
                        : (
                            <div className = 'content__wrapper'>
                                <h1 className = 'content__title'>
                                    {sidebarActiveItemData?.id?.length
                                        && `${sidebarActiveItemData.id.map(i => i + 1).join('.')}. `}
                                    {sidebarActiveItemData?.title}
                                </h1>
                                <div
                                    className = 'content__markdown'
                                    // eslint-disable-next-line react/no-danger
                                    dangerouslySetInnerHTML = {{
                                        __html: sidebarActiveItemData?.content
                                    }} />
                            </div>
                        )
                    }

                    <Pagination pagination = { items } />
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
    const { sidebarActiveItemId, sidebarActiveItemData } = state.layout;

    return {
        _sidebarActiveItemId: sidebarActiveItemId,
        _sidebarActiveItemData: sidebarActiveItemData
    };
}

export default connect(mapStateToProps)(Content);
