<?php

/**
 * Plugin Name:       Transposh FSE Block
 * Description:       Bloc Gutenberg dynamique pour widget PHP natif de Transposh (FSE compatible)
 * Version:           1.0.0
 * Requires at least: 6.6
 * Requires PHP:      7.2
 * Author:            Frédéric Galliné
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       transposh
 *
 * @package CreateBlock
 */

if (! defined('ABSPATH')) {
	exit;
}

add_action('init', function () {
	register_block_type(__DIR__ . '/build');
});
