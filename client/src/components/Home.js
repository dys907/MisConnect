import React, { useState } from "react";
import logo from "../image/misconnectLogoClear.png";
import ProfileSearchService from "../services/ProfileSearchService";
import { Link } from "react-router-dom";

const Home = () => {

    const initialSearch = {

        rec_name: "",
        app: ""

    }

    const [profileResults, setProfileResults] = useState([]);
    const [search, setSearch] = useState(initialSearch);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [currentProfile, setCurrentProfile] = useState(null);



    //event handler for form
    const handleInputChange = event => {
        const { name, value } = event.target;
        setSearch({ ...search, [name]: value });
        console.log(search);
    }


    const submitSearch = () => {
        ProfileSearchService.findByName(search.rec_name, search.app)
            .then(response => {
                setProfileResults(response.data);
                console.log(profileResults)
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            })
    }

    const setActiveProfile = (profile, index) => {
        setCurrentProfile(profile);
        setCurrentIndex(index);
      }

    return (
        <>
            <img src={logo} alt="logo"></img>
            <div>
                <p>
                    Welcome to Misconnect. We want to try and help you find users who may have
                    unmatched you on dating apps such as Tinder, Bumble or Hinge. Start by
                    typing in your name and what application you use!
                </p>
            </div>
        <div className="list row">
            <div className="col-md-8">
                {/* Search bar */}
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by Name"
                        name="rec_name"
                        value={search.rec_name}
                        onChange={handleInputChange}
                    />
                    <div className="input-group-apend">

                        <button
                            className="btn btn-outline-danger"
                            type="button"
                            onClick={submitSearch}
                        >
                            Search
                    </button>
                    </div>
                </div>

                {/* App choose 1 */}

                <label htmlFor="app">What App did you meet on?</label>
                <div className="form-group">


                    {/*Tinder */}
                    <label>
                        <input
                            type="radio"
                            className="form-check-inline mx-3"
                            id="app"
                            required
                            value="tinder"
                            onChange={handleInputChange}
                            name="app"
                        />
                        Tinder</label>

                    {/*Bumble */}
                    <label>


                        <input
                            type="radio"
                            className="form-check-inline mx-3"
                            id="app"
                            required
                            value="bumble"
                            onChange={handleInputChange}
                            name="app"
                        />
                        Bumble</label>

                    {/*Hinge */}
                    <label>


                        <input
                            type="radio"
                            className="form-check-inline mx-3"
                            id="app"
                            required
                            value="hinge"
                            onChange={handleInputChange}
                            name="app"
                        />
                        Hinge
                        </label>
                </div>

            </div>



            {/* results */}
            <div className="col-md-6">

                <h4>Profile List</h4>

                <ul className="list-group">
                    {profileResults &&
                        profileResults.map((profile, index) => (
                            <li
                                className={
                                    "list-group-item "
                                }
                                onClick={() => setActiveProfile(profile, index)}
                                key={index}
                            >

                                {profile.rec_name}
                                {profile.rec_age}
                            </li>
                        ))}
                </ul>

            </div>

            {/*Desciptions*/}
            <div className="col-md-6">
        {currentProfile ? (

          <div>
              <div></div>
            <h4>Profile</h4>
            <div>
              <label>
                <strong>Posted By:</strong>
              </label>{" "}
              {currentProfile.sender_name}
            </div>

            <div>
              <label>
                <strong>Age:</strong>
              </label>{" "}
              {currentProfile.sender_age}
            </div>

            <div>
              <label>
                <strong>city:</strong>
              </label>{" "}
              {currentProfile.sender_city}
            </div>

            <Link
              to={"/profilesearch/" + currentProfile.id}
              className="btn btn-primary"
            >
              Edit
            </Link>

          </div>
        ) : (
            <div>
              <br />
              <p>Click on a profile for more information</p>
            </div>
          )}
      </div>
    </div>


        </>
    )
}
export default Home;