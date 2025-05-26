# Committee Member Information Update

Dear Committee Member,

Please provide the following information to update your profile on the ExaNLA website. You can either:
1. Fill out this template and send it to the committee chair, or
2. Make the changes directly through GitHub (instructions below)

## Information Template

```markdown
Name: [Your full name as it appears on the website]
ID: [Your ID on the website, e.g., 'alex.wilson']

Bio: [Please provide a brief bio, 2-3 sentences maximum]
Example: "Dr. Alex Wilson is a leading expert in numerical linear algebra and high-performance computing. Their research focuses on developing efficient algorithms for large-scale matrix computations."

Photo: [Please provide a professional headshot]
- Format: JPG or PNG
- Size: Maximum 500KB
- Naming: firstname.lastname.jpg (e.g., alex.wilson.jpg)
```

## GitHub Update Instructions

If you prefer to update your information directly:

1. Go to https://github.com/exanla-network/exanla-network.github.io
2. Create a new branch:
   ```bash
   git checkout -b update-member-info
   ```
3. Find your information in `app/committee/page.tsx`
4. Update your bio and add your photo
5. Commit your changes:
   ```bash
   git add app/committee/page.tsx
   git add public/committee/avatar/your-photo.jpg  # if you added a photo
   git commit -m "Update member information: [Your Name]"
   ```
6. Push your branch:
   ```bash
   git push origin update-member-info
   ```
7. Create a Pull Request (PR) on GitHub:
   - Go to the repository
   - Click "Create Pull Request"
   - Select your branch
   - Add a description of your changes
   - Submit the PR

## Photo Guidelines

- Professional headshot
- Neutral background
- Good lighting
- Clear, high-quality image
- Square or 1:1 aspect ratio preferred
- File size: under 500KB
- Format: JPG or PNG

### Where to Place Your Photo

1. Place your photo in the `public/committee/avatar/` directory
2. Name your file exactly as your ID (e.g., if your ID is 'alex.wilson', name the file 'alex.wilson.jpg')
3. The path in the code should be: `/committee/avatar/your-id.jpg`

Example:
- If your ID is 'alex.wilson'
- Save your photo as: `public/committee/avatar/alex.wilson.jpg`
- The image path in the code will be: `/committee/avatar/alex.wilson.jpg`

Note: The `public` directory is at the root of the project. If you're updating through GitHub, make sure to add the photo to the correct location.

## Bio Guidelines

- 2-3 sentences maximum
- Focus on your expertise and current role
- Include key research areas
- Keep it professional and concise
- Avoid technical jargon that might not be widely understood

## Example

```markdown
Name: Dr. Sarah Chen
ID: sarah.chen

Bio: Dr. Sarah Chen is a leading expert in numerical linear algebra and high-performance computing. Her research focuses on developing efficient algorithms for large-scale matrix computations.

Photo: sarah.chen.jpg
```

## Need Help?

If you need assistance with:
- GitHub process: Contact the technical team
- Content questions: Contact the committee chair
- Photo requirements: Contact the website administrator

Thank you for helping keep the ExaNLA website up to date! 