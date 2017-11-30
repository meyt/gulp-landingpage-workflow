# Gulp Landing page workflow 

[![built with gulp](https://img.shields.io/badge/gulp-project-eb4a4b.svg?logo=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAAAYAAAAOCAMAAAA7QZ0XAAAABlBMVEUAAAD%2F%2F%2F%2Bl2Z%2FdAAAAAXRSTlMAQObYZgAAABdJREFUeAFjAAFGRjSSEQzwUgwQkjAFAAtaAD0Ls2nMAAAAAElFTkSuQmCC)](http://gulpjs.com/)

a gulp workflow for building landing-page.

## What's inside?

- CSS Preprocessor (sass)
- Advanced template engine (nunjucks)
- Default style and template (bootstrap)
- Task runner (gulp)
- Live reloading
- And some tools for optimizing output

## What's doing?

- Compile Templates to HTML
- Compile SASS to CSS
- Move dependencies and assets to dist
- Optimize CSS and  and finally see the changes live on http://localhost:6868

## How to use?

Installation
```
git clone https://github.com/meyt/gulp-landingpage-workflow
cd gulp-landingpage-workflow
npm install
```

Build:
```
gulp build
```

Build with live reload:

```
gulp
```

`./dist`: The final results in there.