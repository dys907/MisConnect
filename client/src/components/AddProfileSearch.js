import React, { useState } from "react";
import ProfileSearchService from "../services/ProfileSearchService";


const AddProfileSearch = () => {
    //Initiate empty search
    const initialProfileState = {
        id: null,
        name: "",
        age: "",
        city: "",
        description: ""
    }

    const [profileSearch, setProfileSearch] = useState(initialProfileState);
    const [submitted, setSubmitted] = useState(false);

    //event handler for form
    const handleInputChange = event => {
        const { name, value } = event.target;
        setProfileSearch({ ...profileSearch, [name]: value });
    }

    //saves data in form to db.
    const saveProfileSearch = () => {
        let data = {
            name: profileSearch.name,
            age: profileSearch.age,
            city: profileSearch.city,
            description: profileSearch.description
        }

        ProfileSearchService.create(data)
            .then(response => {
                setProfileSearch({
                    id: response.data.id,
                    name: response.data.name,
                    age: response.data.age,
                    city: response.data.city,
                    description: response.data.description
                })
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const newProfileSearch = () => {
        setProfileSearch(initialProfileState);
        setSubmitted(false);
    }

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You have added a new search</h4>
                    <button className="btn" onClick={newProfileSearch}>
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    {/* Name form */}
                    <div className="form-group">
                        <label htmlFor="name">First Name</label>
                        <input
                        type="text"
                        className="form-control"
                        id="first-name"
                        required
                        value={profileSearch.name}
                        onChange={handleInputChange}
                        name="name" 
                        />
                    </div>

                    {/* Age form */}
                    <div className="form-group">
                        <label htmlFor="age">Age</label>
                        <input
                        type="text"
                        className="form-control"
                        id="age"
                        required
                        value={profileSearch.age}
                        onChange={handleInputChange}
                        name="age" 
                        />
                    </div>

                    {/* city form, will be removed in future iterations */}
                    <div className="form-group">
                        <label htmlFor="name">City</label>
                        <input
                        type="text"
                        className="form-control"
                        id="city"
                        required
                        value={profileSearch.city}
                        onChange={handleInputChange}
                        name="city" 
                        />
                    </div>

                    {/* Profile Description */}
                    <div className="form-group">
                        <label htmlFor="description">Describe the person</label>
                        <input
                        type="text"
                        className="form-control"
                        id="description"
                        required
                        value={profileSearch.description}
                        onChange={handleInputChange}
                        name="description" 
                        />
                    </div>

                    <button onClick={saveProfileSearch} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>

    );

}
export default AddProfileSearch;