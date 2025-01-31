import React, { useState } from "react";
import styled from "styled-components";
import useSound from "use-sound";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import {PlayCircle} from "@styled-icons/boxicons-regular/PlayCircle"
import {StopCircle} from "@styled-icons/boxicons-regular/StopCircle"
import {Soundwave} from "@styled-icons/bootstrap/Soundwave"
// import {StarFill} from "@styled-icons/bootstrap/StarFill"


const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  /* height: 12rem; */
  width: 10rem;
  border-radius: 5px;
  background-color: #211F1C;
  margin-bottom: 2rem;
	margin-right: 1rem;
	align-items: center;
  text-align: center;
  justify-content: space-evenly;

  /* border: ${props=> props.isPlaying ? "solid 5px #D5A021" : "none"}; */
  box-shadow: ${props=> props.isPlaying ? "5px 5px #D5A021" : "none"};
  transition: box-shadow ease-in-out .5s;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const WaveContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: .3rem;
`;

const PlayButton = styled(PlayCircle)`
  height: 3rem;
  width: 3rem;
  cursor: pointer;
  color: ${props => props.isPlaying ? "#5397d4" : "#65e688"};
  transition: color .3s ease-in;
`;

// const StarButton = styled(StarFill)`
//   position: absolute;
//   margin-top: -5.5rem;
//   margin-left: 5rem;
//   padding: .2rem;
//   height: 1.5rem;
//   width: 1.5rem;
//   cursor: pointer;
//   color: ${props => props.isFavorite ? "#ffbb00" : "white"};
//   opacity: ${props => props.isFavorite ? "100%" : "20%"};

//   transition: color .3s ease-in;
// `;

const SoundIcon  = styled(Soundwave)`
  height: 2.5rem;
  width: 3.5rem;
  /* color: white; */
  color: ${props => props.isPlaying ? "#5397d4" : "#FFFF"};

  transition: color .3s ease-in;
`;

const StopButton = styled(StopCircle)`
  height: 3rem;
  width: 3rem;
  cursor: pointer;
  color: #e66b65;
`;

const NameContainer = styled.div`
  display: flex;
  height: 5rem;
  align-items: flex-start;
`

const Name = styled.p`
  font-size: 1.3rem;
  font-family: Arial, Helvetica, sans-serif;
  color: #EDE7D9;
`;

const SoundBox = (props) => {
  const soundPath = "/sounds/" + props.soundName;

  const [volume, setVolume] = useState(1);
  
  const [play, {stop, duration}] = useSound(soundPath, { volume: volume });
  const [isPlaying, setPlaying] = useState(false);
  // const [isFavorite, setFavorite] = useState(false);

  // const handleFavorite = (sound) => {
  //   if(isFavorite) {
  //     props.removeFavorite(sound);
  //   }
  //   else {
  //     props.addFavorite(sound);
  //   }
  //   setFavorite(!isFavorite);
  // }
  
  const Play = () => {
    stop();
    play();

    setPlaying(true);

    setTimeout( () => {
      setPlaying(false);
    }, duration)
  
  }

  return ( 
    <>
      <Container isPlaying={isPlaying}>
        {/* <StarButton isFavorite={isFavorite} onClick={ () => handleFavorite(props.soundName) } />   */}
        <NameContainer>
          <Name>{props.soundName.name}</Name>
        </NameContainer>
        <ButtonsContainer>
          <PlayButton onClick ={() => Play()} isPlaying={isPlaying}></PlayButton>
          <StopButton onClick ={() => { stop(); setPlaying(false) }}></StopButton>
        </ButtonsContainer>
        <WaveContainer>
          <SoundIcon isPlaying={isPlaying}/>
        </WaveContainer>
        <Slider
          defaultValue={0.5}
          startPoint={0}
          step={0.05}
          max={1}
          ariaValueTextFormatterForHandle={(value) => setVolume(value)}
        />
      </Container>
    </>
  );
};

export default SoundBox;
