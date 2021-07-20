## using jwt token for authorization
## Endpoints

```
POST     /users/register         body (name, email, password, confirmpassword)
POST     /users/login            body (email, password)
GET      /store                  list all store of a particular user
POST     /store                  body (storeName)
DELETE   /store/:id              id = storeId
GET      /inventory              list all inventory of a particular user
POST     /inventory              body (name, storeId)
DELETE   /inventory/:id          id = inventoryId
GET      /book                   list all books of a particular user
GET      /book/:id               to view a particular book
POST     /book                   body (title, description, inventoryId)
DELETE   /book/:id               id = bookId



```
## clone this project
## use cd eCommerce then npm i
## edit credentials in /db/config.json and /config.json
## run "npx sequelize db:create"
## run "npx sequelize db:migrate"
## run "npx sequelize db:seed:all"
## run "npm start"
# Book store

from => Akshat Soni
contact => 9098735543
email => akshatsoni8055@gmail.com# BookStore
