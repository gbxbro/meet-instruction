import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, List, ListItemButton, ListItemText } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { setItemId } from '../../reducer';

// import SidebarList from './SidebarList';

type Props = {

    /**
     * Defines is SidebarItem is active.
     */
    title: boolean,

    /**
     * Defines is SidebarItem is active.
     */
    id: string,

    /**
     * Defines is SidebarItem is expanded.
     */
    content: Array<Object> | never,
};

/**
 * Function for ListItem component.
 *
 * @returns {Object}
 */
const ListItem = ({ id, title, content = [] }: Props) => {
    const dispatch = useDispatch();
    const [ isExpanded, setIsExpanded ] = useState(false);

    /**
     * Item click handler.
     *
     * @returns {void}
     */
    const _onClickItem = useCallback(() => {
        dispatch(setItemId(id));
    }, [ id ]);

    /**
     * Expandable item click handler.
     *
     * @returns {void}
     */
    const _onClickExpandedItem = useCallback(() => {
        setIsExpanded(prev => !prev);
        _onClickItem();
    }, [ _onClickItem ]);

    if (content?.length) {
        return (
            <>
                <ListItemButton onClick = { _onClickExpandedItem }>
                    <ListItemText primary = { title } />
                    {isExpanded ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse
                    in = { isExpanded }
                    timeout = 'auto'
                    unmountOnExit = { true }>
                    <List sx = {{ pl: 2 }}>
                        {content.map((item, index) => {
                            const newId = `${id}.${index + 1}.`;

                            // recursion render of React element
                            return (
                                <ListItem
                                    content = { item?.items }
                                    id = { newId }
                                    key = { newId }
                                    title = { `${newId} ${item?.title}` } />
                            );
                        })}
                    </List>
                </Collapse>
            </>

        );

    }

    return (
        <ListItemButton onClick = { _onClickItem }>
            <ListItemText primary = { title } />
        </ListItemButton>
    );
};

export default ListItem;
