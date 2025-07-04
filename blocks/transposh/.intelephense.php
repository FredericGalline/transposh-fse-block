<?php

/**
 * Stubs pour Intelephense - Fonctions WordPress
 * Ce fichier n'est utilisé que pour l'analyse statique
 */

if (false) {
    /**
     * Registers a block type from the block's metadata
     * @param string $block_type Block type name or path to the block
     * @param array $args Optional array of block type arguments
     * @return WP_Block_Type|false The registered block type on success, or false on failure
     */
    function register_block_type($block_type, $args = []) {}

    /**
     * Adds a callback function to an action hook
     * @param string $hook_name The name of the action to add the callback to
     * @param callable $callback The callback to be run when the action is called
     * @param int $priority Optional. Priority level for the callback. Default 10
     * @param int $accepted_args Optional. Number of arguments the callback accepts. Default 1
     * @return true Always returns true
     */
    function add_action($hook_name, $callback, $priority = 10, $accepted_args = 1) {}

    /**
     * Determines whether a given function, method, or class exists
     * @param string $function_name Function name as string
     * @return bool Whether the function exists
     */
    function function_exists($function_name) {}

    /**
     * Determines whether a class exists
     * @param string $class_name Class name
     * @return bool Whether the class exists
     */
    function class_exists($class_name) {}

    /**
     * Transposh widget function
     * @param array $args Widget arguments
     * @param array $instance Widget instance
     * @return void
     */
    function transposh_widget($args, $instance) {}

    /**
     * Start output buffering
     * @return bool
     */
    function ob_start() {}

    /**
     * Get current buffer contents and delete current output buffer
     * @return string|false
     */
    function ob_get_clean() {}

    /**
     * Call a callback with an array of parameters
     * @param callable $callback
     * @param array $param_arr
     * @return mixed
     */
    function call_user_func_array($callback, $param_arr) {}
}
