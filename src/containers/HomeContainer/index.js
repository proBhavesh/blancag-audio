import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Nav/NavBar';

import { client as sanity } from '../../sanityClient';

import Hero from '../../components/HomePageComponents/Hero/Hero';
import About from '../../components/HomePageComponents/About/About';
import Skills from '../../components/HomePageComponents/Skills/Skills';

export const HomePageData = React.createContext({
  hero: {
    video: null,
    headLine: null,
    headLineFontSizes: {
      desktop: null,
      mobile: null,
    },
  },
  about: {
    highlight: null,
    content: null,
    pic: null,
    sizes: {
      highlightSizes: {
        desktop: null,
        mobile: null,
      },
      contentSizes: {
        desktop: null,
        mobile: null,
      },
      picSizes: {
        desktop: null,
        mobile: null,
      },
      paraWidth: null,
    },
  },
  skills: {
    toolsPics: [],
    skillsContent: [],
    sizes: {
      imageSizes: {
        desktop: null,
        mobile: null,
      },
      titleSizes: {
        desktop: null,
        mobile: null,
      },
      contentSizes: {
        desktop: null,
        mobile: null,
        width: null,
      },
      gap: null,
    },
  },
});

const HomePage = ({ location }) => {
  // const redirected = location.redirected;

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    Promise.all([
      // -- HERO
      sanity.fetch(`*[_type == 'homePageVid'][0].video.asset->.url`),
      sanity.fetch(`*[_type == 'homePageText'][0].headLine`),
      sanity.fetch(`*[_type == 'homePageSizes'][0]{
        'desktop':headLine_fontSize_desktop,
        'mobile': headLine_fontSize_mobile
      }`),
      // -- ABOUT
      sanity.fetch(`*[_type == 'homePageText'][0].aboutHighlight[0]`),
      sanity.fetch(`*[_type == 'homePageText'][0].aboutContent`),
      sanity.fetch(`*[_type == 'homePagePics'][0].aboutPic`),
      sanity.fetch(`*[_type == 'homePageSizes'][0]{
        'highlightSizes': {
          'desktop': aboutHighlight_fontSize_desktop,
          'mobile': aboutHighlight_fontSize_mobile
        },
        'contentSizes': {
          'desktop': aboutSection_fontSize_desktop,
          'mobile': aboutSection_fontSize_mobile
        },
        'picSizes': {
          'desktop': aboutPic_size_desktop,
          'mobile': aboutPic_size_mobile
        },
        'paraWidth': aboutSection_size_mobile
      }`),
      // -- SKILLS
      sanity.fetch(`*[_type == 'homePagePics'][0].toolsPics`),
      sanity.fetch(`*[_type == 'skillsSection']{
        'image': skillImage,
        'title': title,
        'text': skillText,
        _createdAt
      } | order(_createdAt asc)`),
      sanity.fetch(`*[_type == 'homePageSizes'][0]{
        'imageSizes': {
          'desktop': skillImage_size_desktop,
          'mobile': skillImage_size_mobile,
        },
        'titleSizes': {
          'desktop': skillTitle_fontSize_desktop,
          'mobile': skillTitle_fontSize_mobile,
        },
        'contentSizes': {
          'desktop': skillContent_fontSize_desktop,
          'mobile': skillContent_fontSize_mobile,
          'width': skillSection_size_mobile
        },
        'gap': skillCard_gaps
      }`),
    ]).then((res) => {
      setData({
        hero: {
          video: res[0],
          headLine: res[1],
          headLineFontSizes: res[2],
        },
        about: {
          highlight: res[3],
          content: res[4],
          pic: res[5],
          sizes: res[6],
        },
        skills: {
          toolsPics: res[7],
          skillsContent: res[8],
          sizes: res[9],
        },
      });
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {!isLoading && (
        <>
          <Navbar />
          <HomePageData.Provider value={data}>
            <Hero />
            <About />
            <Skills />
          </HomePageData.Provider>
        </>
      )}
    </>
  );
};

export default HomePage;
