const express = require("express")
const router = require("./routes/index")
const app = express()
const port = 3000

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: false }))

app.use("/", router)

app.listen(port, () => { 
    console.log(`listening at http://localhost:${port}`);
})