import mongoose from "mongoose";

const ThemeSchema = new mongoose.Schema({
    profile: {
        type: mongoose.Types.ObjectId,
        ref: "Profile",
        required: true
    },
    background: {
        bgType: {
            type: String, // color, gradient, image, video
            default: "color"
        }, 
        color: {
            type: [String],
            default: ["#3B82F6"]
        },
        url: String
    },
    font: {
        url: {
            type: String,
            default: "'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=MuseoModerno:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'"
        },
        name: {
            type: String,
            default: "Montserrat"
        },
        color: {
            type: String,
            default: "#F3F4F6"
        }
    },
    disclosure: {
        bgColor: {
            type: String,
            default: "#FFFFFF"
        },
        hoverColor: {
            type: String,
            default: "#BFDBFB"
        },
        fontColor: {
            type: String,
            default: "#374151"
        },
        titleColor: {
            type: String,
            default: "#3B82F6"
        }
    },
    footer: {
        logo: String
    }
},{
    timestamps: true
});

const Theme = mongoose.model("Theme", ThemeSchema);

export default Theme;