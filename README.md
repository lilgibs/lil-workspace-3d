# Lil Workspace

Interactive Workspace Builder

Created by Khalil Gibran Hadi

Current milestone: the responsive splash at `/`, with a static SVG workspace
poster and a **Start Building** link to a temporary `/builder` page. The
interactive 3D builder, saved configurations, and rental summary are future
milestones in Phase 1. This milestone does not create rental requests.

## Getting Started

First, run the development server:

```powershell
npm.cmd install
npm.cmd run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The route delegates to `src/_pages/splash`. Reusable poster, brand, and creator
credit components live in `src/shared/ui`; branding is in `src/shared/config`.

Geist is self-hosted through `next/font/local`, so the build does not need Google
Fonts. Georgia is used for display headings. No new dependencies were added.

## Validation

```powershell
npm.cmd run lint
npm.cmd exec tsc -- --noEmit
npm.cmd run build
```

On shells without PowerShell's script restrictions, `npm` can replace `npm.cmd`.

## Credits

- Project creator: Khalil Gibran Hadi.
- Workspace illustration and desk brand icon: SVG geometry created for this project.
- Footer badge: a vector adaptation of the creator's supplied Lil Gib logo.
- Geist Sans: The Geist Project Authors, SIL OFL 1.1. See `public/fonts/OFL.txt`
  and `public/fonts/README.md` for the font's provenance.
- Framework and styling: Next.js, React, and Tailwind CSS; their own licenses apply.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
