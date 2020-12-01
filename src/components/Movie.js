import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../config';
import BreadCrumb from './BreadCrumb';
import Grid from './Grid';
import Spinner from './Spinner';
import MovieInfo from './MovieInfo';
import MovieInfoBar from './MovieInfoBar';
import Actor from './Actor';
import fire from "../fire";

// Hook
import { useMovieFetch } from '../hooks/useMovieFetch';
// Image 
import NoImage from '../images/no_image.jpg';

const Movie = () => {
    const { movieId } = useParams();
    const [movieData, setMovieData] = useState();
    const { state: movie, loading, error } = useMovieFetch(movieId);
    const addDislike = async () => {
        var ref = fire.database().ref("movie/" + movie.id );
        console.log("ref dislike",ref)
       
        if(movieData){
           await ref.set({...movieData,dislike:movieData.dislike + 1})
           setMovieData({...movieData, dislike:movieData.dislike + 1})
        } 
        
        
      }
      const addLike = async () => {
        var ref = fire.database().ref("movie/" + movie.id );
        console.log("ref dislike",ref)
       
        if(movieData){
           await ref.set({...movieData,like:movieData.like + 1})
           setMovieData({...movieData, like:movieData.like + 1})
        } 
        
        
      }
    
  const saveData = async () => {
    
    var ref = fire.database().ref("movie/" + movie.id);
    console.log("ref", ref, ref.child(movie.id))
    ref.once('value').then(async (snapshot) => {
        const tempData = await snapshot.val();
        console.log(tempData)
        if(tempData?.id){
            setMovieData(tempData)
        } else {
            setMovieData({...movie, like:0, dislike:0})
            await ref.set({...movie, like:0, dislike:0})
        }
      });
  
  };
  useEffect(() => {
      if(movie && movie.id){
        saveData();
      }
    
  }, [movie]);
  console.log(movieData)
    if (loading) return <Spinner />;
    if (error) return <div>Opps sorry, something went wrong...</div>;

    return (
        <>
            <BreadCrumb movieTitle={movie.original_title} />
            <MovieInfo movie={movie} />
            <MovieInfoBar addLike={addLike} movieData={movieData} addDislike={addDislike} time={movie.runtime} budget={movie.budget} revenue={movie.revenue} />
            <Grid header='Actors'>
                {movie?.actors?.map(actor => (
                    <Actor
                    key={actor.credit_id}
                    name={actor.name}
                    character={actor.character}
                    imageUrl={
                        actor.profile_path
                        ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
                        : NoImage
                    }
                    />
                ))}
            </Grid>
        </>
        
    );
};

export default Movie;