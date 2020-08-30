module.exports = mongoose => {
    const Profsearch = mongoose.model(
        "profsearch",
        mongoose.Schema(
            {
                name: String,
                age: String,
                city: String,
                description: String
            },
            {timestamps: true}
        )
    )
    return Profsearch;
}