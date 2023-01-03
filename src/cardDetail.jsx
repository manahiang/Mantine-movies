import { AppShell, Button, Container, Flex, Grid, Space, Text, SimpleGrid,AspectRatio} from '@mantine/core'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
const api_key = "3d29277cead85831acf050c11756e8a2&&append_to_response=credits,images,videos"
const IMG = "https://image.tmdb.org//t/p/w220_and_h330_face";

function CardDetail1() {
  const { id } = useParams();
  const [card, setCard] = useState([])
  const url = 'https://api.themoviedb.org/3/movie'
  const[display,setDisplay]=useState(false)
  const[trailer,setTrailer]=useState("")
  const Fetch = async () => {
    const data = await fetch(`${url}/${id}?api_key=${api_key}`);
    const movies = await data.json();
    console.log(movies);
    setCard(movies)
  }
  useEffect(() => {
    Fetch();
  }, []);

  const Play=()=>{
    const playkey=card.videos.results.find((videos)=>videos.name==="Official Trailer")
    setTrailer(playkey.key)
    setDisplay(!display)
  }

  return (
    <AppShell>
      <Container size={1200} mih={300}>
        <Flex justify="space-between">
          <div style={{ marginTop: '10px' }} className="card-detail">
            <img src={IMG + card.poster_path} width={400} style={{ borderRadius: '20px' }} />
          </div>
          <Space w={10} />
          <div style={{ width: '50%' }}>
            <Space h={15} />
            <Text size={40} className="title">{card.title}</Text>
            <Space h="xs" />
            <Text className='overview'>{card.overview}</Text>
            <Space h={10} />
            <Button style={{ borderRadius: '30px' }} onClick={Play}>{display?"Close Trailer":"Play Trailer"}</Button>
            <Space h={10}/>
            {display &&(
            
            <AspectRatio ratio={16 / 9} >
            <iframe
              src={`https://www.youtube.com/embed/${trailer}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen 
              className="playMovies"
            />
          </AspectRatio>
         )
            }
            <Space h="xl" />
            <Text>Cast</Text>
            <Space h="xl" />
            <Grid justify="space-between" grow="" style={{ padding: '7px' }} Space="md">
              {
                card.credits?.cast.map((casts) => (
                  <div>
                    <img src={IMG + casts.profile_path} width={140} />
                    <Text>{casts.character}</Text>
                    <Text>{casts.name}</Text>
                  </div>
                ))
              }

            </Grid>
          </div>
        </Flex>
        <Space h={15} />
        <hr style={{ color: 'red' }} />
        <Text>Banner</Text>
        <Space h={15} />
        <Grid justify="space-between">
          {
            card.images?.backdrops.map((baner) => (
              <img src={IMG + baner.file_path} width={290} style={{ padding: '5px 5px', borderRadius: '20px' }} />
            ))
          }

        </Grid>

      </Container>

    </AppShell>
  )
}

export default CardDetail1