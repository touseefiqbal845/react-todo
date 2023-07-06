import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

function Cards() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Fetch API data on component mount
    const fetchApi = async () => {
      const apiUrl =
        'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=61146f31b4874c84bc7c9f8b2eb48674';
      const response = await axios.get(apiUrl);
      const apiData = response.data;
      setArticles(apiData.articles);
    };

    fetchApi();
    console.log( setArticles);
  }, []);
 
  const openUrl = (apiUrl, url, urlToImage) => {
    // Open URL in a new tab/window
    if (apiUrl) {
      window.open(apiUrl, '_blank');
    }
    if (url) {
      window.open(url, '_blank');
    }
    if (urlToImage) {
      window.open(urlToImage, '_blank');
    }
  };

  return (
    <>
      <Container className="d-flex flex-wrap justify-content-center">
        {articles.map((art, index) => (
          <Card style={{ width: '18rem', marginBottom: '1rem', marginRight: '1rem' }} key={art.title, index}>
            <Card.Body>
              {/* Card Title */}
              <Card.Title className="circle">{index + 1}</Card.Title>
              <Card.Title className="api-container"></Card.Title>
              <Card.Title>{art.title}</Card.Title>

              {/* Card Subtitle (Author) */}
              <Card.Subtitle className="mb-2 text-muted" style={{ fontSize: '20px', marginTop: '4px' }}>
                Author: {art.author}
              </Card.Subtitle>

              {/* Card Text (Description) */}
              <Card.Text>Description: {art.description}</Card.Text>

              {/* Card Text (Source) */}
              <Card.Text style={{ fontSize: '20px', marginTop: '4px', fontWeight: 'bold' }}>
                Source: {art.source?.name}
              </Card.Text>

              {/* Card Text (Published Date) */}
              <Card.Text style={{ fontSize: '20px', marginTop: '4px', fontWeight: 'bold' }}>
                Published Date: {art.publishedAt}
              </Card.Text>

              {/* Button (Read More) */}
              <Button
                className="justify-text-center"
                style={{ fontSize: '15px', marginTop: '4px', marginRight: '0px', fontWeight: 'bold' }}
                onClick={() => openUrl(art.url, null, null)}
              >
                Read more
              </Button>
            </Card.Body>
          </Card>
        ))}
      </Container>
    </>
  );
}

export default Cards;

