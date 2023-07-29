import React from 'react'
import styled from "styled-components";
import Currenttrack from './Currenttrack';
import PlayerControls from './PlayerControls';
import Volume from './Volume';

function Footer() {
  return (
    <Container>
      <Currenttrack></Currenttrack>
      <PlayerControls></PlayerControls>
      <Volume></Volume>
    </Container>
  )
}

export default Footer

const Container = styled.div`
    background-color: #181818;
    height:99%;
    width:100%;
    border-top: 1px solid #282828;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    align-items: center;
    justify-content: center;
    padding: 0 1rem;
`