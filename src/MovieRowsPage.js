import SearchRow from "./SearchRow";
import Row from "./Row";
import requests from "./requests";
import React, {useEffect, useState} from 'react';
//import AnotherRow from './row.component';

export default function (props) {

    const[query, setQuery]= useState("");
    const[results,setResults]= useState([]);

    const onChange = e => {
        // console.log(e.target.value);
        e.preventDefault();
        setQuery(e.target.value);
        /*fetch(`https://api.themoviedb.org/3/search/movie?api_key=518f0cf1333524b8ec0f30f5fb0b224a&query=${e.target.value}`
        ).then((res)=> res.json()).then((data)=>{
            if(!data.errors){
               // setResults(data.results);
                console.log(e.target.value);
            }else{
                setResults([]);
            }
            <AnotherRow title="Action" fetchUrl={requests.fetchActionMovies}/>
        });*/
        console.log(query);
    }


    return (
        <div>
            <input type="text"
                   value={query}
                   onChange={onChange}/>


            <SearchRow title="Search" fetchUrl={`/search/movie?api_key=518f0cf1333524b8ec0f30f5fb0b224a&query=${query}`}
                       isLargeRow/>
            <Row title="Trending"
                 fetchUrl={requests.fetchTrending}
            />
            <Row title="Action" fetchUrl={requests.fetchActionMovies}/>
            <Row title="Comedy" fetchUrl={requests.fetchComedyMovies}/>
            <Row title="Horror" fetchUrl={requests.fetchHorrorMovies}/>
        </div>
    );
}