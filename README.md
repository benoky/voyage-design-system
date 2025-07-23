# Voyage Design System

> A modern, comprehensive React component library built with TypeScript and Tailwind CSS

[![npm version](https://img.shields.io/npm/v/voyage-design-system.svg)](https://www.npmjs.com/package/voyage-design-system)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8+-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.0+-blue.svg)](https://reactjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🎨 **20+ Modern Components** - Essential UI components for building React applications
- 🔥 **TypeScript First** - Built with TypeScript for excellent developer experience
- 🎯 **Accessible** - ARIA-compliant components following accessibility best practices
- 🎨 **Customizable** - Easy theming with Tailwind CSS and CSS variables
- 📱 **Responsive** - Mobile-first responsive design
- 🚀 **SSR Ready** - Server-side rendering support out of the box
- 📦 **Tree Shakeable** - Import only what you need
- 🔧 **Flexible** - Supports both controlled and uncontrolled components

## 📦 Installation

Install the package and its peer dependencies:

```bash
npm install voyage-design-system react react-dom

# Install Tailwind CSS if you haven't already
npm install -D tailwindcss postcss autoprefixer
```

## 🚀 Quick Start

### 1. Import Styles

Import the CSS in your main entry file (e.g., `src/main.tsx` or `src/index.tsx`):

```typescript
import 'voyage-design-system/styles';
```

### 2. Configure Tailwind CSS

Add the library paths to your `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/voyage-design-system/dist/**/*.{js,mjs}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 3. Start Using Components

```tsx
import { Button, Input, Card } from 'voyage-design-system';

function App() {
  return (
    <Card className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to Voyage Design System</h1>
      <Input 
        label="Email" 
        placeholder="Enter your email" 
        className="mb-4" 
      />
      <Button variant="default" size="lg">
        Get Started
      </Button>
    </Card>
  );
}
```

## 📚 Components

### Core Components

| Component | Description | Key Features |
|-----------|-------------|--------------|
| **Button** | Clickable button element | Multiple variants, sizes, loading states |
| **Input** | Text input field | Labels, validation, icons, different states |
| **Card** | Content container | Flexible layout, hover effects |
| **Modal** | Dialog overlay | Focus management, escape key, backdrop click |
| **Select** | Dropdown selection | Searchable, multi-select, custom options |
| **Tabs** | Tabbed navigation | Controlled/uncontrolled, disabled tabs |
| **DataTable** | Data display table | Sorting, pagination, custom cells |

### Form Components

| Component | Description | Key Features |
|-----------|-------------|--------------|
| **Checkbox** | Checkbox input | Indeterminate state, custom icons |
| **Radio** | Radio button input | Group support, custom styling |
| **Textarea** | Multi-line text input | Auto-resize, character limit |
| **Switch** | Toggle switch | Controlled/uncontrolled, custom labels |

### Display Components

| Component | Description | Key Features |
|-----------|-------------|--------------|
| **Avatar** | User profile image | Fallback text, error handling, shapes |
| **Badge** | Status indicator | Dot mode, count mode, variants |
| **Progress** | Progress indicator | Determinate/indeterminate, custom labels |
| **Skeleton** | Loading placeholder | Custom dimensions, animations |
| **Tooltip** | Hover information | Positioning, delays, custom triggers |

### Layout & Navigation

| Component | Description | Key Features |
|-----------|-------------|--------------|
| **ContextMenu** | Right-click menu | Nested items, dividers, icons |
| **Portal** | DOM portal utility | Render outside component tree |
| **Popup** | Floating content | Positioning, draggable, resizable |

### Advanced Components

| Component | Description | Key Features |
|-----------|-------------|--------------|
| **Editor** | Rich text editor | WYSIWYG, markdown support, toolbar |

## 💡 Usage Examples

### Button Variants

```tsx
import { Button } from 'voyage-design-system';

function ButtonExamples() {
  return (
    <div className="space-x-2">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  );
}
```

### Form with Validation

```tsx
import { Input, Button, Checkbox } from 'voyage-design-system';
import { useState } from 'react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  return (
    <form className="space-y-4">
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
      />
      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        required
      />
      <Checkbox
        checked={remember}
        onChange={setRemember}
        label="Remember me"
      />
      <Button type="submit" className="w-full">
        Sign In
      </Button>
    </form>
  );
}
```

### Data Table

```tsx
import { DataTable } from 'voyage-design-system';

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role' },
];

const data = [
  { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
];

function UserTable() {
  return (
    <DataTable
      columns={columns}
      data={data}
      className="w-full"
    />
  );
}
```

## 🎨 Theming

The library uses Tailwind CSS for styling. You can customize the appearance by:

### 1. CSS Variables

Override the default CSS variables in your global CSS:

```css
:root {
  --primary: 240 10% 3.9%;
  --primary-foreground: 0 0% 98%;
  --secondary: 240 4.8% 95.9%;
  --secondary-foreground: 240 5.9% 10%;
  /* ... more variables */
}
```

### 2. Tailwind Configuration

Extend your Tailwind theme:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'hsl(var(--primary))',
        secondary: 'hsl(var(--secondary))',
      },
    },
  },
};
```
## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Type-safe with [TypeScript](https://www.typescriptlang.org/)
- Component variants powered by [Class Variance Authority](https://cva.style/)
- Icons by [Lucide React](https://lucide.dev/)

---

<div align="center">
  Made with ❤️ for the React community
</div>