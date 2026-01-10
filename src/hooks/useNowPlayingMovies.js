import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/movieSlice";

const useNowPlayingMovies = () => {
    const dispatch = useDispatch();

    const getNowPlaying = async () => {
        const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS);
        const data = await response.json();
        //console.log(data.results);
        dispatch(addNowPlayingMovies(data.results));
    }

    useEffect(() => {
        getNowPlaying();
    }, []);
};
export default useNowPlayingMovies;

