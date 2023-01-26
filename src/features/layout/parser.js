import { fetchContent } from './functions';

/**
 * Recursion parser for input json file with instructions.
 *
 * @abstract
 */
class Parser {

    /**
     * Get new array of items by promise.
     *
     * @param {Array<Object>} items - Array of objects.
     * @param {Array<number>} index - Array of numbers.
     * @returns {Array<Object> | Array} - Returns a new array after getting all the elements from the promise.
     */
    static _getItems = async (items = [], index = []) => {
        const newItems = items?.length && await Promise.all(
            items.map((innerItem, innerIndex) => this._getItem(
                innerItem, index?.length ? [ ...index, innerIndex ] : [ innerIndex ]
            ))
        );

        return newItems || [];
    };

    /**
     * Recursion parse and fetching content.
     *
     * @param {Object} item - Input element for parsing.
     * @param {Array<number>} index - Index for the parsed item.
     * @returns {Object} - Returns new item object,
     * with the path in the property(content) replaced to html markup after fetching.
     */
    static _parseContent = async (item, index) => {
        const items = item?.items || [];
        const fetchedContent = await fetchContent(item?.content);

        if (items.length) {
            const newItems = await this._getItems(items, index);

            return {
                ...item,
                id: index,
                content: fetchedContent,
                items: newItems
            };
        }

        return {
            ...item,
            id: index,
            content: fetchedContent
        };
    };

    /**
     * Get new item by promise.
     *
     * @param {Object} item - Input item.
     * @param {Array<number>} index - Index of item.
     * @returns {Object} - Returns a new item after parse.
     */
    static _getItem = async (item, index) => {
        const newItem = await this._parseContent(item, index);

        return newItem;
    };

    static _getItemsWithParent = async (items = [], parentItem) => {
        const newItems = items.length && await Promise.all(
            items.map(item => this._getItemWithParent(item, parentItem ?? null))
        );

        return newItems || [];
    };

    static _parseParent = async (item, parentItem) => {
        const items = item?.items || [];

        if (items.length) {
            const newItems = await this._getItemsWithParent(items, item);

            return {
                ...item,
                items: newItems,
                parentItem
            };
        }

        return {
            ...item,
            parentItem
        };
    };

    static _getItemWithParent = async (item, parentItem) => {
        const newItem = await this._parseParent(item, parentItem);

        return newItem;
    };

    static _getPaginationItems = async (items = []) => {
        const parsedItems = items?.length && await Promise.all(
            items.map(item => this._getPaginationItem(item))
        );

        const newItems = parsedItems?.length && parsedItems.reduce((acc, item) => acc.concat(item), []);

        return newItems || [];
    };

    static _parsePagination = async item => {
        const items = item?.items || [];
        const parentItem = item?.parentItem || null;

        if (items.length) {
            const newItems = await this._getPaginationItems(items);

            return [
                {
                    ...item,
                    isPage: true
                }
            ].concat(newItems);
        }

        if (!parentItem) {
            return {
                ...item,
                isPage: true
            };
        }

        return {
            ...item,
            isPage: false
        };
    };

    static _getPaginationItem = async item => {
        const newItem = await this._parsePagination(item);

        return newItem;
    };
}

export default Parser;
