# Create Express App

🚀 A powerful CLI tool to quickly scaffold Express.js applications with TypeScript/JavaScript and your preferred database setup.

## Features

- **Language Options**

  - JavaScript (ES6+)
  - TypeScript with full type support

- **Database Integration**
  - MongoDB with Mongoose ORM
  - PostgreSQL with Prisma ORM

## Installation

```bash
npm install -g @pratiyank/create-express-app
```

## Quick Start

Directly copy and paste below command please for now

```bash
create-express-app init
```

## Features in Development

We're actively working on adding these features:

- Authentication boilerplate
- Error handling utilities
- Middleware configurations
- Request validation
- Logging system
- Test setup
- Health check endpoints

## JWT Based Authentication

| Language + Database     | Authentication Status | Implementation Details   |
| ----------------------- | --------------------- | ------------------------ |
| TypeScript + MongoDB    | ✅ Implemented        | JWT-based authentication |
| TypeScript + PostgreSQL | ✅ Implemented        | Using Prisma JWT Based   |
| JavaScript + MongoDB    | ✅ Implemented        | JWT-based authentication |
| JavaScript + PostgreSQL | ❌ Planned            | Using Prisma             |

## Configuration

### Environment Variables

Envireonment Variables comes pre defined you just have to insert the value in them.

## Scripts

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start
```

## Contributing

We welcome contributions! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you find this tool helpful, please give it a ⭐️ on GitHub!

## Acknowledgments

- Express.js team
- MongoDB team
- Prisma team
