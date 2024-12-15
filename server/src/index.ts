import express from 'express';
import { User, Link, Content, Tag } from './db';
import jwt from "jsonwebtoken";
import { verifyUserMiddleware, userMiddleware } from './middleware';
import { JWT_ACCESS_PASSWORD, JWT_REFRESH_PASSWORD } from './config';
import { random } from './utils'
import cookieParser = require("cookie-parser")
const app = express();
const port = 3000;
import cors from "cors";
import mongoose from 'mongoose';
import { CombinedRequest } from './types/types';
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}))
app.use(cookieParser())

app.post('/api/v1/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        await User.create({
            username: username,
            password: password
        })

        res.status(200).json({
            message: "User signed up"
        })
    } catch (e) {
        res.status(411).json({
            message: "User already exists"
        })
    }
});



app.post('/api/v1/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const existinguser = await User.findOne({ username, password });
    if (existinguser) {
        const accessToken = jwt.sign({ id: existinguser._id }, JWT_ACCESS_PASSWORD, { expiresIn: '1m' });
        const refreshToken = jwt.sign({ id: existinguser._id }, JWT_REFRESH_PASSWORD, { expiresIn: '5m' });
        res.cookie('accessToken', accessToken, { maxAge: 1 * 60 * 1000 })

        res.cookie('refreshToken', refreshToken,
            { maxAge: 5 * 60 * 1000, httpOnly: true, secure: true, sameSite: 'strict' })

        res.json({
            message: "User authenticated",
            token: accessToken,
            refresh: refreshToken,
        });
    } else {
        res.status(403).json({
            message: "Incorrect credentials"
        });
    }
});

app.post('/api/v1/verifyJWT', verifyUserMiddleware, async (req, res) => {
    // res.status(200).json({ valid: true, message: "user authorized" })

        res.status(200).json({ valid: true, message: "user authorized" })


})

app.post("/api/v1/content", verifyUserMiddleware, async (req: CombinedRequest, res) => {
    const title = req.body.title;
    const link = req.body.link;
    const type = req.body.type;
    await Content.create({
        link,
        type,
        title,

        userId: req.userId,
        tags: []
    })

    res.json({
        message: "Content added successfully "
    })

})

app.get('/api/v1/content', verifyUserMiddleware, async (req: CombinedRequest, res) => {
    const userId = req.userId;
    const content = await Content.find({
        userId: userId
    }).populate("userId", "username");
    res.status(200).json({
        content
    })
});

app.delete('/api/v1/:contentId', verifyUserMiddleware, async (req, res) => {
    const contentId = req.params.contentId;
    console.log(" deleting contentId", contentId);
    const deletedContent = await Content.findByIdAndDelete(contentId);
    console.log("this is the deleted content: ", deletedContent)
    res.status(200).json({
        message: "delete sucessfull"
    })
});

app.post("/api/v1/brain/share", verifyUserMiddleware, async (req: CombinedRequest, res) => {
    const share = req.body.share;
    if (share) {
        const existingLink = await Link.findOne({

            userId: req.userId
        });

        if (existingLink) {
            res.json({
                hash: existingLink.hash
            })
            return;
        }
        const hash = random(10);
        await Link.create({

            userId: req.userId,
            hash: hash
        })

        res.json({
            hash
        })
    } else {
        await Link.deleteOne({

            userId: req.userId
        });

        res.json({
            message: "Removed link"
        })
    }
})

app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;

    const link = await Link.findOne({
        hash
    });

    if (!link) {
        res.status(411).json({
            message: "Sorry incorrect input"
        })
        return;
    }
    // userId
    const content = await Content.find({
        userId: link.userId
    })

    console.log(link);
    const user = await User.findOne({
        _id: link.userId
    })

    if (!user) {
        res.status(411).json({
            message: "user not found, error should ideally not happen"
        })
        return;
    }

    res.json({
        username: user.username,
        content: content
    })

})

async function connectDB() {
    try {
        const connect = await mongoose.connect("mongodb://localhost:27017/second-brain");
        console.log('database connected:', connect.connection.host, connect.connection.name);
    } catch (err) {
        console.log("this is the error :", err)
    }
}

connectDB();


app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
})