import { AppShell, Container, Flex, Header, Input, useMantineTheme, Text, Space, Grid, Card, Button } from '@mantine/core';
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { RiMenu2Line } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import './App.css';
import { useState, useEffect } from 'react';
import CardDetail from './cardDetail';
import CardMovie from './Card';
const api_key = "3d29277cead85831acf050c11756e8a2";
const IMG = "https://image.tmdb.org//t/p/w220_and_h330_face";


function App() {
  // const theme = useMantineTheme();
  const [menu, setMenu] = useState(false);
  const [screen, setScreen] = useState(window.innerWidth)
  const theme = useMantineTheme();
  const [data, setData] = useState([]);
  const[keyword,setKeyword]=useState("");

  const url = keyword?"https://api.themoviedb.org/3/search/movie":"https://api.themoviedb.org/3/discover/movie"
  const Fetch = async (keyword:any) => {
    const data = await fetch(`${url}?api_key=${api_key}&&query=${keyword}`);
    const movies = await data.json();
    console.log(movies);
    setData(movies.results)
  }

  const clickMenu = () => {
    setMenu(!menu)
  }
  useEffect(() => {
    const Changewidth = () => {
      setScreen(window.innerWidth)
    }
    window.addEventListener('resize', Changewidth)
  })


  useEffect(() => {
    Fetch(keyword);
  }, []);


  return (
    <><AppShell className='overlay'>
      <Header height={50} p="10px" className='Header1'>
        <RiMenu2Line className='menu-icon' onClick={clickMenu} />
        <Link to="/"><img src='https://movies-app-mantine.vercel.app/_next/static/media/logo.7e0c2b80.svg' width={80} className="logoBlock" /></Link>


        {
          (menu || screen > 600) && (
            <Container size={1200} className="menu">
              <Flex justify="space-between" align="center" className='nav'>
                <Flex align="center" className='logo'>
                  <AiOutlineClose onClick={clickMenu} className="close-icon" />
                  <img src='https://movies-app-mantine.vercel.app/_next/static/media/logo.7e0c2b80.svg' width={80} />
                  <Space w="sm" />
                  <Input
                    variant="filled"
                    placeholder="serach..."
                    radius="lg"
                    size="xs"
                    className='search-input'
                    onChange={e=>setKeyword(e.target.value)}
                    value={keyword}
                  />
                  <Space w="sm" />
                  <Text size={10}
                    style={{
                      border: '1px solid black',
                      padding: '2px 10px',
                      borderRadius: '20px',
                      cursor: 'pointer'
                    }} className="search" onClick={()=>Fetch(keyword)}>Search</Text>
                </Flex>
              <Flex className='tv-ex'>
              <Link to="/" style={{textDecoration:'none',color:'black'}}><Text className='explore'>
                    Explore
                  </Text></Link>
                  <Space w="sm" />
                  <Link to="/" style={{textDecoration:'none',color:'black'}}> <Text id='tvshow'>
                    Tvshow
                  </Text></Link>
                </Flex>
              </Flex>
            </Container>
          )
        }

      </Header>
     
        <Routes>
          <Route path='/' element={<CardMovie data={data} />} />
          <Route path='cardDetail/:id' element={<CardDetail />} />
        </Routes>
      
    </AppShell>
    </>


  );
}

export default App;
