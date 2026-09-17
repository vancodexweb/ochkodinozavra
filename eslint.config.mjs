// Flat ESLint config (ESLint 9+). FSD layer boundaries are enforced here,
// not just documented - a violation is a lint error, not a code review nit.
//
// eslint-config-next ships a native flat config as of Next 15+ (its default
// export already bundles next/core-web-vitals + typescript-eslint), so this
// imports that directly instead of bridging the old shareable config through
// FlatCompat - that bridge invokes @eslint/eslintrc's legacy config
// validator, which cannot serialize the plugins' self-referencing flat
// config objects and crashes with "Converting circular structure to JSON".
import nextConfig from 'eslint-config-next';
import boundaries from 'eslint-plugin-boundaries';

// Layers, top to bottom. A layer may import only from layers strictly below
// it (plus its own slice's public API) - never sideways, never upward.
const LAYERS = ['app', 'views', 'widgets', 'features', 'entities', 'shared'];

const elementTypes = LAYERS.map((layer) => ({
  type: layer,
  pattern: `src/${layer}/*`,
  capture: ['slice'],
}));

const allowedImports = {
  app: ['views', 'widgets', 'features', 'entities', 'shared'],
  views: ['widgets', 'features', 'entities', 'shared'],
  widgets: ['features', 'entities', 'shared'],
  features: ['entities', 'shared'],
  entities: ['shared'],
  shared: ['shared'],
};

// One policy per (from, to) pair, each requiring the import to go through the
// target slice's index.ts - reaching into e.g. entities/document/model/foo.ts
// from outside that slice is a lint error, not just a convention. Same-slice
// (internal) imports are never checked by this rule (checkInternals stays
// false, the default), so files within one slice import each other freely.
const dependencyPolicies = Object.entries(allowedImports).flatMap(([from, allowedTypes]) =>
  allowedTypes.map((to) => ({
    from: { element: { type: from } },
    allow: { to: { element: { type: to, internalPath: 'index.ts' } } },
  })),
);

const config = [
  ...nextConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      boundaries,
    },
    settings: {
      'boundaries/elements': elementTypes,
      'boundaries/ignore': ['**/*.test.ts', '**/*.test.tsx'],
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          policies: dependencyPolicies,
          message:
            'FSD layers only import strictly downward (app > views > widgets > features > entities > shared), and only through the target slice\'s index.ts.',
        },
      ],
    },
  },
  {
    ignores: ['.next/**', 'node_modules/**'],
  },
];

export default config;
