# Full-stack-LQS (MERN)

#Author Vasilis Tomaras

Een full stack implementation of the a webshop.  Full on functionality of the front and back end respectively but the combination is on going.

## Clone repository and navigate to folder

```jsx
git clone https://github.com/tomavasi/full-stack-lqs.git
cd full-stack-lqs
```

## Run project

First set an .env file with the following 

```jsx
ACCESS_TOKEN_SECRET = <your secret>
REFRESH_TOKEN_SECRET = <your secret>
MONGODB_BASE_URL = <your MongoDB url>
PORT = <localhost port>
```

Run dev enviroment (both front & back-end)

```jsx
npm run dev
```

Run Lint

```jsx
npm run lint
```

Run Playwright end-to-end test

```jsx
npm run test:e2e
```

Run build & production

```jsx
npm run build 
npm run start
```

The project implements a github pipeline for lint, build, testing and deployment on Render. For more information check this action on Github marketplace : https://github.com/johnbeynon/render-deploy-action

In the development branch extra code can be found for the notification of Build fails and successful deployments on Discord. More info check : https://github.com/rjstone/discord-webhook-notify
