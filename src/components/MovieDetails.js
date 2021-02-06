import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { useCookies } from 'react-cookie';

function MovieDetails(props) {

    const [highlighted, setHighlighted] = useState(-1);
    const [token] = useCookies(['mr-token']);

    let mov = props.movie;

    const highlightRate = high => event => {
        setHighlighted(high)
    }

    const rateClicked = rate => event => {
        fetch(`http://127.0.0.1:8000/api/movies/${mov.id}/rate_movie/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token['mr-token']}`
            }, 
            body: JSON.stringify( {stars: rate} )
          })
          .then( res => res.json())
          .then( () => getDetails())
          .catch( err => console.log(err));
    }

    const getDetails = () =>{
        fetch(`http://127.0.0.1:8000/api/movies/${mov.id}/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token['mr-token']}`
            }, 
        })
        .then( res => res.json())
        .then( res => props.updateMovie(res))
        .catch( err => console.log(err));
    }

    return (
        <React.Fragment>
            {mov ? 
                <div>
                    <h2>{mov && mov.title}</h2>
                    <p>{mov && mov.description}</p> 
                    <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 0 ? 'orange' : ''}/>
                    <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 1 ? 'orange' : ''}/>
                    <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 2 ? 'orange' : ''}/>
                    <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 3 ? 'orange' : ''}/>
                    <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 4 ? 'orange' : ''}/>
                    ({mov.no_of_ratings})

                    <div className="rate-container">
                        <h2>Rate it</h2>
                        { [...Array(5)].map((e, i) => {
                            return <FontAwesomeIcon 
                                key={i} icon={faStar} 
                                className={highlighted > i - 1 ? 'purple' : ''} 
                                onMouseEnter={highlightRate(i)} 
                                onMouseLeave={highlightRate(-1)}
                                onClick={rateClicked(i+1)}
                            />
                        })}
                    </div>
                </div>
                : null
            }
        </React.Fragment>
    )
}

export default MovieDetails;