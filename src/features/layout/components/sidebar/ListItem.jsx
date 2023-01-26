import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, List, ListItemButton, ListItemText } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setSidebarActiveItem, setSidebarActiveItemContent } from '../../reducer';

// import SidebarList from './SidebarList';

type Props = {

    /**
     * Defines is item is inset.
     */
    isInset: boolean,

    /**
     * Defines is SidebarItem is active.
     */
    title: boolean,

    /**
     * Defines is SidebarItem is expanded.
     */
    parent: object,

    /**
     * Defines is SidebarItem is expanded.
     */
    item: object,
};

/**
 * Function for ListItem component.
 *
 * @returns {Object}
 */
const ListItem = ({
    isInset = false,
    title,
    item
}: Props) => {
    const dispatch = useDispatch();
    const { sidebarActiveItem } = useSelector(state => state.layout);

    const [ isExpanded, setIsExpanded ] = useState(false);
    const [ isActive, setIsActive ] = useState(false);

    const items = useMemo(() => item?.items || [], [ item?.items ]);
    const id = useMemo(() => item?.id || [], [ item?.id ]);

    /**
     * Item click handler.
     *
     * @returns {void}
     */
    const _onClickItem = useCallback(() => {
        dispatch(setSidebarActiveItem(id));
        dispatch(setSidebarActiveItemContent(isInset ? item?.parentItem : item));
    }, [ id, isInset, item ]);

    /**
     * Expandable item click handler.
     *
     * @returns {void}
     */
    const _onClickExpandedItem = useCallback(() => {
        if (!isActive && isExpanded) {
            setIsExpanded(true);
        } else {
            setIsExpanded(prev => !prev);
        }

        _onClickItem();
    }, [ _onClickItem, isExpanded, isActive ]);

    /**
     * Defines is item is active.
     */
    useEffect(() => setIsActive(JSON.stringify(sidebarActiveItem) === JSON.stringify(id)), [ id, sidebarActiveItem ]);

    if (items?.length) {
        return (
            <div className = 'list-item'>
                <ListItemButton
                    onClick = { _onClickExpandedItem }
                    selected = { isActive }>
                    <ListItemText
                        inset = { isInset }
                        primary = { title } />
                    {isExpanded
                        ? <ExpandLess />
                        : <ExpandMore />
                    }
                </ListItemButton>
                <Collapse
                    in = { isExpanded }
                    timeout = 'auto'
                    unmountOnExit = { true }>
                    <List sx = {{ width: '100%' }}>
                        {items.map(innerItem => {
                            const innerId = innerItem?.id || [];

                            // recursion render of React element
                            return (
                                <ListItem
                                    isInset = { true }
                                    item = { innerItem }
                                    key = { innerId.map(i => i + 1).join('.') }
                                    title = { `${innerId.map(i => i + 1).join('.')}. ${innerItem?.title}` } />
                            );
                        })}
                    </List>
                </Collapse>
            </div>
        );
    }

    return (
        <div className = 'list-item'>
            <ListItemButton
                onClick = { _onClickItem }
                selected = { isActive }>
                <ListItemText
                    inset = { isInset }
                    primary = { title } />
            </ListItemButton>
        </div>

    );
};

export default ListItem;
