import { createContext , ReactNode, useState, useEffect} from "react";

type Theme = "dark" | "light"
  
type ThemeContextType = {
    theme: Theme,
    toggleTheme: () => void
}

type ThemeProviderType = {
    children: ReactNode;
}

export const ThemeContext = createContext({} as ThemeContextType);


export function ThemeContextProvider(props:ThemeProviderType){
    const [theme, setTheme] = useState<Theme>(() =>{
        const storagedTheme = localStorage.getItem("theme");

        return (storagedTheme ?? 'light') as Theme
    });

    useEffect(() => {
        localStorage.setItem("theme", theme)
    }, [theme])

     function toggleTheme(){
         setTheme(theme === "light"?"dark":"light")
     }

    return(
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          {props.children}
        </ThemeContext.Provider>
    )
}