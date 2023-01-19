import { Container } from '@mui/material';
import React, { Component } from 'react';

import instructions from '../../../config/instructions.json';

// eslint-disable-next-line valid-jsdoc
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
        this._getItem = this._getItem.bind(this);
        this._getItems = this._getItems.bind(this);

        this.state = {
            pages: []
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
     * @param {Object} item - GG.
     * @returns {Object} - Mm.
     */
    _parseContent = async item => {
        const items = item.items || [];

        if (items.length) {

            const newItems = await this._getItems(items);

            return {
                ...item,
                items: newItems
            };
        }

        const fetchedContent = await this._fetchContent(item.content);

        return {
            ...item,
            content: fetchedContent
        };
    };

    _getItem = async item => {
        const newItem = await this._parseContent(item);

        return newItem;
    };

    _getItems = async items => {
        const newItems = await Promise.all(items.map(this._getItem));

        return newItems;
    };

    /**
     * Sets keyboard shortcuts for to trigger ToolbarButtons actions.
     *
     * @inheritdoc
     * @returns {void}
     */
    componentDidMount() {
        this._getItems(instructions)
            .then(res => console.log('xx', res));

        // this._getItems(instructions)
        // .then(result => console.log('RESULT', result));
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
