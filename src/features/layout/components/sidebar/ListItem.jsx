import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, List, ListItemButton, ListItemText } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, scrollSpy } from 'react-scroll';

import { compareIds } from '../../functions';
import { setSidebarActiveItemId } from '../../reducer';

type Props = {

    /**
     * Defines is item is nested.
     */
    isNested: boolean,

    /**
     * Defines is SidebarItem is active.
     */
    title: boolean,

    /**
     * Defines is SidebarItem is expanded.
     */
    item: Object,
};

/**
 * Function for ListItem component.
 *
 * @returns {Object}
 */
const ListItem = ({
    isNested = false,
    title,
    item
}: Props) => {
    const dispatch = useDispatch();
    const { sidebarActiveItemId } = useSelector(state => state.layout);

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
        scrollSpy.update();

        dispatch(setSidebarActiveItemId(id));
    }, [ id ]);

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
    useEffect(() => {
        setIsActive(compareIds(id, sidebarActiveItemId));


    }, [ id, sidebarActiveItemId ]);

    if (items?.length) {
        return (
            <div className = 'list-item'>
                <Link
                    activeClass = 'active'
                    containerId = 'app__content'
                    duration = { 250 }
                    hashSpy = { true }
                    isDynamic = { true }
                    smooth = { true }
                    spy = { true }
                    to = { id.length && id.join('.') }>
                    <ListItemButton
                        onClick = { _onClickExpandedItem }>
                        <ListItemText
                            inset = { isNested }
                            primary = { title } />
                        {isExpanded
                            ? <ExpandLess />
                            : <ExpandMore />
                        }
                    </ListItemButton>
                </Link>
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
                                    isNested = { true }
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
            <Link
                activeClass = 'active'
                containerId = 'app__content'
                duration = { 250 }
                hashSpy = { true }
                isDynamic = { true }
                smooth = { true }
                spy = { true }
                to = { id.length && id.join('.') }>
                <ListItemButton
                    onClick = { _onClickItem }>
                    <ListItemText
                        inset = { isNested }
                        primary = { title } />
                </ListItemButton>
            </Link>
        </div>

    );
};

export default ListItem;
