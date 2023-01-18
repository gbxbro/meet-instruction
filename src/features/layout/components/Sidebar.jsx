import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Box, Divider, Drawer, IconButton, List } from '@mui/material';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import instructions from '../../../config/instructions.json';
import { toggleSidebar } from '../reducer';

import ListItem from './ListItem';

type Props = {

    /**
     * Defines is sidebar is open.
     */
    _isShowSidebar: boolean,

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
class Sidebar extends Component<Props> {
    /**
     * Initializes a new {@code Sidebar} instance.
     *
     * @param {Props} props - The read-only React {@code Component} props with
     * which the new instance is to be initialized.
     */
    constructor(props: Props) {
        super(props);

        this._onToggleSidebar = this._onToggleSidebar.bind(this);
    }

    /**
     * Dispatches an action for toggling Sidebar.
     *
     * @returns {void}
     */
    _onToggleSidebar() {
        this.props.dispatch(toggleSidebar());
    }

    /**
     * Implements React's {@link Component#render}.
     *
     * @inheritdoc
     */
    render() {
        const { _isShowSidebar } = this.props;

        // console.log(instructions);

        return (
            <div className = 'sidebar'>
                <Drawer
                    anchor = 'left'
                    open = { _isShowSidebar }
                    variant = 'persistent'>
                    <Box className = 'sidebar__header'>
                        <IconButton onClick = { this._onToggleSidebar }>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Box>
                    <Divider />
                    <div className = 'sidebar__list'>
                        <List>
                            {instructions.map((item, index) => {
                                const currentId = index + 1;

                                return (
                                    <ListItem
                                        content = { item?.items || [] }
                                        id = { currentId }
                                        key = { index }
                                        title = { `${currentId}. ${item?.title}` } />
                                );
                            })}
                        </List>
                    </div>
                    <Divider />
                </Drawer>
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

export default connect(mapStateToProps)(Sidebar);
