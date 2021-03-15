import 'dotenv/config';
import Koa from 'koa';
import Router from 'koa-router';
import mount from 'koa-mount';

import cors from 'koa2-cors';
import parse from 'co-body';

console.log("KOA BACKEND SERVER --begin--");

const app = new Koa();
const router = new Router();

const devProject = [ {
  name: 'Andrei-Marius',
  image: 'https://i.imgur.com/1QSViF0.jpg',
  project: 'Project X',
  info: 'A small e-commerce site that sells mostly daily deals and special offers.',
  score: 0
},
{
  name: 'Martynas',
  image: 'https://i.imgur.com/uuAMIzn.jpg',
  project: 'Project Y',
  info: 'Larger e-commerce provider that has personalised shopping for clients.',
  score: 0
},
{
  name: 'Paul',
  image: 'https://i.imgur.com/2qnghRD.jpg',
  project: 'Project Z',
  info: 'Large scale data aggregation from external sources for custom offerings.',
  score: 0
},

];

router.get('/developers', (ctx, next) => {  
  ctx.body = devProject;
});

const update = (developerName, operation) => {
  const dev = devProject.find((dev) => dev.name === developerName);
  dev.score = (operation === "bug") ? dev.score - 1 : dev.score + 1;
  devProject.sort((a, b) => b.score - a.score); 
}

router.post('/update', async (ctx) => {
  const { name, action } = await parse(ctx); 
  console.log(`dev ${name} has a ${action} logged against their project.`)
  update(name, action);
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