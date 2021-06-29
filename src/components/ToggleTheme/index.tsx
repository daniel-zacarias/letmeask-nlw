import './style.scss';
import { useTheme } from '../../hooks/useTheme'


export function ToggleTheme(){
    const theme = useTheme()
    function handleChange(){
        theme.toggleTheme();
    }
    return(
        <div className={`toggle ${theme.theme}` }onClick={handleChange}></div>
    )
}