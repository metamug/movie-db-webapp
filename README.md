# movie-db-webapp

This example demonstrates how to make a simple CRUD operation in database using REST APIs built with Metamug.

### Resource File
``` xml
<Resource xmlns="http://xml.metamug.net/resource/1.0"  v="1.1">
    <Desc>Contains information about movies.</Desc>
    <Request method="GET">
        <Query>
           SELECT * FROM movie 
        </Query>        
    </Request>
    <Request method="POST">
        <Update>
            INSERT INTO movie (name,rating) values ($p,CAST($q AS DECIMAL))
        </Update>
    </Request>
    <Request method="DELETE" item="true" status="410">
        <Update>
            DELETE FROM movie WHERE id=CAST($id AS DECIMAL)
        </Update>
    </Request>
</Resource>
```
### APIs

http://localhost:7000/movies/v1.1/movies

```
GET http://localhost:7000/movies/v1.1/movies

POST http://localhost:7000/movies/v1.1/movies
{p:movieName, q: rating}

DELETE http://localhost:7000/movies/v1.1/movies/{id}
```

### Demo

http://movie-list.metamug.net/

### Video Tutorial

https://www.youtube.com/watch?v=RcHA2MDFVxs

### Docs 

You can find more information about how to create resources here

https://metamug.com/docs/resource-file
