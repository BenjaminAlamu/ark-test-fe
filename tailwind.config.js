module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.125rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        md: ['1rem', { lineHeight: '1.5rem' }],
        xl: ['1.125rem', { lineHeight: '1.75rem' }],
        '2xl': ['2rem', { lineHeight: '2.813rem' }],
        '4xl': ['3.5rem', { lineHeight: '2.5rem' }]
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px'
      },
      colors: ({ colors }) => ({
        yellow: {
          100: '#FDF8E7',
          500: '#FAEFC7',
          900: '#F2D365'
        },
        purple: {
          100: '#FBF3F9',
          500: '#AF3591'
        },
        brown: '#3A2618',
        grey: '#5F685F'
      }),
      fontFamily: {
        sans: ['Lato'],
        serif: ['Lato'],
        mono: ['Lato'],
        major: ['Rozha One']
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
