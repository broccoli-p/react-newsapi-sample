import React, {useState, useEffect} from "react";
import styled from 'styled-components';
import NewsItem from 'components/NewsItem'
import axios from "axios";
import usePromise from "../lib/usePromise";


const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const NewsList = ({category}) => {
  const [loading, response, error] = usePromise(() => {
      const k = process.env.REACT_APP_APIKEY;
      const query = category === 'all' ? '' : `&category=${category}`;
      axios.get(`https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=${k}`)
  }, [category]);
  
  if (loading) {
    return <NewsListBlock>Waiting...</NewsListBlock>;
  }
  
  if (!response) {
    return null;
  }
  
  if (error) {
    return <NewsListBlock>Occur Error...</NewsListBlock>;
  }
  
  const {articles} = response.data;
  return (
    <NewsListBlock>
      {articles && articles.map(article => (
        <NewsItem key={article.url} article={article} />
      ))}
    </NewsListBlock>
  )
}


export default NewsList;