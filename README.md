# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


## Some Additional Notes
- Install Axios for Backend processing
- Install withRouter for redirects
- Used AXIOS after being reluctant, because I wanted to try fetch()
- Changed it to `require()` for the PHP files when connecting to database
- Please set localhost database accordingly
- A typo error was fixed, which was the reason why `FormInterface.jsx` had two console errors when loaded. As of now, it's only 1. But eh!