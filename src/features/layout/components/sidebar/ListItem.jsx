import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, List, ListItemButton, ListItemText } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setSidebarActiveItem, setSidebarActiveItemContent } from '../../reducer';

// import SidebarList from './SidebarList';

type Props = {

    /**
     * Content of item.
     */
    content: string,

    /**
     * Defines is item is inset.
     */
    isInset: boolean,

    /**
     * Defines is SidebarItem is active.
     */
    title: boolean,

    /**
     * Defines is SidebarItem is active.
     */
    ids: Array,

    /**
     * Defines is SidebarItem is expanded.
     */
    items: Array<Object> | never,
};

/**
 * Function for ListItem component.
 *
 * @returns {Object}
 */
const ListItem = ({ content, isInset = false, ids = [], title, items = [] }: Props) => {
    const dispatch = useDispatch();
    const { sidebarActiveItem } = useSelector(state => state.layout);
    const [ isExpanded, setIsExpanded ] = useState(false);
    const [ isActive, setIsActive ] = useState(false);

    /**
     * Item click handler.
     *
     * @returns {void}
     */
    const _onClickItem = useCallback(() => {
        dispatch(setSidebarActiveItem(ids));
        dispatch(setSidebarActiveItemContent(content));
    }, [ ids, content ]);

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
    useEffect(() => setIsActive(JSON.stringify(sidebarActiveItem) === JSON.stringify(ids)), [ ids, sidebarActiveItem ]);

    if (items?.length) {
        return (
            <div className = 'list-item'>
                <ListItemButton
                    onClick = { _onClickExpandedItem }
                    selected = { isActive }>
                    <ListItemText primary = { title } />
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
                        {items.map((item, index) => {
                            const newIds = [ ...ids, index ];

                            // recursion render of React element
                            return (
                                <ListItem
                                    content = { item.content }
                                    ids = { newIds }
                                    isInset = { true }
                                    items = { item?.items }
                                    key = { newIds[newIds.length - 1] }
                                    title = { `${newIds.map(i => i + 1).join('.')} ${item?.title}` } />
                            );
                        })}
                    </List>
                </Collapse>
            </div>
        );
    }

    return (
        <ListItemButton
            onClick = { _onClickItem }
            selected = { isActive }>
            <ListItemText
                inset = { isInset }
                primary = { title } />
        </ListItemButton>
    );
};

export default ListItem;
