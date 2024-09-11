# Volcano K.I.T.T.

For our Svelte projects, we've developed Volcano K.I.T.T. This serves as a base template for all future projects. It makes use of the Atom Design. Develop and design tools like chromatic and zeplin are preinstalled. Also chromatic is included, for visual testing. **This README needs to be replaced when forked**

## Table of contents

1. [Atom Design](#atom-design)
2. [Structure](#structure)
3. [Setup](#setup)

# Atom Design

In our svelte projects we're applying the Atom Design. This consists of 5 stages: atoms, molecules, organisms, templates and pages. Which are described briefly below.

## Stages

**Atoms**: The atoms serve as the foundational building blocks that comprise all our user interfaces. These atoms include basic HTML elements like forms, labels, inputs, buttons and others that can't be broken down any further without ceasing to be functional.

**Molecules**: Molecules are relatively simple groups of UI elements functioning together as a unit. For example, a form, label, search input, and button can join together to create a search form molecule.

**Organisms**: Organisms are relatively complex UI components composed of groups of molecules and/or atoms and/or other organisms. These organisms form distinct sections of an interface.

**Templates**: Templates are page-level objects that place components into a layout and articulate the design’s underlying content structure. To build on our previous example, we can take the header organism and apply it to a homepage template.

**Pages**: Pages are specific instances of templates that show what a UI looks like with real representative content in place.

# Structure

```
src
├── 1_atoms
├── 2_molecules
├── 3_organisms
├── 4_templates
├── 5_pages
├── App.svelte
├── global.d.ts
└── main.ts
```

## Component

When creating a component, a folder is created for that specific component. In this folder you'll need to create the following files. See `src/1_atoms/component` as example.

```
component
├── Component.scss
├── Component.spec.js
├── Component.stories.svelte
└── Component.svelte
```

## Styling

Global styling is located in `scss` folder which can be found in the `/src` folder. This folder consists of global variables and fonts. Styling for a specific component happens on component-level.

# Setup

## Environment variables

The base project requires some environment variables, create a local `.env` in the root folder of the project. And place the following contents into the `.env` file.

```
CHROMATIC_PROJECT_TOKEN=<chromatic-project-token>
```

## Redirects

In Sveltekit you can make use of the `RedirectionService`. This service will enable you to look for redirects if a payload fetch doesn't return any documents for a given route. You can easily implement the `RedirectionService` as following:

```javascript
if (!response?.docs?.[0]) {
    await redirectionService.findRedirect(url.pathname);
    throw error(404);
}
```

If the `RedirectionService` finds a redirect, it will then redirect to that page. If not, it will exit out of the function and give you the ability to handle this event on your own. This service also detects circulair references. If a circulair reference is detected it will also exit out of the function.

## Sitemap setup

Redirects work based on collections. The default collections are 'pages', 'posts' and 'events.
If a sitemap needs to be added or removed, you can do this in the `src/routes/(seo)/[...sitemap]sitemap.xml` file.
Reminder to add the sitemap to google search console.

#### Sitemap URL structure

-   index = '{domain}/sitemap.xml'
-   pages = '{domain}/[collection]-sitemap.xml'

## Usage of internal images

(usage of img function / img component)??

#### Static images

If an image is imported from within the project always import it with vite-image tools.
This insures that the image is optimized and that the correct path is used.
Never import an image within the static folder.
If an image is used once include the image within the component folder.
If an image is used multiple times include the image within global assets folder.
WEBP is the best format to use for images.
Use if possible srcset to serve the correct image size for the correct screen size.

examples:

-   import Image from './example.jpg?w=400&h=300&format=webp&imagetools'
-   import ImageSrcSet from '@assets/example.png?w=1200;900;600&format=webp&as=srcset&imagetools'

Implementations:

```html
<img src="{Image}" alt="example" />
<img srcset="{ImageSrcSet}" alt="example" />
<div style="background-image: url({Image})"></div>
```

Sidenote: the imagetools property will insure that typescript will accept the import.

#### Lazy loading images

If an image is for sure under the fold, use the lazy load attribute.
Example:

```html
<img src="{Image}" alt="example" loading="lazy" />
```

#### ENV variables

All secrets are stored in the .env file. This file is not pushed to source control.
We dont want to leak any secrets if the repository is public.
ENV variables that are used for setup are stored in the .env.[environment] file.
These files are pushed to source control for better control over the environments.

Set NODE_ENV to staging or production to use the correct .env.[enviroment] file.
Default env file is .env.local.

Use the .env.template file to know what to add to digitalocean or to your local .env file.

Payload will automatically supply any present env variables that are prefixed with PAYLOAD*PUBLIC* directly to the Admin panel.
https://payloadcms.com/docs/admin/webpack#admin-environment-vars

#### Merge lava-core into a project

Add a lava-core as an new remote origin to your project.

```bash
git remote add template https://github.com/studiobasalt/lava-core
```

List all remotes (as a check)

```bash
git remote -v
```

Fetch the remote origin

```bash
git fetch --all
```

Create new feature branch

```bash
git checkout -b feature/merge-lava-core
```

Merge the remote origin into your project

```bash
git checkout template/main <path/to/file/or/folder>

Important to build the whole project after merging!!!!!
