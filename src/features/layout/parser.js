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
     * @returns {Array<Object> | Array} - Returns a new array after getting all the elements from the promise.
     */
    static _getItems = async items => {
        const newItems = Array.isArray(items) && items.length > 0 && await Promise.all(items.map(this._getItem));

        return newItems || [];
    };

    /**
     * Recursion parse and fetching content.
     *
     * @param {Object} item - Input element for parsing.
     * @returns {Object} - Returns new item object,
     * with the path in the property(content) replaced to html markup after fetching.
     */
    static _parseContent = async item => {
        const items = item.items || [];
        const fetchedContent = await fetchContent(item.content);

        if (items.length) {

            const newItems = await this._getItems(items);

            return {
                ...item,
                content: fetchedContent,
                items: newItems
            };
        }

        return {
            ...item,
            content: fetchedContent
        };
    };

    /**
     * Get new item by promise.
     *
     * @param {Object} item - Input item.
     * @returns {Object} - Returns a new item after parse.
     */
    static _getItem = async item => {
        const newItem = await this._parseContent(item);

        return newItem;
    };
}

export default Parser;
