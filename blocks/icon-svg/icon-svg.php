<?php

/**
 * Plugin Name:       Icon Svg
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.6
 * Requires PHP:      7.2
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       icon-svg
 *
 * @package CreateBlock
 */

if (! defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}
function create_block_icon_svg_block_init()
{
	register_block_type(__DIR__ . '/build');
}
add_action('init', 'create_block_icon_svg_block_init');
