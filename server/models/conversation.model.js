module.exports = mongoose => {

    let schema = mongoose.Schema(
        {
            members: []
        },
        {timestamps: true}
    )

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      })
    const Conversation = mongoose.model("conversation", schema);
    return Conversation;
}