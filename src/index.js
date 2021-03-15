import 'dotenv/config';
import Koa from 'koa';
import Router from 'koa-router';
import mount from 'koa-mount';

import cors from 'koa2-cors';
import parse from 'co-body';


console.log("KOA BACKEND SERVER --begin--");

// console.log("************");
// console.log ( developers );

const app = new Koa();
const router = new Router();

console.log("*******router*****");
console.log ( router );

const devProject = [ {
  name: 'Andrei-Marius Hutupas-Antoniu',
  image: 'https://i.imgur.com/1QSViF0.jpg',
  project: 'Project X',
  info: 'A small e-commercse site that sells mostly daily deals.',
  score: 0
},
{
  name: 'Martynas Raiselas',
  image: 'https://i.imgur.com/uuAMIzn.jpg',
  project: 'Project Y',
  info: 'Larger e-commerse provider that has customised shopping for clients.',
  score: 0
},
{
  name: 'Paul Kirkass',
  image: 'https://i.imgur.com/2qnghRD.jpg',
  project: 'Project Z',
  info: 'Large scale data aggregation from external sources.',
  score: 0
},

];

router.get('/developers', (ctx, next) => {
  // ctx.router available   
  ctx.body = devProject;
});

const update = (developerName, operation) => {
  const dev = devProject.find((dev) => dev.name === developerName);
  dev.score = (operation === "bug") ? dev.score - 1 : dev.score + 1;
  devProject.sort((a, b) => b.score - a.score); 
}


//const uploadMiddleware = multer().fields([{ name: 'file', maxCount: 1 }]);

const loggerMiddleWare = () => {
  console.log("post has been received");
}

router.post('/update', async (ctx) => {
  //const id = getUserId(ctx);
  console.log("here poes");
  let {name, action} = await parse(ctx); //destructuring
  console.log(name);
  console.log(action);
  update(name, action);


  // const { name, action } = ctx.request.body;
  // if (!name) {
  //   ctx.body = 'Missing name';
  //   return;
  // }
  
  // console.log(name);
  // console.log(action);

  //saveImage(id, name, ctx.files.file[0].buffer);
  
 // ctx.redirect('/');
}
);

app
  .use(router.routes())
  .use(router.allowedMethods())
  .use(cors({
    origin: function(ctx) {
      return '*';
    },
  }));

app.listen(3001);