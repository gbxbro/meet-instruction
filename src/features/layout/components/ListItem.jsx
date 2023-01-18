import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, List, ListItemButton, ListItemText } from '@mui/material';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setItemId } from '../reducer';

// import SidebarList from './SidebarList';

type Props = {

    /**
     * Defines is SidebarItem is active.
     */
    title: boolean,

    /**
     * Defines is SidebarItem is active.
     */
    id: Number,

    /**
     * Defines is SidebarItem is expanded.
     */
    content: Array<Object> | never,

    /**
     * Defines is SidebarItem is expanded.
     */
    _onClickItem: () => void,

    /**
     * The redux {@code dispatch} function.
     */
    dispatch: Function
};

/**
 * Class for main Footer component.
 *
 * @abstract
 */
class ListItem extends Component<Props> {
    /**
     * Initializes a new {@code SidebarItem} instance.
     *
     * @param {Props} props - The read-only React {@code Component} props with
     * which the new instance is to be initialized.
     */
    constructor(props: Props) {
        super(props);

        this._onClickItem = this._onClickItem.bind(this);
        this._onClickExpandedItem = this._onClickExpandedItem.bind(this);

        this.state = {
            isExpanded: false
        };
    }

    /**
     * On click item handler.
     *
     * @returns {void}
     */
    _onClickItem() {
        const { id, dispatch } = this.props;

        console.log('id', id);

        dispatch(setItemId(id));

    }

    /**
     * On click item handler.
     *
     * @returns {void}
     */
    _onClickExpandedItem() {
        // const { id } = this.props;
        const { isExpanded } = this.state;

        this.setState({
            isExpanded: !isExpanded
        });
    }

    /**
     * Implements React's {@link Component#render}.
     *
     * @inheritdoc
     */
    render() {
        const { title, content, id } = this.props;
        const { isExpanded } = this.state;

        if (content?.length) {
            return (
                <>
                    <ListItemButton onClick = { this._onClickExpandedItem }>
                        <ListItemText primary = { title } />
                        {isExpanded ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse
                        in = { isExpanded }
                        timeout = 'auto'
                        unmountOnExit = { true }>
                        <List sx = {{ pl: 2 }}>
                            {content.map((item, index) => {
                                const currentId = index + 1;
                                const { _onClickItem } = this;

                                return (
                                    <ListItem
                                        _onClickItem = { _onClickItem }
                                        content = { item?.items || [] }
                                        id = { `${id}.${currentId}.` }
                                        key = { index }
                                        title = { `${id}.${currentId}. ${item?.title}` } />
                                );
                            })}
                        </List>
                    </Collapse>
                </>

            );

        }

        return (
            <ListItemButton onClick = { this.props._onClickItem }>
                <ListItemText primary = { title } />
            </ListItemButton>
        );
    }
}

/**
 * Function that maps parts of Redux state tree into component props.
 *
 * @param {Object} state - Redux state.
 * @returns {Object}
 */
const mapStateToProps = () => {

    return {};
};

// const mapDispatchToProps = (dispatch, ownProps) => {
//     return {
//         _onClickItem: () => {
//             const { id } = ownProps;

//             console.log('id', id);

//             dispatch(setItemId(id));
//         }
//     };
// };

export default connect(mapStateToProps)(ListItem);
