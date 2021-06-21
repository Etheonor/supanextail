module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      title: ["Poppins"],
      body: ["Open Sans"],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
