# Contributing to Transposh FSE Language Switcher

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## 🤝 Ways to Contribute

- **🐛 Bug Reports**: Report issues and bugs
- **💡 Feature Requests**: Suggest new features
- **📝 Documentation**: Improve docs and examples
- **🔧 Code**: Submit bug fixes and features
- **🌍 Translations**: Add new language support

## 🚀 Getting Started

### Prerequisites
- WordPress development environment
- Node.js 14+ and npm
- Git knowledge
- PHP 7.2+ and WordPress 6.6+

### Setup Development Environment
```bash
# Clone the repository
git clone https://github.com/your-username/transposh-fse-block.git
cd transposh-fse-block

# Install dependencies
npm install

# Start development
npm run start
```

## 📋 Development Workflow

### 1. Fork and Clone
```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/your-username/transposh-fse-block.git
cd transposh-fse-block

# Add upstream remote
git remote add upstream https://github.com/original-owner/transposh-fse-block.git
```

### 2. Create Feature Branch
```bash
# Update your fork
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/your-feature-name
```

### 3. Make Changes
- Follow [WordPress Coding Standards](https://developer.wordpress.org/coding-standards/)
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

### 4. Test Your Changes
```bash
# Build and test
npm run build
npm run lint

# Manual testing
# Test with WordPress site
# Verify FSE compatibility
# Check responsive design
```

### 5. Submit Pull Request
```bash
# Push to your fork
git push origin feature/your-feature-name

# Create Pull Request on GitHub
# Provide clear description
# Reference related issues
```

## 🎯 Code Guidelines

### JavaScript/React
- Use modern ES6+ syntax
- Follow WordPress block development patterns
- Use meaningful variable and function names
- Add JSDoc comments for functions

```javascript
/**
 * Renders the language switcher preview
 * @param {Object} attributes Block attributes
 * @param {string} style Display style (horizontal/vertical/dropdown)
 * @return {JSX.Element} Preview component
 */
function renderPreview(attributes, style) {
    // Implementation
}
```

### PHP
- Follow [WordPress PHP Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/php/)
- Sanitize all inputs
- Escape all outputs
- Use meaningful function names

```php
/**
 * Renders the language switcher block
 *
 * @param array $attributes Block attributes
 * @param string $content Block content
 * @return string Rendered HTML
 */
function render_transposh_language_switcher($attributes, $content) {
    // Implementation
}
```

### CSS/SCSS
- Use BEM methodology
- Mobile-first approach
- Maintain accessibility
- Follow WordPress admin styles

## 🧪 Testing

### Manual Testing Checklist
- [ ] Block insertion works in Gutenberg
- [ ] All settings function correctly
- [ ] Preview updates in real-time
- [ ] Works in Site Editor (FSE)
- [ ] Responsive design functions
- [ ] Accessibility standards met
- [ ] Works with Transposh plugin

### Browser Testing
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers

## 🌍 Adding Translations

### New Language Support
1. Copy `languages/transposh.pot` template
2. Create `languages/transposh-{locale}.po`
3. Translate strings using Poedit
4. Compile to `.mo`: `msgfmt file.po -o file.mo`
5. Test with WordPress in target language

### Translation Guidelines
- Keep translations concise
- Maintain context and meaning
- Test with longer translations
- Consider cultural appropriateness

## 📝 Documentation

### Code Documentation
- Add inline comments for complex logic
- Document all public functions
- Include usage examples
- Update README for new features

### User Documentation
- Clear, step-by-step instructions
- Include screenshots when helpful
- Cover common use cases
- Address troubleshooting

## 🐛 Bug Reports

### Before Reporting
- Check existing issues
- Test with latest version
- Verify with default theme
- Disable other plugins

### Issue Template
```markdown
**Bug Description**
Clear description of the bug

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What should happen

**Environment**
- WordPress version:
- PHP version:
- Transposh version:
- Browser:
- Theme:
```

## 💡 Feature Requests

### Before Requesting
- Check existing issues and discussions
- Consider if it fits project scope
- Think about implementation complexity

### Feature Template
```markdown
**Feature Description**
Clear description of the feature

**Use Case**
Why is this feature needed?

**Implementation Ideas**
Any thoughts on how it could work

**Alternatives Considered**
Other ways to solve this problem
```

## 🔍 Code Review Process

### For Contributors
- Respond to feedback promptly
- Make requested changes
- Keep discussions constructive
- Ask questions if unclear

### For Reviewers
- Be constructive and helpful
- Explain reasoning for suggestions
- Test changes when possible
- Approve when ready

## 📋 Release Process

### Versioning
We follow [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes
- **MINOR**: New features, backwards compatible
- **PATCH**: Bug fixes, backwards compatible

### Release Checklist
- [ ] Update version numbers
- [ ] Update CHANGELOG.md
- [ ] Test with multiple WordPress versions
- [ ] Update documentation
- [ ] Create GitHub release
- [ ] Update WordPress.org (if applicable)

## 🎉 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Invited to project discussions
- Credited in plugin headers (major contributions)

## 📞 Getting Help

- **GitHub Discussions**: General questions and ideas
- **GitHub Issues**: Bug reports and feature requests
- **Email**: Direct contact for sensitive issues

## 📄 License

By contributing, you agree that your contributions will be licensed under the GPL-2.0-or-later License.

---

Thank you for contributing to make Transposh better for everyone! 🎉
