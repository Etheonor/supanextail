module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      title: ['Poppins'],
      body: ['Inter'],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('daisyui'), require('@tailwindcss/typography')],
  daisyui: {
    themes: [
      {
        supaTheme: {
          primary: '#00B8F0',
          'primary-focus': '#009de0',
          'primary-content': '#ffffff',

          secondary: '#f03800',
          'secondary-focus': '#e22f00',
          'secondary-content': '#ffffff',

          accent: '#00f0b0',
          'accent-focus': '#00e28a',
          'accent-content': '#ffffff',

          neutral: '#3d4451',
          'neutral-focus': '#2a2e37',
          'neutral-content': '#ffffff',

          'base-100': '#ffffff',
          'base-200': '#767676',
          'base-300': '#d1d5db',
          'base-content': '#1f2937',

          info: '#2094f3' /* Info */,
          success: '#009485' /* Success */,
          warning: '#ff9900' /* Warning */,
          error: '#ff5724' /* Error */,
        },
        dark: {
          primary: '#00B8F0',
          'primary-focus': '#009de0',
          'primary-content': '#ffffff',

          secondary: '#f03800',
          'secondary-focus': '#e22f00',
          'secondary-content': '#ffffff',

          accent: '#00f0b0',
          'accent-focus': '#00e28a',
          'accent-content': '#ffffff',

          neutral: '#3d4451',
          'neutral-focus': '#2a2e37',
          'neutral-content': '#ffffff',

          'base-100': '#2A2E37',
          'base-200': '#EBECF0',
          'base-300': '#16181D',
          'base-content': '#EBECF0',

          info: '#2094f3',
          success: '#009485',
          warning: '#ff9900',
          error: '#ff5724',
        },
      },
    ],
  },
};
