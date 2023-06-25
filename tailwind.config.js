/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'brand-beige': '#F1EDDF',
        'danger-red': '#B23A3A'
      },
      boxShadow: {
        bottom: '0 4px 20px rgba(0, 0, 0, 0.1)',
        'inset-top': 'inset 0px 4px 20px rgba(0, 0, 0, 0.1)'
      }
    }
  },

  plugins: []
};
