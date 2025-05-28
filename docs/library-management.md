# Library Management Guide

This guide provides instructions for adding and managing libraries in the ExaNLA website.

## Table of Contents
- [Adding a New Library](#adding-a-new-library)
- [Library Categories](#library-categories)
- [Library Assets](#library-assets)
- [Library Data Structure](#library-data-structure)

## Adding a New Library

### 1. Prepare Library Assets

#### Logo
1. Create a logo image for the library
2. Save the logo in the `/public/libraries/logo/` directory
3. Recommended logo specifications:
   - Format: PNG or JPG
   - Size: At least 200x200 pixels
   - File naming: Use lowercase with hyphens (e.g., `library-name-logo.png`)

### 2. Add Library Data

1. Open `app/libraries/libraries-data.ts`
2. Add a new entry to the `libraries` array following this structure:

```typescript
{
  id: 'unique-id', // lowercase, hyphenated name
  name: 'Library Name',
  description: 'Brief description of the library',
  features: [
    'Feature 1',
    'Feature 2',
    // Add more features
  ],
  language: 'Primary programming language',
  license: 'License type',
  website: 'https://library-website.com',
  repository: 'https://github.com/org/library',
  logo: '/libraries/logo/your-logo.png',
  categories: [
    libraryCategories.CATEGORY_1,
    libraryCategories.CATEGORY_2,
    // Add more categories
  ],
}
```

### 3. Required Fields

- `id`: Unique identifier (lowercase, hyphenated)
- `name`: Full library name
- `description`: One-line description
- `features`: Array of key features
- `language`: Primary programming language
- `license`: License type
- `website`: Official website URL
- `repository`: GitHub repository URL
- `logo`: Path to logo file
- `categories`: Array of applicable categories

## Library Categories

### Adding New Categories

1. Open `app/libraries/libraries-data.ts`
2. Add new category to `libraryCategories` object:

```typescript
export const libraryCategories = {
  // ... existing categories ...
  NEW_CATEGORY: "New Category Name",
} as const;
```

### Available Categories

- Dense Linear Algebra
- Sparse Linear Algebra
- Eigenvalue Problems
- High-Performance Computing
- Hermitian/Symmetric
- Quasi-Hermitian/Symmetric
- GPU Acceleration
- Distributed Memory
- Subspace Iteration

## Library Assets

### Logo Directory
- Location: `/public/libraries/logo/`
- Naming convention: `library-name-logo.png`
- Supported formats: PNG, JPG
- Recommended size: 200x200 pixels minimum

### Website Links
- Must be a valid URL
- Should point to the official library website
- Include `https://` prefix

### GitHub Repository
- Must be a valid GitHub repository URL
- Format: `https://github.com/username/repository`
- Optional: Can be omitted if no GitHub repository exists

## Best Practices

1. **Descriptions**
   - Keep descriptions concise but informative
   - Focus on key capabilities and unique features
   - Use clear, technical language

2. **Features**
   - List 5-10 most important features
   - Start with core capabilities
   - Include performance and architecture features
   - Mention key technologies and standards

3. **Categories**
   - Select all relevant categories
   - Don't over-categorize
   - Use existing categories when possible
   - Request new categories if needed

4. **Assets**
   - Use high-quality logos
   - Ensure consistent image sizes
   - Optimize images for web
   - Follow naming conventions

## Troubleshooting

### Common Issues

1. **Logo Not Displaying**
   - Check file path in `logo` field
   - Verify image exists in correct directory
   - Ensure correct file permissions

2. **Categories Not Showing**
   - Verify category names match exactly
   - Check for typos in category references
   - Ensure categories are properly exported

3. **Links Not Working**
   - Verify URLs are complete (include https://)
   - Check for typos in URLs
   - Test links before committing

### Getting Help

If you encounter issues or need assistance:
1. Check this documentation
2. Review existing library entries
3. Contact the ExaNLA team 