# The Shoebox

## Project Description
The Shoebox is an e-commerce website created as a final project for Lighthouse Labs. It includes both user and admin interfaces. The users' experience includes browsing through a collection of shoes where they can filter their search based on style, color and price. In addition to that, users will be able to choose the shoe size and add products to cart. In cart, users will be able to modify quantity and/or remove products. Reviews are also part of the app where users can add their opinions which will be sent to admins pending approval. The project uses Stripe for checkout and a message will pop up after successful purchase.<br /> <br />
The Admin dashboard shows some statistics like most colors and sizes sold, as well as styles and so on.<br />
Admin interface includes the ability of admins to update existing products like their price and description and many more. Admins will also be able to create new products and fill required fields to have a complete product to be shown in the collection.
Inventory can also be accessed from the admin interface where the quantity of all item can be updated. All orders placed by users are also accessible by admins showing all necessary details like size, quantity, product name and price. The last part of admin interface is the reviews section where admins can either approve or decline users' written reviews and, upon approval, the reviews will show up in users interface.

## The Team
* [Khaled Alkhatib](https://github.com/Khaled91Alkhatib),
* [Farzaneh Sadegh](https://github.com/FarzanehSa).

## Screenshots
![Home Page](https://github.com/FarzanehSa/shoeBox-client/blob/main/public/screenshots/homepage.png)
![Collection Page](https://github.com/FarzanehSa/shoeBox-client/blob/main/public/screenshots/Collection%20Page.png)
![Sinple Product](https://github.com/FarzanehSa/shoeBox-client/blob/main/public/screenshots/Single%20Product.png)
![User's Review](https://github.com/FarzanehSa/shoeBox-client/blob/main/public/screenshots/User%27s%20review.png)
![Cart](https://github.com/FarzanehSa/shoeBox-client/blob/main/public/screenshots/Cart.png)
![After Purchase](https://github.com/FarzanehSa/shoeBox-client/blob/main/public/screenshots/After%20Purchase.png)
![Admin main](https://github.com/FarzanehSa/shoeBox-client/blob/main/public/screenshots/Admin.png)
![Dashboard](https://github.com/FarzanehSa/shoeBox-client/blob/main/public/screenshots/Dashboard.png)
![Product Edit](https://github.com/FarzanehSa/shoeBox-client/blob/main/public/screenshots/Product%20Edit.png)
![Inventory](https://github.com/FarzanehSa/shoeBox-client/blob/main/public/screenshots/Inventory%20quantity.png)
![Placed Orders](https://github.com/FarzanehSa/shoeBox-client/blob/main/public/screenshots/Placed%20Orders.png)
![Reviews in Admin](https://github.com/FarzanehSa/shoeBox-client/blob/main/public/screenshots/Reviews%20in%20admin.png)

## Setup
Both the frontend and backend are deployed using Heroku and Netlify.
* To access the main app please visit [Shoebox](https://shoe-box.netlify.app/)
* To visit the admin dashboard please visit this [link](https://shoe-box.netlify.app/dashboard). The name is "admin" and the password is "12345"
* To check the backend data please visit [The Shoebox API](https://shoe-box-api.herokuapp.com/)
* The Stripe checkout implementation is in test mode. That means that there will be no actual financial transactions taking place even if real credit/debit card information where added. A card number that can be used is 4242 4242 4242 4242 and the rest of the checkout data can be filled using any data.

## Dependencies
* react
* react-dom
* react-modal
* react-toastify
* react-fontawesome
* react-stripe-checkout
* styled-components
* axios
* victory