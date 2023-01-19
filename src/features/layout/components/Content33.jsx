import { Container } from '@mui/material';
import React, { Component, useEffect, useState } from 'react';

import instructions from '../../../config/instructions.json';

const Content = () => {
    const [ pages, setPages ] = useState([]);

    const _fetchContent = async content => {
        try {
            const response = await fetch(content);

            if (response && response.status === 200) {
                return await response.text();
            }

        } catch (error) {
            console.log('fetch error:', error);
        }
    };

    const _initContent = async data => {


        const parseNestedItems = async item => {
            const items = item?.items || [];

            if (items?.length) {
                const newContent = await _fetchContent(item.content);
                const nestedItems = await items.map(i => await parseNestedItems(i))

                _fetchContent(item.content)
                    .then(result => {
                        setPages(prev => {
                            return {
                                ...prev,
                                pages: [
                                    ...prev.pages,
                                    {
                                        ...item,
                                        content: result,
                                        items: items.map(async (i) => await parseNestedItems(i))
                                    }
                                ]
                            };
                        });
                    });
            }

            _fetchContent(item.content)
                .then(result => {
                    console.log('rr', result);

                    return {
                        ...item,
                        content: result
                    };
                });
        };

        if (data?.length) {
            data.map(item => parseNestedItems(item));
        }
    };

    useEffect(() => {
        // const content = _initContent(instructions);

        // console.log('new content:', content);
    }, []);

    // /**
    //  * Sets keyboard shortcuts for to trigger ToolbarButtons actions.
    //  *
    //  * @inheritdoc
    //  * @returns {void}
    //  */
    // componentDidMount() {
    //     const content = this._initContent(instructions);

    //     console.log('new content:', content);
    // }

    /**
     * Implements React's {@link Component#render}.
     *
     * @inheritdoc
     */
    return (
        <Container>
            Content
        </Container>
    );
};

export default Content;
