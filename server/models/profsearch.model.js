module.exports = mongoose => {

    let schema = mongoose.Schema(
        {
            name: String,
            age: String,
            city: String,
            description: String
        },
        {timestamps: true}
    )

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      })

    // const Profsearch = mongoose.model(
    //     "profsearch",
    //     mongoose.Schema(
    //         {
    //             name: String,
    //             age: String,
    //             city: String,
    //             description: String
    //         },
    //         {timestamps: true}
    //     )
    // )
    const Profsearch = mongoose.model("profsearch", schema);
    return Profsearch;
}