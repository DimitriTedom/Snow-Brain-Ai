# 🤝 Contributing to Snow Brain AI

Thank you for your interest in contributing to Snow Brain AI! We welcome contributions from developers of all skill levels. This guide will help you get started with contributing to our advanced AI assistant project.

## 🌟 Ways to Contribute

- 🐛 **Bug Reports**: Found a bug? Report it with detailed reproduction steps
- ✨ **Feature Requests**: Suggest new features or improvements
- 🔧 **Code Contributions**: Implement new features or fix existing issues
- 📚 **Documentation**: Improve README, code comments, or create tutorials
- 🎨 **Design**: Enhance UI/UX components and user experience
- 🧪 **Testing**: Add tests to improve code quality and reliability

## 🚀 Getting Started

### Prerequisites

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **Git** for version control
- **OpenRouter API Key** (get yours at [openrouter.ai](https://openrouter.ai))
- Basic knowledge of **React**, **TypeScript**, and **Tailwind CSS**

### Development Setup

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub, then clone your fork
   git clone https://github.com/your-username/Snow-Brain-Ai.git
   cd Snow-Brain-Ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example environment file
   cp .env.example .env.local
   
   # Add your OpenRouter API key
   echo "VITE_OPENROUTER_API_KEY=your_api_key_here" > .env.local
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to see the application

## 🛠️ Development Guidelines

### Code Style

- **TypeScript**: Use strict TypeScript with proper type definitions
- **ESLint**: Follow the project's ESLint configuration
- **Prettier**: Code formatting is handled automatically
- **Naming**: Use descriptive names for variables, functions, and components
- **Comments**: Add JSDoc comments for complex functions and components

### Component Structure

```typescript
// Example component structure
interface ComponentProps {
  // Define props with proper types
  title: string;
  isVisible?: boolean;
}

const MyComponent: React.FC<ComponentProps> = ({ title, isVisible = true }) => {
  // Component logic here
  
  return (
    <div className="component-wrapper">
      {/* JSX content */}
    </div>
  );
};

export default MyComponent;
```

### Styling Guidelines

- **Tailwind CSS**: Use utility classes for styling
- **Glassmorphism**: Maintain the futuristic glassmorphism theme
- **Responsive**: Ensure components work on all screen sizes
- **Dark/Light Mode**: All components must support both themes
- **Animations**: Use Framer Motion for smooth animations

### Git Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

2. **Make your changes**
   - Write clean, readable code
   - Add appropriate tests
   - Update documentation if needed

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "✨ Add: Brief description of your changes"
   ```

4. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request**
   - Use the PR template
   - Provide detailed description
   - Include screenshots for UI changes

## 📋 Commit Message Guidelines

Use conventional commit messages with emojis:

- `✨ feat: Add new feature`
- `🐛 fix: Fix bug description`
- `📚 docs: Update documentation`
- `🎨 style: UI/UX improvements`
- `♻️ refactor: Code refactoring`
- `⚡ perf: Performance improvements`
- `🧪 test: Add or update tests`
- `🔧 chore: Maintenance tasks`

## 🎯 Priority Features to Implement

### 🧠 Memory & Context Management
**Priority: High**
- **Persistent Conversation Memory**: Save conversation history across sessions
- **Context Window Management**: Smart trimming of old messages while preserving context
- **Conversation Export/Import**: Allow users to save and load conversations
- **Memory Search**: Search through conversation history

### 🔐 Authentication & User Management
**Priority: High**
- **User Authentication**: Login/signup with email or social providers
- **User Profiles**: Customizable user profiles with avatars
- **Conversation Sync**: Sync conversations across devices
- **Privacy Controls**: Advanced privacy settings for conversations

### 🎨 Advanced UI/UX Features
**Priority: Medium**
- **Voice Input/Output**: Speech-to-text and text-to-speech capabilities
- **Typing Indicators**: Real-time typing indicators during AI generation
- **Message Reactions**: Emoji reactions to messages
- **Custom Themes**: User-customizable themes and color schemes
- **Message Formatting**: Rich text formatting options

### 🤖 AI Enhancement Features
**Priority: Medium**
- **Model Selection**: Allow users to choose between different AI models
- **Temperature Control**: Adjustable creativity/randomness settings
- **System Prompts**: Custom system prompts for different use cases
- **AI Personas**: Pre-defined AI personalities and roles
- **Function Calling**: Integration with external APIs and tools

### 📱 Mobile & Accessibility
**Priority: Medium**
- **Progressive Web App**: Full PWA support with offline capabilities
- **Mobile Optimization**: Enhanced mobile interface and gestures
- **Accessibility**: WCAG compliance and screen reader support
- **Keyboard Shortcuts**: Power user keyboard navigation

### 🔧 Developer & Admin Features
**Priority: Low**
- **Admin Dashboard**: Usage analytics and user management
- **Rate Limiting**: API rate limiting and usage tracking
- **Plugin System**: Extensible plugin architecture
- **API Documentation**: Comprehensive API docs for third-party integration
- **Monitoring**: Performance monitoring and error tracking

## 🧪 Testing Guidelines

### Unit Testing
- Use **Jest** and **React Testing Library**
- Test component behavior, not implementation details
- Aim for >80% code coverage
- Mock external dependencies appropriately

### Integration Testing
- Test complete user workflows
- Verify API integrations work correctly
- Test theme switching functionality
- Validate responsive design

### Testing Commands
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 📝 Pull Request Guidelines

### Before Submitting
- [ ] Code follows the style guidelines
- [ ] Self-review of the code completed
- [ ] Comments added for complex logic
- [ ] Tests added/updated for new functionality
- [ ] Documentation updated if needed
- [ ] Changes tested in both light and dark modes
- [ ] Mobile responsiveness verified

### PR Template
```markdown
## 🎯 Description
Brief description of changes and motivation

## 🔧 Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## 🧪 Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## 📸 Screenshots
Include screenshots for UI changes

## 📋 Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Tests added/updated
- [ ] Documentation updated
```

## 🏷️ Issue Labels

- `🐛 bug`: Something isn't working
- `✨ enhancement`: New feature or request
- `📚 documentation`: Improvements to documentation
- `🎨 design`: UI/UX improvements
- `🚀 priority-high`: High priority items
- `🔧 good-first-issue`: Good for newcomers
- `💡 help-wanted`: Extra attention needed

## 🤔 Need Help?

- **GitHub Issues**: For bug reports and feature requests
- **Discussions**: For questions and general discussion
- **Email**: [your-email@example.com] for private inquiries

## 📄 Code of Conduct

### Our Standards
- **Be Respectful**: Treat everyone with respect and kindness
- **Be Inclusive**: Welcome contributors from all backgrounds
- **Be Constructive**: Provide helpful feedback and suggestions
- **Be Patient**: Help newcomers learn and grow

### Unacceptable Behavior
- Harassment or discrimination of any kind
- Offensive comments or personal attacks
- Publishing private information without permission
- Any conduct that would be inappropriate in a professional setting

## 🙏 Recognition

Contributors will be recognized in:
- **README.md**: Contributors section
- **Release Notes**: Major feature contributors
- **GitHub**: Contributor statistics and graphs

## 🚀 Ready to Contribute?

1. Check the [Issues](https://github.com/DimitriTedom/Snow-Brain-Ai/issues) for open tasks
2. Look for `good-first-issue` labels if you're new
3. Join our [Discussions](https://github.com/DimitriTedom/Snow-Brain-Ai/discussions) to connect with the community
4. Fork the repo and start coding!

---

<div align="center">
  <h3>🌟 Thank you for contributing to Snow Brain AI! 🌟</h3>
  <p>Together, we're building the future of AI conversation.</p>
</div>