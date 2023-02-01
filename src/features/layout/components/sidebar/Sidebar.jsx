import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Box, Drawer, IconButton, List } from '@mui/material';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { scrollSpy } from 'react-scroll';

import { ListItem, Logo } from '../';
import { compareIds } from '../../functions';
import { toggleSidebar } from '../../reducer';


type Props = {

    /**
     * Defines is sidebar is open.
     */
    _isShowSidebar: boolean,

    /**
     * Defines is sidebar is open.
     */
    _sidebarActiveItemId: Array<number>,

    /**
     * Instruction from JSON.
     */
    instruction: Array<Object>,

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
     * Sets local state (parsedInstruction) after parsing JSON instruction.
     *
     * @inheritdoc
     * @returns {void}
     */
    componentDidUpdate(prevProps) {
        const { _sidebarActiveItemId: prevId } = prevProps;
        const { _sidebarActiveItemId: id } = this.props;

        if (!compareIds(prevId, id)) {
            scrollSpy.update();
        }
    }

    /**
     * Implements React's {@link Component#render}.
     *
     * @inheritdoc
     */
    render() {
        const { _isShowSidebar, instruction } = this.props;

        return (
            <Drawer
                anchor = 'left'
                className = { `sidebar${_isShowSidebar ? ' sidebar_open' : ''}` }
                open = { _isShowSidebar }
                variant = 'persistent'>
                <Box className = 'sidebar__header'>
                    <Logo className = 'sidebar__logo' />
                    <IconButton onClick = { this._onToggleSidebar }>
                        <ChevronLeftIcon />
                    </IconButton>
                </Box>
                <div className = 'sidebar__list'>
                    <List>
                        {Array.isArray(instruction)
                            && instruction.length > 0
                            && instruction.map(item => {
                                const id = item?.id || [];

                                return (
                                    <ListItem
                                        item = { item }
                                        key = { id.map(i => i + 1).join('.') }
                                        title = { `${id.map(i => i + 1).join('.')}. ${item?.title}` } />
                                );
                            })}
                    </List>
                </div>
            </Drawer>
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
    const { isShowSidebar, sidebarActiveItemId } = state.layout;

    return {
        _isShowSidebar: isShowSidebar,
        _sidebarActiveItemId: sidebarActiveItemId

    };
}

export default connect(mapStateToProps)(Sidebar);
