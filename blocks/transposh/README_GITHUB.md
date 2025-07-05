# Transposh FSE Language Switcher

[![WordPress](https://img.shields.io/badge/WordPress-6.6%2B-blue.svg)](https://wordpress.org/)
[![PHP](https://img.shields.io/badge/PHP-7.2%2B-purple.svg)](https://php.net/)
[![License](https://img.shields.io/badge/License-GPL--2.0--or--later-green.svg)](LICENSE)

A modern Gutenberg block for the Transposh Translation plugin, providing Full Site Editing (FSE) compatibility and enhanced user experience.

## 🚀 Quick Start

1. Download or clone this repository
2. Install the Transposh plugin (required dependency)
3. Copy the block files to your theme or create a plugin
4. Add to your site and enjoy modern language switching!

## 📋 Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **🎨 3 Display Styles**: Horizontal, Vertical, Dropdown menu
- **🏳️ Flag Support**: Country flags with customizable display
- **🔧 Full Customization**: Language names, titles, and advanced options
- **✏️ Edit Mode**: Integrated translation editing capabilities
- **📱 FSE Compatible**: Works seamlessly with WordPress Site Editor
- **👀 WYSIWYG Preview**: Real-time, non-clickable editor preview
- **🌍 Multilingual**: Interface available in English, French, and Spanish
- **🛡️ Secure**: Built with WordPress security best practices

## 📥 Installation

### Option 1: Theme Integration (Recommended)

1. Download the latest release
2. Extract to `/wp-content/themes/your-theme/blocks/transposh/`
3. Add to your theme's `functions.php`:

```php
// Include Transposh FSE Block
if (file_exists(get_template_directory() . '/blocks/transposh/transposh.php')) {
    require_once get_template_directory() . '/blocks/transposh/transposh.php';
}
```

### Option 2: As a Plugin

1. Download and extract to `/wp-content/plugins/transposh-fse-block/`
2. Activate in WordPress admin

### Option 3: Composer

```bash
composer require your-namespace/transposh-fse-block
```

## 🎯 Usage

### In Gutenberg Editor
1. Search for "Transposh Switcher" in the block library
2. Insert the block into your content
3. Configure settings in the sidebar

### In Site Editor (FSE)
1. Navigate to Appearance → Site Editor
2. Add the block to your templates
3. Customize as needed

## ⚙️ Block Settings

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| Widget Title | Text | Empty | Custom title above language selector |
| Display Style | Select | Horizontal | Layout: Horizontal, Vertical, or Dropdown |
| Show Flags | Toggle | Yes | Display country flags |
| Show Language Names | Toggle | Yes | Display language names |
| Hide Current Language | Toggle | No | Hide active language from list |
| Add rel='nofollow' | Toggle | Yes | SEO: Add nofollow to language links |
| Show 'Edit Translation' | Toggle | Yes | Display edit mode checkbox |

## 🛠️ Development

### Prerequisites
- Node.js 14+
- npm or yarn
- WordPress development environment

### Setup
```bash
git clone https://github.com/your-username/transposh-fse-block.git
cd transposh-fse-block
npm install
```

### Development Commands
```bash
npm run start    # Development mode with hot reloading
npm run build    # Production build
npm run lint     # Code linting
npm run format   # Code formatting
```

### Adding Translations
1. Copy `languages/transposh.pot`
2. Create `transposh-{locale}.po` (e.g., `transposh-de_DE.po`)
3. Translate using Poedit or similar tool
4. Compile to `.mo` file: `msgfmt file.po -o file.mo`

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 🐛 Bug Reports

Please use the [GitHub Issues](https://github.com/your-username/transposh-fse-block/issues) page to report bugs or request features.

## 📚 Documentation

- [Integration Guide](INTEGRATION.md) - How to integrate into Transposh plugin
- [API Reference](docs/API.md) - Block attributes and hooks
- [Customization Guide](docs/CUSTOMIZATION.md) - Styling and extending

## 🔗 Related Projects

- [Transposh Translation Plugin](https://wordpress.org/plugins/transposh-translation-filter-for-wordpress/) - Required dependency
- [WordPress Block Editor](https://wordpress.org/gutenberg/) - Built for Gutenberg

## 📄 License

This project is licensed under the GPL-2.0-or-later License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgments

- Transposh team for the excellent translation plugin
- WordPress community for Gutenberg and FSE
- Contributors and testers

## 🚀 Roadmap

- [ ] Additional display styles
- [ ] Advanced styling options
- [ ] RTL language support
- [ ] Performance optimizations
- [ ] Integration with popular page builders

---

**Made with ❤️ for the WordPress community**

*Star ⭐ this repository if you find it helpful!*
