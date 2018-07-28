# movie-db-webapp

This example demonstrates how to make a simple CRUD operation in database using REST APIs built with metamug.
### Resource File
``` xml
<?xml version="1.0" encoding="UTF-8" ?>
<Resource xmlns="http://xml.metamug.net/resource/1.0"  v="1.1">
    <Desc>Contains information about movies.</Desc>
    <Request method="GET">
        <Param name="q" type='number' value='1'/>
      	<Query when="$q eq 1">
           SELECT * FROM movie order by name asc 
        </Query>
        <Desc>Get all the tasks entered today.</Desc>
        <Query when="$q eq 2">
            SELECT * FROM movie where id=$movieId
        </Query>
        <Query when="$q eq 3">
            SELECT `name`,`rating` from movie where `releaseDate` ge $fromDate and `releaseDate` le $toDate
        </Query>
      <Query when="$q eq 4">
            SELECT `name`,`rating`, releaseDate as 'info.releaseDate' from movie 
        </Query>
    </Request>
    <Request method="POST">
        <Update requires="p,q" status="201">
            INSERT INTO movie (`name`,`rating`) values($p,$q)
        </Update>
    </Request>
    <Request method="DELETE" item="true" status="410">
        <Update>
            DELETE FROM movie WHERE id=$id
        </Update>
    </Request>
</Resource>
```
### APIs

https://api.metamug.com/movies/v1.1/movies

```
GET https://api.metamug.com/movies/v1.1/movies

POST https://api.metamug.com/movies/v1.1/movies
{p:movieName, q: rating}

DELETE https://api.metamug.com/movies/v1.1/movies/{id}
```

### Demo

http://movie-list.metamug.net/

### Video Tutorial

https://www.youtube.com/watch?v=RcHA2MDFVxs

### Docs 

You can find more information about how to create resources here

https://metamug.com/docs/resource-file.php
