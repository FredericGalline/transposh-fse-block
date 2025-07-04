<?php

/**
 * Plugin Name:       Transposh FSE Block
 * Description:       Bloc Gutenberg dynamique pour widget PHP natif de Transposh
 * Requires at least: 6.6
 * Requires PHP:      7.2
 * Version:           1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       transposh
 *
 * @package CreateBlock
 */

if (! defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the Transposh FSE Language Switcher block
 * 
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function transposh_fse_register_block()
{
	register_block_type(__DIR__ . '/src');
}
add_action('init', 'transposh_fse_register_block');
