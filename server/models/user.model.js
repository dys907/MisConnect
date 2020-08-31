module.exports = mongoose => {

    let schema = mongoose.Schema(
        {
            email: {
                type: String,
                required: true,
                unique: true
            },
            password: {
                type: String,
                required: true
            },

            name: {
                type: String,
                required: true
            },

            age: {
                type: Number,
                required: true,
            },

            city: {
                type: String,
                required: true
            },
            bumble: {
                type: Boolean
            },
            tinder: {
                type: Boolean
            },
            hinge: {
                type: Boolean
            },
            register_date: {
                type: Date,
                default: Date.now
            }
        }

    )

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      })
    const User = mongoose.model("user", schema);
    return User;
}