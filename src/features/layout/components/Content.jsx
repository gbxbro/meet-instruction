import { Container } from '@mui/material';
import React, { Component } from 'react';

import instructions from '../../../config/instructions.json';

/**
 * Class for layout's Content component.
 *
 * @abstract
 */
class Content extends Component<Props> {
    /**
     * Initializes a new {@code Sidebar} instance.
     *
     * @param {Props} props - The read-only React {@code Component} props with
     * which the new instance is to be initialized.
     */
    constructor(props: Props) {
        super(props);

        this._fetchContent = this._fetchContent.bind(this);
        this._parseContent = this._parseContent.bind(this);

        this.state = {
            pages: [],
            currentParsedItem: null
        };
    }

    /**
     * Fetch content function.
     *
     * @param {string} content - Ww.
     * @returns {string | never}
     */
    _fetchContent = async content => {
        try {
            const response = await fetch(content);

            if (response && response.status === 200) {
                return response.text();
            }
        } catch (error) {
            console.log('fetch error:', error);
        }
    };

    /**
     * Init content function.
     *
     * @param {Array} items - GG.
     * @param {Object} item - GG.
     * @returns {Object} - Mm.
     */
    _parseContent(items, item) {
        if (items.length) {

            const newItems = items.map(i => this._parseContent(i.items, i));

            return {
                ...item,
                items: newItems
            };
        }

        this._fetchContent(item.items)
            .then(result => {
                this.setState(prev => {
                    return {
                        ...prev,
                        temp: result
                    };
                });
            });

        return {
            ...item,
            content: this.state.temp
        };
    }

    /**
     * Sets keyboard shortcuts for to trigger ToolbarButtons actions.
     *
     * @inheritdoc
     * @returns {void}
     */
    componentDidMount() {
        const res = instructions.map(item => this._parseContent(item.items, item));

        console.log('rezzzz', res);
    }

    /**
     * Implements React's {@link Component#render}.
     *
     * @inheritdoc
     */
    render() {
        return (
            <Container>
                Content
            </Container>
        );
    }
}

export default Content;
