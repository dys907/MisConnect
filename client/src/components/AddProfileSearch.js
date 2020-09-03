import React, { useState } from "react";
import ProfileSearchService from "../services/ProfileSearchService";


const AddProfileSearch = () => {
    //Initiate empty search
    const initialProfileState = {
        id: null,
        sender_name: "",
        sender_age: "",
        sender_city: "",
        email: "",
        app: "",
        rec_name: "",
        rec_age: "",
        rec_city: "",
        description: "",
        question: "",
        answer: "",
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
            sender_name: profileSearch.sender_name,
            sender_age: profileSearch.sender_age,
            sender_city: profileSearch.sender_city,
            email: profileSearch.email,
            app: profileSearch.app,
            rec_name: profileSearch.rec_name,
            rec_age: profileSearch.rec_age,
            rec_city: profileSearch.rec_city,
            description: profileSearch.description,
            question: profileSearch.question,
            answer: profileSearch.answer
        }

        ProfileSearchService.create(data)
            .then(response => {
                setProfileSearch({
                    id: response.data.id,
                    sender_name: response.data.sender_name,
                    sender_age: response.data.sender_age,
                    sender_city: response.data.sender_city,
                    app: response.data.app,
                    rec_name: response.data.rec_name,
                    rec_age: response.data.rec_age,
                    rec_city: response.data.rec_city,
                    description: response.data.description,
                    question: response.data.question,
                    answer: response.data.answer
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

                        {/* Sender Information */}

                        {/* Name form */}
                        <div className="form-group">
                            <label htmlFor="name">Your Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="sender-name"
                                required
                                value={profileSearch.sender_name}
                                onChange={handleInputChange}
                                name="sender_name"
                            />
                        </div>

                        {/* Age form */}
                        <div className="form-group">
                            <label htmlFor="sender-age">Your Age</label>
                            <input
                                type="text"
                                className="form-control"
                                id="sender-age"
                                required
                                value={profileSearch.sender_age}
                                onChange={handleInputChange}
                                name="sender_age"
                            />
                        </div>

                        {/* City form */}
                        <div className="form-group">
                            <label htmlFor="sender-city">Your City</label>
                            <input
                                type="text"
                                className="form-control"
                                id="sender-city"
                                required
                                value={profileSearch.city}
                                onChange={handleInputChange}
                                name="sender_city"
                            />
                        </div>

                        {/* Email Form */}
                        <div className="form-group">
                            <label htmlFor="sender-city">Your Email</label>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                required
                                value={profileSearch.city}
                                onChange={handleInputChange}
                                name="email"
                            />
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
                                    value="Tinder"
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
                                value="Bumble"
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
                                value="Hinge"
                                onChange={handleInputChange}
                                name="app"
                            />
                        Hinge
                        </label>


                    </div>

                        {/* Sender Information */}

                        {/* Name form */}
                        <div className="form-group">
                            <label htmlFor="name">Their Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="rec-name"
                                required
                                value={profileSearch.rec_name}
                                onChange={handleInputChange}
                                name="rec_name"
                            />
                        </div>

                        {/* Age form */}
                        <div className="form-group">
                            <label htmlFor="rec-age">Their Age</label>
                            <input
                                type="text"
                                className="form-control"
                                id="rec-age"
                                required
                                value={profileSearch.rec_age}
                                onChange={handleInputChange}
                                name="rec_age"
                            />
                        </div>

                        {/* City form */}
                        <div className="form-group">
                            <label htmlFor="rec-city">Their City</label>
                            <input
                                type="text"
                                className="form-control"
                                id="rec-city"
                                required
                                value={profileSearch.rec_city}
                                onChange={handleInputChange}
                                name="rec_city"
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

                        {/* Secret Question */}
                        <div className="form-group">
                            <label htmlFor="question">Secret Question</label>
                            <input
                                type="text"
                                className="form-control"
                                id="question"
                                required
                                value={profileSearch.question}
                                onChange={handleInputChange}
                                name="question"
                            />
                        </div>

                        {/* Profile Description */}
                        <div className="form-group">
                            <label htmlFor="answer">Secret Answer (They can contact you if they get this correct) </label>
                            <input
                                type="text"
                                className="form-control"
                                id="answer"
                                required
                                value={profileSearch.answer}
                                onChange={handleInputChange}
                                name="answer"
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