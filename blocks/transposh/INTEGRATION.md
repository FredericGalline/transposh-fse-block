# Transposh FSE Block Integration Guide

This document explains how to integrate the Transposh FSE Language Switcher block into the main Transposh plugin.

## Overview

The Transposh FSE Block provides a modern, block-based interface for the language switcher functionality, making it compatible with WordPress's Full Site Editing (FSE) capabilities and the Gutenberg editor.

## Integration Steps

### 1. File Structure Integration

Move the block files into the Transposh plugin directory:

```
transposh/
├── wp/
├── core/
├── blocks/                    # New directory
│   └── language-switcher/     # Block files
│       ├── build/
│       ├── src/
│       ├── languages/
│       ├── render.php
│       ├── block.json
│       └── package.json
├── transposh.php
└── ...existing files
```

### 2. Plugin Registration

Add to the main `transposh.php` file:

```php
/**
 * Register Gutenberg blocks
 */
add_action('init', 'transposh_register_blocks');

function transposh_register_blocks() {
    // Check if Gutenberg is available
    if (function_exists('register_block_type')) {
        $block_path = plugin_dir_path(__FILE__) . 'blocks/language-switcher/build';
        if (file_exists($block_path . '/block.json')) {
            register_block_type($block_path);
        }
    }
}

/**
 * Load block translations
 */
add_action('init', 'transposh_load_block_translations');

function transposh_load_block_translations() {
    $domain = 'transposh';
    $locale = get_locale();
    $mo_file = plugin_dir_path(__FILE__) . "blocks/language-switcher/languages/{$domain}-{$locale}.mo";
    
    if (file_exists($mo_file)) {
        load_textdomain($domain, $mo_file);
    }
}
```

### 3. Assets Integration

Add to the plugin's asset enqueuing:

```php
/**
 * Enqueue block assets
 */
add_action('enqueue_block_assets', 'transposh_enqueue_block_assets');

function transposh_enqueue_block_assets() {
    $asset_file = plugin_dir_path(__FILE__) . 'blocks/language-switcher/build/index.asset.php';
    
    if (file_exists($asset_file)) {
        $asset = include $asset_file;
        
        wp_enqueue_script(
            'transposh-language-switcher-block',
            plugins_url('blocks/language-switcher/build/index.js', __FILE__),
            $asset['dependencies'],
            $asset['version']
        );
        
        wp_enqueue_style(
            'transposh-language-switcher-block',
            plugins_url('blocks/language-switcher/build/index.css', __FILE__),
            array(),
            $asset['version']
        );
    }
}
```

### 4. Build Process Integration

Add to the plugin's build process (if using npm):

```json
{
  "scripts": {
    "build": "wp-scripts build blocks/language-switcher/src/index.js --output-path=blocks/language-switcher/build",
    "start": "wp-scripts start blocks/language-switcher/src/index.js --output-path=blocks/language-switcher/build"
  },
  "devDependencies": {
    "@wordpress/scripts": "^30.0.0"
  }
}
```

### 5. Block Category

Register a custom block category for Transposh blocks:

```php
/**
 * Register custom block category
 */
add_filter('block_categories_all', 'transposh_register_block_category');

function transposh_register_block_category($categories) {
    return array_merge(
        $categories,
        array(
            array(
                'slug'  => 'transposh',
                'title' => __('Transposh', 'transposh'),
                'icon'  => 'translation'
            )
        )
    );
}
```

Then update the block.json:

```json
{
  "category": "transposh",
  ...
}
```

## Benefits of Integration

### For Users
- **Native block experience**: Integrates seamlessly with WordPress editor
- **FSE compatibility**: Works with block themes and site editor
- **Real-time preview**: See changes immediately in the editor
- **Consistent UI**: Matches WordPress admin interface

### For Developers
- **Modern architecture**: Uses latest WordPress block API
- **Maintainable code**: Follows WordPress coding standards
- **Extensible**: Easy to add new features and options
- **TypeScript ready**: Can be enhanced with TypeScript

### For Plugin Ecosystem
- **Block theme support**: Essential for modern WordPress themes
- **Gutenberg first**: Aligns with WordPress direction
- **Developer friendly**: Easy to customize and extend

## Migration Strategy

### Phase 1: Add as Optional Feature
- Include the block alongside existing widgets
- Allow users to choose between widget and block
- Gradual adoption without breaking existing implementations

### Phase 2: Promote Block Usage
- Highlight block benefits in documentation
- Provide migration guides for widget users
- Add block templates for common use cases

### Phase 3: Primary Implementation
- Make block the default option
- Maintain widget for backwards compatibility
- Focus development on block features

## Testing Considerations

### Compatibility Testing
- Test with various block themes
- Verify FSE integration
- Check classic theme compatibility
- Test with page builders

### Performance Testing
- Measure block loading times
- Test with multiple language switchers
- Verify caching compatibility

### Accessibility Testing
- Screen reader compatibility
- Keyboard navigation
- High contrast mode
- Mobile responsiveness

## Documentation Updates

When integrating, update the plugin documentation to include:
- Block usage instructions
- Configuration options
- FSE integration examples
- Migration guides from widgets

## Version Compatibility

The block is designed to work with:
- WordPress 6.6+
- PHP 7.2+
- Modern browsers with ES6 support

## Support Considerations

### User Support
- Provide clear documentation
- Create video tutorials
- Offer migration assistance
- Maintain widget compatibility

### Developer Support
- Document block API
- Provide code examples
- Create developer hooks
- Maintain backwards compatibility

## Conclusion

Integrating this FSE block into Transposh will modernize the plugin and ensure compatibility with the future of WordPress. The block provides all existing functionality while offering a superior user experience for content creators using the block editor.

The integration can be done gradually, ensuring existing users are not disrupted while new users benefit from the modern block interface.
