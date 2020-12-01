import React, { useContext } from "react";
import API from "../../API";
import PropTypes from "prop-types";
import Thumb from "../Thumb";
import Rate from "../Rate";
import {  IMAGE_BASE_URL, POSTER_SIZE } from "../../config";
import NoImage from "../../images/no_image.jpg";
import { Wrapper, Content, Text } from "./MovieInfo.styles";
import { Context } from "../../context";

//import fire from "../../fire";

const MovieInfo = ({ movie }) => {
  const [user] = useContext(Context);

 /* const [state, setState] = useState({
    detail: {
      name: "",
      rating: null,
      director: ""
    }
  });*/

  const handleRating = async value => {
     await API.rateMovie(user.sessionId, movie.id, value);
  };
  

  
  return (
    <Wrapper backdrop={movie.backdrop_path}>
      <Content>
        <Thumb
          image={
            movie.poster_path
              ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
              : NoImage
          }
          clickable={false}
        />
        <Text>
          <h1>{movie.title}</h1>
          <h3>PLOT</h3>
          <p>{movie.overview}</p>

          <div className="rating-directors">
            <div>
              <h3>RATINGS</h3>
              <div className="score">{movie.vote_average}</div>
            </div>
            <div className="director">
              <h3>DIRECTOR{movie?.directors?.lenght > 1 ? "S" : ""}</h3>
              {movie?.directors?.map(director => (
                <p key={director.credit_id}>{director.name}</p>
              ))}
            </div>
          </div>
          {user && (
            <div>
              <p>Rate Movie</p>
              <Rate callback={handleRating} />
            </div>
          )}
        </Text>
      </Content>
    </Wrapper>
  );
};

MovieInfo.propTypes = {
  movie: PropTypes.object
};

export default MovieInfo;