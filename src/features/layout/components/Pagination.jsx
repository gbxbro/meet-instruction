import { Button } from '@mui/material';
import React, { Component } from 'react';
import { connect } from 'react-redux';


type Props = {

    /**
     * Instruction from parsed JSON.
     */
    pagination: Array<Object>,

    /**
     * Sidebar active element's ID.
     */
    _sidebarActiveItem: string,

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
class Pagination extends Component<Props> {

    /**
     * Initializes a new {@code Sidebar} instance.
     *
     * @param {Props} props - The read-only React {@code Component} props with
     * which the new instance is to be initialized.
     */
    constructor(props: Props) {
        super(props);

        // this._initPagination = this._initPagination.bind(this);

        this.state = {
            page: {
                prev: null,
                next: null
            }
        };
    }

    // _findPages = parent => {
    //     // const { instruction } = this.props;
    //     const parentItem = parent?.parentItem;
    //     const items = parentItem?.items || [];

    //     items.forEach((item, index) => {
    //         if (JSON.stringify(item?.id) === JSON.stringify(parent?.id)) {
    //             this.setState(prev => {
    //                 return { ...prev,
    //                     page: {
    //                         prev: index - 1 >= 0
    //                             ? items[index - 1]
    //                             : null,
    //                         current: item,
    //                         next: index + 1 < items.length
    //                             ? items[index + 1]
    //                             : null
    //                     }
    //                 };
    //             });
    //         }
    //     });
    // };

    // /**
    //  * Meow.
    //  *
    //  * @param {Array<Object>} items - Q.
    //  * @param {Array<Object>} prevItems - S.
    //  * @returns {Object}
    //  */
    // _initPagination = (instruction = [], sidebarActiveItem = []) => {
    //     const activeItem = instruction.find(item => JSON.stringify(item?.id) === JSON.stringify(sidebarActiveItem));
    //     const parent = activeItem?.parentItem;

    //     this._findPages(parent);
    // };

    /**
     * Sets local state (parsedInstruction) after parsing JSON instruction.
     *
     * @inheritdoc
     * @returns {void}
     */
    // componentDidUpdate(prevProps) {
    //     const { pagination, _sidebarActiveItem: sidebarActiveItem } = this.props;
    //     const { _sidebarActiveItem: prevSidebarActiveItem } = prevProps;

    //     const isUpdatedActiveItem = JSON.stringify(prevSidebarActiveItem) !== JSON.stringify(sidebarActiveItem);

    //     if (isUpdatedActiveItem && pagination?.length) {
    //         console.log(pagination);

    //         const currentPage = pagination?.length
    //             && pagination.find(item => JSON.stringify(item?.id) === JSON.stringify(sidebarActiveItem));

    //         console.log(currentPage);
    //     }
    // }

    /**
     * Implements React's {@link Component#render}.
     *
     * @inheritdoc
     */
    render() {

        return (
            <nav className = 'content-nav'>
                <Button
                    className = 'content-nav__button'
                    color = 'success'
                    size = 'large'
                    variant = 'outlined'>
                    Пред.
                </Button>
                <Button
                    className = 'content-nav__button'
                    color = 'success'
                    size = 'large'
                    variant = 'outlined'>
                    След.
                </Button>
            </nav>
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

export default connect(mapStateToProps)(Pagination);
