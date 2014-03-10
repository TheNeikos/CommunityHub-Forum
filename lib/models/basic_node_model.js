// The lowest node. It has no logic and shouldn't be anything meaningful as anything

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BasicNodeSchema = new Schema({
    parent: {
        type: Schema.ObjectId,
        ref: "BasicNode"
    },
    children: [
        {
            type: Schema.ObjectId,
            ref: "BasicNode"
        }
    ]
}, { collection: 'nodes' });

var BasicNodeModel = mongoose.model("BasicNode", BasicNodeSchema);

module.exports = {
    BasicNodeSchema: BasicNodeSchema,
    BasicNodeModel: BasicNodeModel
}