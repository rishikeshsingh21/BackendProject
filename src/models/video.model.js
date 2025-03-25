import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
    {
        title:{
            type:String,
            require:true
        },
        discription:{
            type:String,
            required:true
        },
        duration:{
            type:Number,
            required:true
        },
        videoFile:{
            type:String, // cloudinary url
            required:true
        },
        thumbnail:{
            type:String, // cloudinary url
            required:true
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User"
        },
        isPublish:{
            type:Boolean,
            default:true
        },
        views:{
            type:Number,
            default:0
        }
    },{versionKey:false,timestamps:true}
)

videoSchema.plugin(mongooseAggregatePaginate)
export const Video = mongoose.model("Video",videoSchema);