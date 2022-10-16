import React from "react";
import './Card.css';
import { useEffect, useState } from "react";
import axios from "axios";

function Card() {
  const [bike, setBikes] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isEmpty, setIsEmpty] = useState([]);

  const { search } = window.location;
  const query = new URLSearchParams(search).get("s");
  const [searchTerm, setsearchTerm] = useState(query || "");

  const onSubmit = (e) => {
    e.preventDefault();
  };


  useEffect(() => {
    async function getComments() {
      axios
        .get(
          `https://bikeindex.org:443/api/v3/search/close_serials?page=1&per_page=10&serial=1&location=IP&distance=10&stolenness=stolen`
        )
        .then((res) => {
          setIsLoaded(true);
          setBikes(res.data.bikes);
        })
        .catch((err) => {
          setIsLoaded(true);
          setError(error);

          console.log(err);
        });
    }
    getComments();
  }, []);

  let fetchComments = async (currentPage) => {
    console.log(currentPage);
    setIsLoaded(false);
    let data = [];
    let res = await axios.get(
      `https://bikeindex.org:443/api/v3/search/close_serials?page=${currentPage}&per_page=10&serial=1&location=IP&distance=10&stolenness=stolen`
    );
    data = await res.data.bikes;
    setIsLoaded(true);
    return data;
  };

  const handlePageClick = async (event) => {
    let currentPage = event.selected + 1;
    const commentFromServer = await fetchComments(currentPage);
    console.log(commentFromServer);
    setBikes(commentFromServer);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else if (!isEmpty) {
    return <div>No data</div>;
  } else {
    return (
      <>
        <form
          action="/"
          method="get"
          className="search-main"
          autoComplete="off"
          onSubmit={onSubmit}
        >
          <label htmlFor="header-search"></label>
          <input
            type="text"
            id="header-search"
            placeholder="search..."
            className="search-text"
            value={searchTerm}
            name="s"
            onChange={(e) => setsearchTerm(e.target.value)}
          />
        </form>
        {bike
          .filter((val) => {
            if (searchTerm == "") {
              return val;
            } else if (
              val.title.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            }
          })
          .map((data) => (
            <div className="Card--">
              <div key={data.id} className="card--section">
                <img src={data.large_img}
                  className="image--bike"
                  alt="NO IMAGE AVAILABLE"
                />
                <div className="bike---info">
                  <span id="bike-status">{data.status}</span>
                  <span>{data.title}</span>
                  <span>{data.year}</span>
                  <div className="bike--desc">
                    <p>{data.description}</p>
                    <p>
                      {data.date_stolen}
                      <span>{data.stolen_location}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
          ))}
        {/* <div className="pagi--">
          <ReactPaginate className="pagi--con"
            previousLabel="<<"
            nextLabel=">>"
            pageCount={5}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
          />
        </div> */}
      </>
    );
  }
}

export default Card;