import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { toggleSidebar } from '../reducer';

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
class Header extends Component<Props> {
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

        return (
            <div className = 'header'>
                <AppBar
                    color = 'inherit'
                    open = { _isShowSidebar }
                    position = 'static'>
                    <Toolbar>
                        <IconButton
                            aria-label = 'open drawer'
                            color = 'inherit'
                            edge = 'end'
                            onClick = { this._onToggleSidebar }
                            sx = {{
                                mr: 2,
                                ..._isShowSidebar && { display: 'none' }
                            }}>
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component = 'div'
                            noWrap = { true }
                            sx = {{ flexGrow: 1,
                                ml: 2,
                                fontFamily: 'Manrope, Roboto'
                            }}
                            variant = 'h6'>
                            Руководство пользователя
                        </Typography>
                    </Toolbar>
                </AppBar>
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

export default connect(mapStateToProps)(Header);
