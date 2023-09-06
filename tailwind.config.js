const colors = require("tailwindcss/colors");

module.exports = {
    content: ["./public/*.html"],
    theme: {
        extend: {
            fontFamily: {
                body: "Mukta",
            },
            colors: {
              primaryLight: "##3e8ff8",
              primary: "#0E73F6",
              primaryDark: "#0b5cc5"

                // gray: colors.trueGray,
                // coolGray: colors.coolGray,
            },
            maxWidth: {
                "70p": "70%",
                "90p": "90%",
            },
            margin: {
                '-0.02': '-0.02rem',
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
};