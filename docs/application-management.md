# Application Management Guide

This guide provides instructions for adding and managing applications in the ExaNLA website.

## Table of Contents
- [Adding a New Application](#adding-a-new-application)
- [Application Categories](#application-categories)
- [Application Assets](#application-assets)
- [Application Data Structure](#application-data-structure)

## Adding a New Application

### 1. Prepare Application Assets

#### Logo
1. Create a logo image for the application
2. Save the logo in the `/public/applications/logo/` directory
3. Recommended logo specifications:
   - Format: PNG or JPG
   - Size: At least 200x200 pixels
   - File naming: Use lowercase with hyphens (e.g., `application-name-logo.png`)

### 2. Add Application Data

1. Open `app/applications/applications-data.ts`
2. Add a new entry to the `applications` array following this structure:

```typescript
{
  id: 'unique-id', // lowercase, hyphenated name
  title: 'Application Name',
  description: 'Brief one-line description of the application',
  content: `Detailed description of the application.
  
  Key numerical linear algebra components:
  - Component 1
  - Component 2
  - Component 3
  
  Additional information about the application's use of numerical linear algebra
  and its integration with modern computing architectures.`,
  logo: '/applications/logo/your-logo.png',
  website: 'https://application-website.com',
  repository: 'https://github.com/org/application', // Optional
  categories: [
    applicationCategories.CATEGORY_1,
    applicationCategories.CATEGORY_2,
    // Add more categories
  ],
}
```

### 3. Required Fields

- `id`: Unique identifier (lowercase, hyphenated)
- `title`: Full application name
- `description`: One-line description
- `content`: Detailed description with focus on numerical linear algebra aspects
- `logo`: Path to logo file
- `website`: Official website URL
- `repository`: GitHub repository URL (optional)
- `categories`: Array of applicable categories

## Application Categories

### Adding New Categories

1. Open `app/applications/applications-data.ts`
2. Add new category to `applicationCategories` object:

```typescript
export const applicationCategories = {
  // ... existing categories ...
  NEW_CATEGORY: "New Category Name",
} as const;
```

### Available Categories

- Computational Chemistry
- Materials Science
- Physics Simulation
- High-Performance Computing

## Application Assets

### Logo Directory
- Location: `/public/applications/logo/`
- Naming convention: `application-name-logo.png`
- Supported formats: PNG, JPG
- Recommended size: 200x200 pixels minimum

### Website Links
- Must be a valid URL
- Should point to the official application website
- Include `https://` prefix

### GitHub Repository
- Must be a valid GitHub repository URL
- Format: `https://github.com/username/repository`
- Optional: Can be omitted if no GitHub repository exists

## Best Practices

1. **Descriptions**
   - Keep the one-line description concise and informative
   - Focus on the application's main purpose
   - Use clear, technical language

2. **Content**
   - Structure content with clear sections
   - Focus on numerical linear algebra aspects
   - Include key components and features
   - Mention integration with modern computing architectures
   - Use bullet points for better readability

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

## Content Guidelines

### Description Format
The content should be structured to highlight:
1. General application overview
2. Key numerical linear algebra components
3. Integration with modern computing architectures
4. Performance considerations

Example structure:
```typescript
content: `[Application Name] is a [type of application] for [main purpose].

Key numerical linear algebra components:
- Component 1: [description]
- Component 2: [description]
- Component 3: [description]

[Additional information about performance, architecture, etc.]`
```

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
2. Review existing application entries
3. Contact the ExaNLA team 