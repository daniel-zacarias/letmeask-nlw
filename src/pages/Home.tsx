import { useHistory } from 'react-router'


import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import Button from '../components/Button'
import '../styles/auth.scss'

import { useAuth } from '../hooks/useAuth'
import { useTheme } from '../hooks/useTheme'
import { FormEvent, useState } from 'react'
import { database } from '../services/firebase'
import toast,{ Toaster} from 'react-hot-toast'
import { ToggleTheme } from '../components/ToggleTheme'




export function Home(){

    const history = useHistory();
    const {user, signWithGoogle} = useAuth();
    const [roomCode, setRoomCode]= useState('');
    const currentTheme = useTheme();


    async function handleCreateRoom(){
        if(!user){
            await signWithGoogle();
        }
        history.push('/rooms/new');
    }

    async function handleJoinRoom(event:FormEvent) {
        event.preventDefault();

        if(roomCode.trim() === ''){
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if(!roomRef.exists()){
            toast.error('Sala não existe.')
            // alert('Room does not exists.');
            return;
        }

        if(roomRef.val().endedAt){
            toast.error('Sala já encerrada.');
            // alert('Room already closed.');
            return;
        }

        toast.success("Sala encontrada");

        history.push(`rooms/${roomCode}`);
    }

    return (
        <div id="page-auth" className={currentTheme.theme}>
            < ToggleTheme />
            <div><Toaster /></div>
            <aside>
                
                <img src={illustrationImg} alt="ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tira as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="letmeask" />
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo do Google"/>
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">
                        ou entre em uma sala
                    </div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                         type="text" 
                         placeholder="Digite o código da sala"
                         onChange={event => setRoomCode(event.target.value)}
                         value={roomCode}
                         />
                         <Button type='submit'>
                             Entrar na sala
                         </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}