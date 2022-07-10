import React from "react";
const ThemeContext = React.createContext( { theme: {} } );

export function useTheme ()
{
    return React.useContext( ThemeContext )
}

/** @type {React.FC<{theme:object,children:React.ReactNode}>} */
export const ThemeProvider = ( props ) =>
{
    return (
        <ThemeContext.Provider
            value={ props.theme }
        >
            { props.children }
        </ThemeContext.Provider>
    );
};
