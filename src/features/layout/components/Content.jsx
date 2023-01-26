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
     * Initializes a new {@code Sidebar} instance.
     *
     * @param {Props} props - The read-only React {@code Component} props with
     * which the new instance is to be initialized.
     */
    constructor(props: Props) {
        super(props);

        // this._findItemById = this._findItemById.bind(this);
        this._getPreviousPage = this._getPreviousPage.bind(this);

        this.state = {
            page: {
                prev: null,
                current: null,
                next: null
            }
        };
    }

    _getPreviousPage = (id = [], item) => {
        const items = item?.items || [];
        const parentItem = item?.parentItem;
        const parentItems = parentItem?.items || [];
        const isPage = (!items.length && !parentItem) || (items.length && parentItem?.items);

        // if (!parentItem) {
        //     return null;
        // }

        // if (parentItem && parentItems?.length) {
        //     for (let i = 0; i < parentItems?.length; i++) {
        //         if (JSON.stringify(parentItems[i]?.id) === JSON.stringify(id)) {
        //             if (i - 1 >= 0 && isPage) {
        //                 return items[i - 1];
        //             }

        //             return this._getPreviousPage(parentItem?.id, parentItem?.parentItem);
        //         }
        //     }
        // } else if (!parentItem) {

        // }
    };

    /**
     * Sets local state (parsedInstruction) after parsing JSON instruction.
     *
     * @inheritdoc
     * @returns {void}
     */
    componentDidUpdate(prevProps) {
        const { _sidebarActiveItem: prevSidebarActiveItem } = prevProps;
        const { items = [], _sidebarActiveItem: sidebarActiveItem } = this.props;

        if (items.length) {
            console.log('ITEMS', items);
        }

        if (JSON.stringify(prevSidebarActiveItem) !== JSON.stringify(sidebarActiveItem)) {
            scroller.scrollTo(sidebarActiveItem.join('.'), {
                containerId: 'app__content'
            });

            if (items?.length) {
                const currentPage = items.find(item => JSON.stringify(item?.id) === JSON.stringify(sidebarActiveItem));
                const previousPage = this._getPreviousPage(sidebarActiveItem, currentPage?.parentItem);

                console.log('PREV', previousPage);


                // items.forEach((item, index) => {
                //     const parentItem = item?.parentItem?.parentItem;
                //     const isCurrentPage = JSON.stringify(item?.id) === JSON.stringify(sidebarActiveItem);

                //     if (isCurrentPage) {
                //         const previousPage = index - 1 >= 0
                //             ? items[index - 1]?.items?.length
                //                 ? items[index - 1]
                //                 : this._getChildFromParent(parentItem)
                //             : this._getChildFromParent(parentItem);

                //         console.log('prev', previousPage);
                //     }
                // });

                //         const previousPage = index - 1 >= 0
                //             ? items[index - 1]?.items?.length
                //                 ? items[index - 1]
                //                 : this._getChildFromParent(parentItem, true)
                //             : this._getChildFromParent(parentItem, true);

                //         const nextPage = index + 1 < items?.length
                //             ? items[index + 1]?.items?.length
                //                 ? items[index + 1]
                //                 : this._getChildFromParent(parentItem)
                //             : this._getChildFromParent(parentItem);

                //         console.log('prev', previousPage);
                //         console.log('next', nextPage);
                //     }
                // });


                // items.forEach((item, index) => {

                //     if (JSON.stringify(item?.id) === JSON.stringify(sidebarActiveItem)) {


                //         const prevPage = index - 1 >= 0
                //             ? items[index - 1]?.items?.length
                //                 ? items[index - 1]
                //                 : clickedParent?.parentItem?.items

                //     }
                // });

                // console.log(currentPage);
            }
        }
    }

    /**
     * Implements React's {@link Component#render}.
     *
     * @inheritdoc
     */
    render() {
        const { items, _sidebarActiveItemContent: sidebarActiveItemContent } = this.props;

        return (
            <section className = 'content'>
                <Container>
                    {sidebarActiveItemContent?.item?.items?.length > 0 ? (
                        <>
                            <h1 className = 'content__title'>
                                {sidebarActiveItemContent?.item?.title}
                            </h1>
                            <div
                                className = 'content__markdown'
                                // eslint-disable-next-line react/no-danger
                                dangerouslySetInnerHTML = {{
                                    __html: sidebarActiveItemContent?.item?.content
                                }} />
                            {sidebarActiveItemContent.item.items.map((item, index) => (
                                <Element
                                    key = { `${[ sidebarActiveItemContent?.id ].join('.')}.${index}` }
                                    name = { `${[ sidebarActiveItemContent?.id ].join('.')}.${index}` }>
                                    <h1 className = 'content__title'>
                                        {item?.title}
                                    </h1>
                                    <div
                                        className = 'content__markdown'
                                        // eslint-disable-next-line react/no-danger
                                        dangerouslySetInnerHTML = {{ __html: item?.content }} />
                                </Element>
                            ))}
                        </>
                    )
                        : (
                            <>
                                <h1 className = 'content__title'>
                                    {sidebarActiveItemContent?.item?.title}
                                </h1>
                                <div
                                    className = 'content__markdown'
                                    // eslint-disable-next-line react/no-danger
                                    dangerouslySetInnerHTML = {{
                                        __html: sidebarActiveItemContent?.item?.content
                                    }} />
                            </>
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
    const { sidebarActiveItem, sidebarActiveItemContent } = state.layout;

    return {
        _sidebarActiveItem: sidebarActiveItem,
        _sidebarActiveItemContent: sidebarActiveItemContent
    };
}

export default connect(mapStateToProps)(Content);
