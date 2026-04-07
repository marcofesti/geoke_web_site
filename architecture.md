# Architecture
> Read this when: creating components · setting up routing · structuring folders · Angular-specific decisions

---

## Folder structure

```
src/
├── app/
│   ├── core/                    # singleton services, guards, interceptors
│   │   ├── services/
│   │   └── guards/
│   ├── shared/                  # reusable components, directives, pipes
│   │   ├── components/
│   │   │   └── reveal/          # RevealDirective (scroll reveal)
│   │   ├── directives/
│   │   └── pipes/
│   ├── layout/
│   │   ├── nav/                 # <app-nav>
│   │   └── footer/              # <app-footer>
│   └── pages/
│       ├── home/                # homepage — 12 sections as sub-components
│       ├── product/
│       │   ├── features/
│       │   ├── idpbs/
│       │   ├── reporting/
│       │   └── connectors/
│       ├── pricing/
│       ├── enterprise/
│       ├── agencies/
│       │   ├── opportunity/
│       │   ├── advanced-reporting/
│       │   └── client-center/
│       ├── compare/
│       │   ├── geoke-vs-profound/
│       │   ├── geoke-vs-peec-ai/
│       │   └── geoke-vs-seo-tools/
│       ├── company/
│       │   ├── about/
│       │   ├── vision/
│       │   ├── careers/
│       │   ├── trust/
│       │   └── status/
│       ├── contacts/
│       └── legal/
│           ├── privacy-policy/
│           ├── fair-use/
│           ├── terms-of-service/
│           ├── enterprise-agreement/
│           └── cookie-preferences/
├── assets/
│   ├── logo/
│   │   └── Logo-geoke.svg       # master logo — never modify
│   └── fonts/
└── styles/
    ├── tokens.css               # CSS custom properties (source of truth)
    ├── reset.css
    ├── typography.css
    └── global.css
```

---

## Component naming

| Component | Selector | File |
|-----------|----------|------|
| Nav | `<app-nav>` | `layout/nav/nav.component.ts` |
| Footer | `<app-footer>` | `layout/footer/footer.component.ts` |
| Hero | `<app-hero>` | `pages/home/hero/hero.component.ts` |
| Engine Bar | `<app-engine-bar>` | `pages/home/engine-bar/engine-bar.component.ts` |
| Problem | `<app-problem>` | `pages/home/problem/problem.component.ts` |
| Claims Grid | `<app-claims-grid>` | `pages/home/claims-grid/claims-grid.component.ts` |
| How It Works | `<app-how-it-works>` | `pages/home/how-it-works/how-it-works.component.ts` |
| Stats Bar | `<app-stats-bar>` | `pages/home/stats-bar/stats-bar.component.ts` |
| Quadrant | `<app-quadrant>` | `pages/home/quadrant/quadrant.component.ts` |
| Use Cases | `<app-use-cases>` | `pages/home/use-cases/use-cases.component.ts` |
| Pricing | `<app-pricing>` | `pages/home/pricing/pricing.component.ts` |
| CTA Final | `<app-cta-final>` | `pages/home/cta-final/cta-final.component.ts` |

Class names follow `Ge` prefix: `GeNavComponent`, `GeHeroComponent`, etc.

---

## Angular rules

- **Change detection**: `OnPush` everywhere
- **State**: Angular signals for reactive state (Angular 17+)
- **Styles**: `styleUrls` per component — never `styles` inline array
- **One component per file** — no exceptions
- **Lazy loading**: all page modules are lazy-loaded via `loadComponent`
- **SEO**: every page sets `<title>` and `<meta name="description">` via `Title` + `Meta` services from `@angular/platform-browser`
- **i18n**: all display strings through Angular i18n — no hardcoded text in templates
- **Accessibility**: all `<img>` have `alt`, all interactive elements keyboard-navigable

---

## Routing

```typescript
// app.routes.ts
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.GeHomeComponent)
  },
  {
    path: 'product',
    children: [
      { path: 'features',    loadComponent: () => import('./pages/product/features/features.component').then(m => m.GeFeaturesComponent) },
      { path: 'idpbs',       loadComponent: () => import('./pages/product/idpbs/idpbs.component').then(m => m.GeIdpbsComponent) },
      { path: 'reporting',   loadComponent: () => import('./pages/product/reporting/reporting.component').then(m => m.GeReportingComponent) },
      { path: 'connectors',  loadComponent: () => import('./pages/product/connectors/connectors.component').then(m => m.GeConnectorsComponent) },
    ]
  },
  { path: 'pricing',    loadComponent: () => import('./pages/pricing/pricing.component').then(m => m.GePricingPageComponent) },
  { path: 'enterprise', loadComponent: () => import('./pages/enterprise/enterprise.component').then(m => m.GeEnterpriseComponent) },
  {
    path: 'agencies',
    children: [
      { path: 'opportunity',        loadComponent: () => import('./pages/agencies/opportunity/opportunity.component').then(m => m.GeOpportunityComponent) },
      { path: 'advanced-reporting', loadComponent: () => import('./pages/agencies/advanced-reporting/advanced-reporting.component').then(m => m.GeAdvancedReportingComponent) },
      { path: 'client-center',      loadComponent: () => import('./pages/agencies/client-center/client-center.component').then(m => m.GeClientCenterComponent) },
    ]
  },
  {
    path: 'compare',
    children: [
      { path: 'geoke-vs-profound',  loadComponent: () => import('./pages/compare/geoke-vs-profound/geoke-vs-profound.component').then(m => m.GeVsProfoundComponent) },
      { path: 'geoke-vs-peec-ai',   loadComponent: () => import('./pages/compare/geoke-vs-peec-ai/geoke-vs-peec-ai.component').then(m => m.GeVsPeecAiComponent) },
      { path: 'geoke-vs-seo-tools', loadComponent: () => import('./pages/compare/geoke-vs-seo-tools/geoke-vs-seo-tools.component').then(m => m.GeVsSeoToolsComponent) },
    ]
  },
  {
    path: 'company',
    children: [
      { path: 'about',    loadComponent: () => import('./pages/company/about/about.component').then(m => m.GeAboutComponent) },
      { path: 'vision',   loadComponent: () => import('./pages/company/vision/vision.component').then(m => m.GeVisionComponent) },
      { path: 'careers',  loadComponent: () => import('./pages/company/careers/careers.component').then(m => m.GeCareersComponent) },
      { path: 'trust',    loadComponent: () => import('./pages/company/trust/trust.component').then(m => m.GeTrustComponent) },
      { path: 'status',   loadComponent: () => import('./pages/company/status/status.component').then(m => m.GeStatusComponent) },
    ]
  },
  { path: 'contacts', loadComponent: () => import('./pages/contacts/contacts.component').then(m => m.GeContactsComponent) },
  {
    path: 'legal',
    children: [
      { path: 'privacy-policy',       loadComponent: () => import('./pages/legal/privacy-policy/privacy-policy.component').then(m => m.GePrivacyPolicyComponent) },
      { path: 'fair-use',             loadComponent: () => import('./pages/legal/fair-use/fair-use.component').then(m => m.GeFairUseComponent) },
      { path: 'terms-of-service',     loadComponent: () => import('./pages/legal/terms-of-service/terms-of-service.component').then(m => m.GeTermsComponent) },
      { path: 'enterprise-agreement', loadComponent: () => import('./pages/legal/enterprise-agreement/enterprise-agreement.component').then(m => m.GeEnterpriseAgreementComponent) },
      { path: 'cookie-preferences',   loadComponent: () => import('./pages/legal/cookie-preferences/cookie-preferences.component').then(m => m.GeCookiePreferencesComponent) },
    ]
  },
  { path: '**', redirectTo: '' }
];
```
