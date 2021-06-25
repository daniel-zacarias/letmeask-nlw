import toast ,{Toaster } from 'react-hot-toast';
import copyImg from '../assets/images/copy.svg'

import '../styles/room-code.scss'

type RoomCodeProps = {
    code: string;
}

export function RoomCode(props:RoomCodeProps){



    function copyRoomCodeToClipBoard(){
        toast.success("Copiado com sucesso",{
        iconTheme:{
            primary: '#835afd',
            secondary: '#FFFAEE',
        }})
        navigator.clipboard.writeText(props.code);
        
    }

    return(
        <>
        <div><Toaster/></div>
        <button onClick={copyRoomCodeToClipBoard} className="room-code">
            <div>
            
                <img src={copyImg} alt="Copy room code"/>
            </div> 
            <span>Sala #{props.code}</span>
        </button>
        </>
    )
}