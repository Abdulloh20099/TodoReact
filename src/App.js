import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import UpworkJobLoader from "./Loading/Loading";
import { Container,Pagination,TextField,Stack,Link } from "@mui/material";
const BACE_URL = "https://hn.algolia.com/api/v1/search?";



function App() {
 
const [posts, setPost] = useState([]);
const [query, setQuery] = useState("");
const [page, setPage] = useState(1);
const [Loading,setLoading] = useState(true)
const [pageQty, setPageQty] = useState(0);

useEffect(() => {
  setLoading(true);
    axios
      .get(BACE_URL + `query=${query}&page=${page - 1}`)
      .then(({ data }) => {
        console.log(data)
        setPost(data.hits)
        setPageQty(data.nbPages);
        if(data.nbPages<page){
          setPage(1)
        }
        setLoading(false)
      })
  },
  [query, page]);
  return <Container className="App">
    <TextField
    fullWidth
    label="query"
    value={query}
    onChange={(event)=>setQuery(event.target.value)
    }
    />
    <Stack spacing={2}>
      {!!pageQty&&(
        <Pagination
        count={4}
        variant="outlined"
        page={pageQty}
        onChange={(_,num  )=>setPage(num)}
        sx={{marginY:3,marginX:'auto'}}
        />
      )
      }
     
      {
          Loading ? (
            <UpworkJobLoader />
          ):(
        posts.map(post=>(
        
          <Link key={post.objectID} href={post.url} style={{color:"black"}}>
            {
              post.title || post.story_title
            }
          </Link>
        ))
        )
      }
    </Stack>

   
  </Container>;
}

export default App;
