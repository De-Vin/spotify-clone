import React, { useEffect, useRef, useState } from 'react'
import styled from "styled-components"
import Sidebar from './Sidebar';
import Navigationbar from './Navigationbar';
import Body from './Body';
import Footer from './Footer';
import axios from 'axios';
import { useStateProvider } from '../utils/StateProvider';
import { reducerCases } from '../utils/Constants';

function Spotify() {
    const [{token},dispatch] = useStateProvider();

    const bodyRef = useRef();
    const [navBackground, setnavBackground] = useState(false);
    const [headerBackground, setheaderBackground] = useState(false);
    const bodyScrolled = ()=>{
        bodyRef.current.scrollTop >=30 ? setnavBackground(true): setnavBackground(false);
        bodyRef.current.scrollTop >=268 ? setheaderBackground(true): setheaderBackground(false);
    };

    useEffect(()=>{
        const getUserInfo = async ()=> {
            const {data} = await axios.get("https://api.spotify.com/v1/me",
            {
                headers : {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            });
            const userInfo = {
                userId: data.id,
                userName: data.display_name,
            };
            dispatch({type: reducerCases.SET_USER, userInfo});
        }; 
        getUserInfo();
    }, [dispatch, token]);
  return (
    <Container>
       <div className="spotify_body">
        <Sidebar></Sidebar>
        <div className='body' ref={bodyRef} onScroll={bodyScrolled}>
            <Navigationbar navBackground={navBackground}></Navigationbar>
            <div className='body_contents'>
                <Body headerBackground={headerBackground}></Body>
            </div>
        </div>
       </div>
       <div className='spotify_footer'>
        <Footer></Footer>
       </div>
    </Container>
  )
}

export default Spotify


const Container = styled.div`
    max-width: 100vw;
    max-height:100vh;
    overflow: hidden;
    display: grid;
    grid-template-rows: 85vh 15vh;
    .spotify_body {
        display: grid;
        grid-template-columns: 15vw 85vw;
        height: 100%;
        width: 100%;
        background: linear-gradient(transparent,rgba(0,0,0,1));
        background-color: rgb(60,87,100);
        .body {
            height:100%;
            width:100%;
            overflow: auto;
            &:: -webkit-scrollbar {
                width: 0.7rem;
                &-thumb{
                    background-color: rgba(255,255,255,0.6)
                }
        }
    }

`;

