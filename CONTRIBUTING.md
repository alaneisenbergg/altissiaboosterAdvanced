# Contributing to Altissia Booster Advanced

Thanks for your interest in the advanced version! 🚀

## ⚠️ Important Note

This project is **archived** and **no longer actively maintained**. However, contributions are still welcome in the form of:

- Bug reports (for documentation)
- Forks and improvements
- Discussion and ideas
- Pull requests (may or may not be merged)

## 🍴 How to Contribute

### Reporting Issues

If you find a bug or have a suggestion:

1. **Check existing issues** first to avoid duplicates
2. **Open a new issue** with a clear title and description
3. **Include**:
   - Your environment (OS, Node version, MongoDB version)
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Which version (basic or advanced)

### Making Changes

Since this is archived, the best approach is to **fork the repository**:

1. **Fork** the repo to your account
2. **Clone** your fork locally
3. **Create a branch** (`git checkout -b feature/your-feature`)
4. **Make your changes**
5. **Test thoroughly**
6. **Commit** with clear messages
7. **Push** to your fork
8. **Create a Pull Request**

### Code Style

If you do make changes, please maintain consistency:

- **JavaScript**: Follow existing code style (ES6+, async/await)
- **React**: Functional components with hooks
- **Comments**: Add comments for complex logic
- **Error Handling**: Always include try-catch where needed
- **Security**: Never commit credentials or sensitive data

## 🎯 Areas for Improvement

If you're looking to enhance this project, here are some ideas:

### Backend
- [ ] Add proper JWT authentication
- [ ] Implement password hashing with bcrypt
- [ ] Add rate limiting
- [ ] Better error handling and logging
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Unit tests for automation logic
- [ ] Refactor long functions
- [ ] Add TypeScript types

### Frontend
- [ ] TypeScript migration
- [ ] Better state management (Redux/Zustand)
- [ ] Form validation with Formik/React Hook Form
- [ ] Error boundaries
- [ ] Accessibility improvements (ARIA labels)
- [ ] Dark mode
- [ ] Unit tests (Jest/React Testing Library)
- [ ] E2E tests (Playwright/Cypress)
- [ ] Progressive Web App (PWA) features

### Automation
- [ ] More robust CSS selectors
- [ ] Better exercise type detection
- [ ] Retry logic improvements
- [ ] Screenshot on errors
- [ ] Video recording of automation
- [ ] Multiple browser support
- [ ] Parallel task execution

### DevOps
- [ ] Docker containerization
- [ ] Docker Compose for easy setup
- [ ] CI/CD pipeline
- [ ] Automated testing
- [ ] Production deployment guides
- [ ] Monitoring and logging

### Documentation
- [ ] API documentation
- [ ] Architecture diagrams (real ones, not ASCII)
- [ ] Video tutorials
- [ ] Troubleshooting guide expansion
- [ ] Code comments improvement

## 🧪 Testing

Before submitting changes, please:

1. **Test locally** on your environment
2. **Check both server and client** work together
3. **Test with MongoDB** connection
4. **Verify automation** still functions
5. **Check browser compatibility**
6. **Test with both headless and headed modes**
7. **Verify language switching** works
8. **Test specific task selection**

## 📝 Commit Messages

Use clear, descriptive commit messages:

```
✅ Good:
- "Fix MongoDB connection error on startup"
- "Add validation for email input field"
- "Update README installation instructions"
- "Improve exercise type detection logic"
- "Add support for new activity types"

❌ Bad:
- "fix stuff"
- "update"
- "changes"
- "asdf"
```

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style (formatting, missing semi-colons, etc)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Example:**
```
feat(dashboard): add progress bars for each level

- Added visual progress bars using TailwindCSS
- Shows percentage completion for A1-C1
- Updates in real-time via Socket.IO

Closes #123
```

## 🔐 Security

If you find a security vulnerability:

1. **Do NOT open a public issue**
2. **Contact maintainer directly** (if possible)
3. **Wait for acknowledgment** before public disclosure
4. **Provide details**: steps to reproduce, impact, suggested fix

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Thank You

Even though this project is archived, your interest and potential contributions are appreciated!

Remember: The goal was to save time on tedious requirements. If your changes align with that spirit, go for it! 🚀

---

## 🎓 Learning Resources

If you're new to the technologies used:

- **Node.js**: https://nodejs.org/docs
- **React**: https://react.dev
- **Puppeteer**: https://pptr.dev
- **Socket.IO**: https://socket.io/docs
- **MongoDB**: https://docs.mongodb.com
- **Vite**: https://vitejs.dev
- **TailwindCSS**: https://tailwindcss.com/docs
- **Flowbite**: https://flowbite.com

---

## 💡 Tips for Contributors

### Understanding the Codebase

1. **Start with the basic version** - It's simpler and easier to understand
2. **Read the automation logic** in `server/index.js`
3. **Understand Socket.IO events** - They're the backbone of communication
4. **Study the activity data** in `client/src/main.jsx`
5. **Test with headless: false** - Watch what the automation does

### Common Pitfalls

- **CSS Selectors**: Altissia may change their UI, breaking selectors
- **Timing Issues**: Add appropriate waits for elements
- **Memory Leaks**: Always close browser sessions
- **Socket Connections**: Handle disconnections properly
- **MongoDB Connections**: Use proper error handling

### Best Practices

- **Test incrementally** - Don't make too many changes at once
- **Use version control** - Commit often
- **Document your changes** - Update README if needed
- **Keep it simple** - Don't over-engineer
- **Think about users** - Make it easy to use

---

**Questions?** Open a discussion in the repo!

**Just want to chat?** Fork it and do your thing! 😎

---

<div align="center">

**Happy Coding!** 💻

Made with ☕ and 😤

</div>
