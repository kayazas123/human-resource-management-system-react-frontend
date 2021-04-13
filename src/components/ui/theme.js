import { createMuiTheme } from "@material-ui/core";

const flendersonRed = "#CC313D";
const flendersonPink = "#F7C5CC";

export default createMuiTheme({
    palette:{
        common:{
            red: `${flendersonRed}`,
            pink: `${flendersonPink}`
        },
        primary:{
            main: `${flendersonRed}`
        },
        secondary:{
            main: `${flendersonPink}`
        }
    },
    typography:{
        h4:{
            fontWeight:600
        }
    }
});