# Inventory Manager - Shopify-Summer-2022

![Shopify-Summer-2022](https://socialify.git.ci/AryPat/Shopify-Summer-2022/image?font=Raleway&language=1&logo=https%3A%2F%2Fwebimages.mongodb.com%2F_com_assets%2Fcms%2Fkuyjf3vea2hg34taa-horizontal_default_slate_blue.svg%3Fauto%3Dformat%25252Ccompress&name=1&owner=1&pattern=Brick%20Wall&theme=Light)

# Quick and Easy Links 
- **Frontend**: https://shopify-summer-2022.herokuapp.com/
- **Swagger Documentation**: https://shopify-summer-2022.herokuapp.com/api-docs 

# Description
## Goal and Purpose
The goal of the challenge was to create a backend application solely for keeping track of a companies inventory. The user is able to 
- See the list of inventory items existing on the systme 
- Create a new inventory item 
- Edit an existing inventory item 
- Delete an inventory item

## Technologies Used 
<div style="display:flex;flex-direction:row;width:100%;justify-content:space-evenly;align-items:space-evenly">
    <a href="https://www.mongodb.com/" target="blank"><img src="frontend/assets/mongo.svg" alt="Logo" width=50/></a>
    <a href="https://nodejs.org/en/" target="blank"><img src="frontend/assets/n.svg" alt="Logo" width=50/></a>
    <a href="https://www.javascript.com/" target="blank"><img src="frontend/assets/java.svg" alt="Logo" width=50/></a>
    <a href="https://expressjs.com/" target="blank"><img src="frontend/assets/ex.svg" alt="Logo" width=50/></a>
    <a href="https://github.com/" target="blank"><img src="frontend/assets/react.svg" alt="Logo" width=50/></a>
    <a href="https://github.com/" target="blank"><img src="frontend/assets/github.svg" alt="Logo" width=50/></a>
</div>

- Node, Express, Javascript, MongoDB (Backend)
- React (Frontend)
- Heroku (Deployment)
- Github (ofcourse :smile:)

## Usage
- You can follow the **Swagger** documentation linked in `Quick and Easy Links` to independently test out the backend endpoints currently running on a server. **Swagger**  outlines the various endpoints and their request, responses, and code status.
- An alternative to **Swagger** is the frontend which interacts directly with the server! You can access the frontend using `Quick and Easy Links` above.
- If you prefer neither of the above options do not worry, there is one more way! Refer to the guide for a quick local installation and configuration of the client and server on **your very own machine**.

# Local Installation

## Prerequisites
> Require Node 16.X.X + 

> Cloning of `Shopify-Summer-2022` onto your machine 

> Creating your own [MongoDB Connection URL](https://docs.mongodb.com/manual/reference/connection-string/)

You must then also create a `.env` file inside `Shopify-Summer-2022` folder with
```
MONGO_URI=<mongo_uri> 
```
where `<mongo_uri>` is your MongoDB Connection URL

## Building and running
From root directory

```
# cd /frontend
npm run build:watch

# cd ../backend 
npm start
```

You can now access frontend running on `http://localhost:5000/` and swagger documentation on `http://localhost:5000/api-docs/`
