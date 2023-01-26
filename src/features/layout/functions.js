import config from '../../config/pathNames';

import Parser from './parser';

/**
 * Fetch content function.
 *
 * @param {string} path - Path of file.
 * @param {string} format - Format in which to receive data.
 * @returns {string | never} - Fetched file's data.
 */
const fetchContent = async (path, format) => {
    try {
        const response = await fetch(path);

        if (response && response.status === 200) {
            switch (format) {
            case 'json':
                return response.json();
            default:
                return response.text();
            }
        }
    } catch (error) {
        console.log('fetch error:', error);
    }
};

/**
 * Fetch instruction along the path specified in the config.
 *
 * @returns {Array<Object>}
 */
const fetchInstruction = async () => {
    const instruction = await fetchContent(config?.layout?.instructionPath, 'json');

    return instruction;
};

/**
 * Parse instruction, replacing paths in elements to HTML markup.
 *
 * @param {Array<Object>} items - Items from JSON file.
 * @returns {Array<Object>}
 */
const parseInstruction = async items => {
    const itemsWithContent = await Parser._getItems(items);
    const itemsWithParent = await Parser._getItemsWithParent(itemsWithContent);
    const paginationItems = await Parser._getPaginationItems(itemsWithParent);

    return {
        items: itemsWithParent,
        pagination: paginationItems
    };
};

export { fetchContent, fetchInstruction, parseInstruction };
