 /** @type {import('tailwindcss').Config} */
    export default {
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}", // <-- Cette ligne est très importante
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    }