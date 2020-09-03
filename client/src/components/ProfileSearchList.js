import React, { useState, useEffect } from "react";
import ProfileSearchService from "../services/ProfileSearchService";
import { Link } from "react-router-dom";

const ProfileSearchList = () => {
  const [profileSearch, setProfileSearch] = useState([]);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    retrieveProfiles();
  }, []);

  const onChangeSearchTitle = event => {
    const searchName = event.target.value;
    setSearchName(searchName);
  }

  const retrieveProfiles = () => {
    ProfileSearchService.getAll()
      .then(response => {
        setProfileSearch(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      })
  }

  const refreshList = () => {
    retrieveProfiles();
    setCurrentProfile(null);
    setCurrentIndex(-1);
  }

  const setActiveProfile = (profile, index) => {
    setCurrentProfile(profile);
    setCurrentIndex(index);
  }

  const removeAllProfiles = () => {
    ProfileSearchService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      })
  }

  const findByName = () => {
    ProfileSearchService.findByName(searchName, "tinder")
      .then(response => {
        setProfileSearch(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      })
  }
  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Name"
            value={searchName}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Profile List</h4>

        <ul className="list-group">
          {profileSearch &&
            profileSearch.map((profile, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveProfile(profile, index)}
                key={index}
              >
                {profile.rec_name}
                {profile.rec_age}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllProfiles}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentProfile ? (
          <div>
            <h4>Profile</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentProfile.name}
            </div>

            <div>
              <label>
                <strong>Age:</strong>
              </label>{" "}
              {currentProfile.age}
            </div>

            <div>
              <label>
                <strong>city:</strong>
              </label>{" "}
              {currentProfile.city}
            </div>

            <Link
              to={"/profilesearch/" + currentProfile.id}
              className="badge badge-warning"
            >
              Edit
            </Link>

          </div>
        ) : (
            <div>
              <br />
              <p>Please click on a Profile</p>
            </div>
          )}
      </div>
    </div>
  )
}



export default ProfileSearchList;