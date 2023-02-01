import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { setSearch } from '../../reducer';

import useDebounce from './../../../../hooks/debouce';

const Search = () => {
    const dispatch = useDispatch();
    const [ searchInput, setSearchInput ] = useState('');
    const debouncedSearch = useDebounce(searchInput);

    const _onEnterSearch = useCallback(e => setSearchInput(e?.target?.value), []);

    const _resetSearch = useCallback(() => setSearchInput(''), []);

    useEffect(() => {
        if (debouncedSearch) {
            dispatch(setSearch(debouncedSearch));
        }
    }, [ debouncedSearch ]);

    return (
        <Box className = 'search' >
            <SearchIcon className = 'search__icon' />
            <input
                className = 'search__input'
                onChange = { _onEnterSearch }
                placeholder = 'Поиск...'
                type = 'text'
                value = { searchInput } />
            {searchInput?.length > 0 && (
                <button
                    className = 'search__close-button'
                    onClick = { _resetSearch }>
                    <CloseIcon />
                </button>
            )}
        </Box>
    );
};

export default Search;
