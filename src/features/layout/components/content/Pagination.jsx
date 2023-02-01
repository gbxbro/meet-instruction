import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Button } from '@mui/material';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setSidebarActiveItemId } from '../../reducer';


type Props = {

    /**
     * The redux {@code dispatch} function.
     */
    prevPage: Object,

    /**
     * The redux {@code dispatch} function.
     */
    nextPage: Object,

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

        this._onClickPrev = this._onClickPrev.bind(this);
        this._onClickNext = this._onClickNext.bind(this);
    }

    _onClickPrev = () => {
        const { prevPage, dispatch } = this.props;

        if (prevPage) {
            dispatch(setSidebarActiveItemId(prevPage?.id));
        }
    };

    _onClickNext = () => {
        const { nextPage, dispatch } = this.props;

        if (nextPage) {
            dispatch(setSidebarActiveItemId(nextPage?.id));
        }
    };

    /**
     * Implements React's {@link Component#render}.
     *
     * @inheritdoc
     */
    render() {
        const { prevPage, nextPage } = this.props;
        const prevPageId = prevPage?.id || [];
        const nextPageId = nextPage?.id || [];

        return (
            <nav className = 'pagination'>
                <Button
                    className = 'pagination__button'
                    color = 'success'
                    disabled = { !prevPage }
                    onClick = { this._onClickPrev }
                    size = 'large'
                    variant = 'outlined'>
                    <NavigateBeforeIcon />
                    {prevPageId.length && `${prevPageId.map(i => i + 1).join('.')}. `}
                    {prevPage?.title || ''}
                </Button>
                <Button
                    className = 'pagination__button'
                    color = 'success'
                    disabled = { !nextPage }
                    onClick = { this._onClickNext }
                    size = 'large'
                    variant = 'outlined'>
                    {nextPageId.length && `${nextPageId.map(i => i + 1).join('.')}. `}
                    {nextPage?.title || ''}
                    <NavigateNextIcon />
                </Button>
            </nav>
        );
    }
}

export default connect()(Pagination);
