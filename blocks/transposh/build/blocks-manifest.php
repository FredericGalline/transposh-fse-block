<?php
// This file is generated. Do not modify it manually.
return array(
	'build' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'transposh/fse-language-switcher',
		'title' => 'Transposh Switcher',
		'category' => 'widgets',
		'icon' => 'translation',
		'description' => 'Affiche le widget PHP natif de Transposh avec drapeaux et case Edit Translation.',
		'keywords' => array(
			'transposh',
			'language',
			'switcher',
			'translate'
		),
		'textdomain' => 'transposh',
		'attributes' => array(
			'showFlags' => array(
				'type' => 'boolean',
				'default' => true
			),
			'showNames' => array(
				'type' => 'boolean',
				'default' => true
			),
			'hideCurrentLanguage' => array(
				'type' => 'boolean',
				'default' => false
			),
			'style' => array(
				'type' => 'string',
				'default' => 'horizontal',
				'enum' => array(
					'horizontal',
					'vertical',
					'dropdown'
				)
			),
			'nofollow' => array(
				'type' => 'boolean',
				'default' => true
			),
			'title' => array(
				'type' => 'string',
				'default' => ''
			),
			'showEditTranslation' => array(
				'type' => 'boolean',
				'default' => true
			)
		),
		'supports' => array(
			'html' => false,
			'align' => true,
			'alignWide' => false,
			'className' => true,
			'customClassName' => true
		),
		'render' => 'file:./render.php',
		'editorScript' => 'file:./index.js'
	)
);
