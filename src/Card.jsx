import { AppShell, Container, Flex, Header, Input, useMantineTheme, Text, Space, Grid, Card, Button,Image } from '@mantine/core';
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { useState, useEffect } from 'react';
const api_key = "3d29277cead85831acf050c11756e8a2";
const IMG = "https://image.tmdb.org//t/p/w220_and_h330_face";

function CardMovie({data}) {
 
  return (
    <>
      <AppShell>


        {/* Card */}

        <Container size={1200}>
          <Space h={20} />
          <Grid justify="space-between">
            {
              data.map((movies) => (
                <Card style={{ position: 'relative', padding: '7px', }}>
                  <Text style={{ position: 'absolute', left: '10%', color: 'white', top: '3%' }} size="xs">action</Text>
                  <Text style={{ position: 'absolute', left: '10%', top: '10%', color: 'white', width: '80%', fontWeight: '800' }} size="xl">{movies.original_title}</Text>
                  <Image src={IMG + movies.poster_path} width={290} style={{ borderRadius: '10px' }} alt="picuture" />
                  <Button style={{ position: 'absolute', left: '8%', bottom: '5%' }} size="md" bg="white">
                    <Link to={"cardDetail/" + movies.id} style={{ textDecoration: 'none' }}><Text size={15} color="black">Read more</Text></Link>
                  </Button>
                </Card>
              ))
            }
          </Grid>
        </Container>
      </AppShell>
    </>

  );
}

export default CardMovie;
