'use strict';

/**
 * Ref: https://jsdoc.app/about-configuring-jsdoc.html
 * To run JSDoc with a config file, add '-c'
 * Ex: jsdoc -c /path/to/conf.json or jsdoc -c /path/to/conf.js
 * To enable recursion (set by recurseDepth), use the -r cmd line flag
 * 'source' specificies the type of file/directory to include, and where they are
 * inlude is an array of file paths. Use -r to recurse into subdirectories
 * includePattern determines which file types to parse. For example, ".+\\.js(doc|x)?$" includes .js, .jsx. and .jsdoc files
 * excludePattern determines which file types to ignore. Ex: "(^|\\/|\\\\)_" ignores files and directories with names starting with '_'
 * Setting sourceType: module enables JSDoc support for ES52015 modules
 * 'tags' refers to e.g. @param, @constructor. 'dictionaries' determines the types of tags to be parsed. 'closure' refers to closure compiler tags
 * Inline {@link} tags are rendered in plain text when templates.cleverLinks && templates.monospaceLinks === false
 */

module.exports = {
    plugins: ['plugins/markdown'],
    "recurseDepth": 10,
    "source": {
        "include": ['dist/js'],
        "includePattern": ".+\\.js(doc|x)?$",
        "excludePattern": "(^|\\/|\\\\)_"
    },
    "sourceType": "module",
    "tags": {
        "allowUnknownTags": true,
        "dictionaries": ["jsdoc","closure"]
    },
    "templates": {
        "cleverLinks": false,
        "monospaceLinks": false
    }
};