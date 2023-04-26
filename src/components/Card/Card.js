import React from "react";
import "./Card.css";
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
      <div className="container">
        <div className="row">
          <div className="col-12 mb-4">
        <form>
          <label
            htmlFor="header-search"
            action="/"
            method="get"
            className="search-main"
            autoComplete="off"
            onSubmit={onSubmit}
          ></label>

            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              id="header-search"
              value={searchTerm}
              name="s"
              onChange={(e) => setsearchTerm(e.target.value)}
            />
          
        </form>
        </div>
        <div className="col-12">
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
            <div className="card mb-2" key={data.id}>
              <div  className="card--section" >   
                <div className="row card-body">
                <img src={data.large_img} className="col-sm-4" alt="image not uploaded" style={{height: "250px", objectFit: "contain"}}/>
                <div class="col-sm-8">
                  <span className={`badge ${data.status === 'found'?'bg-success':'bg-danger'}`}>{data.status}</span>
                  <h5 className="card-title">{data.title}</h5>
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
            </div>
            ))}
            </div>
            </div>
        {/* <div className="pagi--">
          <ReactPaginate className="pagi--con"
            previousLabel="<<"
            nextLabel=">>"
            pageCount={5}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
          />
        </div> */}
      </div>
    );
  }
}

export default Card;
