import React, { useState, useEffect } from "react";
import ProfileSearchService from "../services/ProfileSearchService";

const ProfileSearch = props => {
    const initialProfileState = {
        id: null,
        name: "",
        age: "",
        city: "",
        description: ""
    }

    const [currentProfile, setCurrentProfile] = useState(initialProfileState);
    const [message, setMessage] = useState("");

    const getProfile = id => {
        ProfileSearchService.get(id)
        .then(response => {
            setCurrentProfile(response.data);
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        })
    }

    useEffect(() => {
        getProfile(props.match.params.id);
    }, [props.match.params.id])

    const handleInputChange = event => {
        const {name, value} = event.target;
        setCurrentProfile({...currentProfile, [name]: value})
    }

    const updateProfile = () => {
        ProfileSearchService.update(currentProfile.id, currentProfile)
            .then(response => {
                console.log(response.data);
                setMessage("Search preferences updated successfully");
            })
            .catch(e => {
                console.log(e);
            })
    }

    const deleteProfile = () => {
        ProfileSearchService.remove(currentProfile.id)
        .then(response => {
            console.log(response.data);
            props.history.push("/profsearch");
        })
        .catch(e => {
            console.log(e);
        })
    }

    return(
        <div>
        {currentProfile ? (
          <div className="edit-form">
            <h4>Profile</h4>

            <form>

              <div className="form-group">
                <label htmlFor="name">Name</label>

                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={currentProfile.name}
                  onChange={handleInputChange}
                />

              </div>

              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input
                  type="text"
                  className="form-control"
                  id="age"
                  name="age"
                  value={currentProfile.age}
                  onChange={handleInputChange}
                />
                </div>
                
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  value={currentProfile.description}
                  onChange={handleInputChange}
                />
              </div>

            </form>
  
            <button className="badge badge-danger mr-2" onClick={deleteProfile}>
              Delete
            </button>
  
            <button
              type="submit"
              className="badge badge-success"
              onClick={updateProfile}
            >
              Update
            </button>
            <p>{message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Profile...</p>
          </div>
        )}
      </div>
    )
}


export default ProfileSearch;