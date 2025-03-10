/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      blacksword: ["blacksword"]
    },
    palette: {
      mode: 'dark'
    },
    extend: {
      colors: {
        main: "#F4B038",
        mainhover: "#1F3154",
        secondary: "#262626",
        textSecondary: '#AAA',
        bgSecondary: "#0A0A0A",
        buttonColor: "#26A5FF",
        greenSecondary: '#94E96B',
        unreadBG: '#101010',
        errorColor: '#f44336',
        warningColor: '#ffa726',
        XPLColor: '#F26BD4',
        AUSDColor: '#EEB662',
        PUSDColor: '#6289EE',
        USDTColor: '#53AE94'
      },
      screens: {
        screen400: "400px",
        screen500: "500px",
        screen600: "600px",
        screen700: "700px",
        screen800: "800px",
        screen900: "900px",
        screen1000: "1000px",
        screen1100: "1100px",
        screen1200: "1200px",
        screen1300: "1300px",
        screen1400: "1400px",
        screen1500: "1500px",
        screen1600: "1600px",
        screen1700: "1700px",
        screen1800: "1800px",
        screen1900: "1900px",
      },
      backgroundImage: {
        dashboardBanner: "url('../images/background/dashboard.svg')",
        mobileBanner: "url('../images/background/mobileDashboard.svg')",
        dropdownBg: 'linear-gradient(266deg, rgba(255, 255, 255, 0.06) -14.81%, rgba(255, 255, 255, 0.15) 110.22%)',
        migrateBG: "url(../images/other/migrateBg.svg)",
        migrateBGBW: "url(../images/other/migrateBgBW.svg)",
        productBg: "url(../images/background/productBg.svg)",
        HomeMigrateBg: 'url(../images/background/migrateBg.svg)',
        HomeNFTBg: 'url(../images/background/NFTbg.svg)',
      },
      backgroundColor: {
        lighter: "#FFFFFF",
        lightGrey: "#F8F7F7",
        bgProgress: "#B8D2F9",
        whiteSmoke: "#F7F7F7",
        greenBack: "#4BAD4F",
        navy: "#1D417C",
      },
      width: {
        mini: "50%",
        tiny: "60%",
        small: "70%",
        smallest: "80%",
        smaller: "85%",
        little: "88%",
        normal: "90%",
        largest: "98%",
        large: "100%",
        larges: "110%",
        larger: "115%",
      },
      gridTemplateColumns: {
        8: "repeat(8, minmax(0, 1fr))",
      },
      animation: {
        marquee: 'marquee 3s linear infinite'
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      },
      fontSize: {
        title: "1.125rem"
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
}

