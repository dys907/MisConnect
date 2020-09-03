module.exports = mongoose => {

    let schema = mongoose.Schema(
        {
            sender_name: String,
            sender_age: String,
            sender_city: String,
            email: String,
            app: String,
            rec_name: String,
            rec_age: String,
            rec_city: String,
            description: String,
            question: String,
            answer: String
        },
        {timestamps: true}
    )

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      })
    const Profsearch = mongoose.model("profsearch", schema);
    return Profsearch;
}