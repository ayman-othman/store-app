
# Store App

A modern e-commerce application built with **Angular** to deliver a seamless and interactive shopping experience.

## Features

### 🗂 Multi-Language Support  

### 📦 State Management with NgRx  

### 🌐 Progressive Web App (PWA)  

### 🎨 Custom Styling with SASS without relying on external libraries like Bootstrap or Tailwind
---

## Tech Stack

- **Frontend Framework**: Angular  
- **State Management**: NgRx  
- **Localization**: NgxTranslate
- **PWA**: Angular Service Worker

---
## Project Architecture
src
├── app
│   ├── core
│   │   ├── components
│   │   │   ├── footer
│   │   │   ├── h-nav-bar
│   │   ├── guards
│   │   │   ├── auth
│   │   │   ├── role
│   │   ├── models
│   │   │   ├── cookie
│   │   │   ├── icons
│   │   │   ├── language
│   │   ├── pages
│   │   │   ├── authentication
│   │   │   ├── not-found
│   │   ├── services
│   │   │   ├── authentication
│   │   │   ├── firebase
│   │   │   ├── language
│   │   │   ├── utils
│   │   ├── cookie-controller.class.ts
│   ├── feature
│   │   ├── products-store
│   │   │   ├── components
│   │   │   │   ├── product-card
│   │   │   │   ├── product-fields
│   │   │   ├── models
│   │   │   │   ├── const
│   │   │   │   ├── interfaces
│   │   │   ├── pages
│   │   │   │   ├── product-details
│   │   │   │   ├── products-dashboard
│   │   │   │   ├── products-list
│   │   │   ├── services
│   │   │   │   ├── products.service.spec.ts
│   │   │   │   ├── products.service.ts
│   │   │   ├── store
│   │   │   │   ├── index.ts
│   │   │   │   ├── product.actions.ts
│   │   │   │   ├── product.effects.ts
│   │   │   │   ├── product.reducer.ts
│   │   │   │   ├── product.selector.ts
│   │   │   │   ├── product.state.ts
│   │   │   ├── products-store.routes.ts
│   ├── shared
│   │   ├── components
│   │   │   ├── chip
│   │   │   ├── language-switcher
│   │   │   ├── pagination
│   │   │   ├── snackbar
│   │   │   ├── svg-icon
│   │   ├── pipes
│   │   │   ├── fade-color
│   │   │   ├── pagination
│   ├── store
│   │   ├── app.store.ts
│   ├── app.component.html
│   ├── app.component.scss
│   ├── app.component.spec.ts
│   ├── app.component.ts
│   ├── app.config.ts
│   ├── app.routes.ts
├── assets
│   ├── i18n
│   │   ├── ar.json
│   │   ├── en.json
│   ├── images
│   ├── json
│   ├── style
├── environments


