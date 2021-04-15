import React, { useContext } from 'react';
import styled from 'styled-components';

import { MusicPageData } from '../../../containers/MusicContainer/index';
import PlaylistItem from './PlaylistItem';

const PlaylistDiv = styled.ol`
  margin-top: 2rem;
  list-style: none;

  color: #fff;
`;

const MainPlaylist = () => {
  const { files, activeFileIndex, setActiveFileIndex } = useContext(
    MusicPageData
  );
  return (
    <PlaylistDiv>
      {files.map((file, index) => (
        <PlaylistItem
          key={index}
          file={file}
          index={index + 1}
          active={index === activeFileIndex}
          setActiveFileIndex={setActiveFileIndex}
        />
      ))}
    </PlaylistDiv>
  );
};

export default MainPlaylist;
