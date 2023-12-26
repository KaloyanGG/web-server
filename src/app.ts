import Bootstrap from "./bootstrap";

await Bootstrap.start();

// import Elysia, {t} from "elysia";

// const elysiaDate = t.Object({
//     date: t.Date()
// });

// const app = new Elysia();
// app.post("/ch",()=>{
//     return {
//         date: new Date()
//     }
// },
// {
//     body: elysiaDate
// })
// app.listen(8080)
// console.log()