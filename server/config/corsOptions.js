let allowedOrigins;

if (process.env.NODE_ENV === 'development') {
    allowedOrigins = [
        "http://localhost:5555"
    ]
} else {
    allowedOrigins = [
        "https://full-stack-lqs.onrender.com"
    ]
}

export const corsOptions = {
    origin : (origin, callback) =>{
        if (allowedOrigins.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}

