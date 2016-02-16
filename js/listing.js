document.getElementById('add-button').addEventListener('click', function () {
        var modal = document.getElementById('create-movie-modal')
        modal.style.display = 'block';
    });
    document.getElementById('close-modal').addEventListener('click', function () {
        var modal = document.getElementById('create-movie-modal')
        modal.style.display = 'none';
    });

    function handleSubmit(form) {
        var movieName = form.querySelector('input[type=text]').value;
        var movieRating = form.querySelector('input[type=number]').value;
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://api.metamug.com/movies/v1/listing');
        var params = "name=" + movieName + "&rating=" + movieRating;
        //Send the proper header information along with the request
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("Content-length", params.length);
        xhr.setRequestHeader("Connection", "close");
        xhr.onload = function () {
            var modal = document.getElementById('create-movie-modal')
            modal.style.display = 'none';
            showMovies()
        }
        xhr.send(params);

    }

    function removeMovie(event) {
        var li = this.parentNode;
        var xhr = new XMLHttpRequest();
        xhr.open('DELETE', 'http://api.metamug.com/movies/v1/listing/' + this.dataset.movieId, false);
        xhr.onload = function (e) {
            li.classList.add('animated', 'bounceOut')
            li.addEventListener("animationend", function () {
                li.parentNode.removeChild(li);
            }.bind(li), false);
        }.bind(li)
        xhr.send();
    }

    function showMovies() {
        document.querySelector(".listing-section").innerHTML = '<center><i class="fa fa-circle-o-notch fa-spin" style="color:white;font-size: 11em;"></i></center>'
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://api.metamug.com/movies/v1/listing', true);
        xhr.onload = function () {
            var list = JSON.parse(xhr.responseText);
            var ul = document.createElement('ul');
            ul.classList.add('list-group');
            for (var i = 0; i < list.length; i++) {
                var li = document.createElement('li');
                li.classList.add('animated', 'bounceInUp', 'list-group-item');
                var removeLink = document.createElement('a');
                removeLink.dataset.movieId = list[i].id;
                removeLink.addEventListener('click', removeMovie);
                removeLink.classList.add('fa', 'fa-remove', 'fa-lg');
                removeLink.style.color = 'brown';
                removeLink.style.verticalAlign = 'super';
                li.appendChild(removeLink);
                var span = document.createElement('span');
                span.classList.add('movie-name')
                span.innerHTML = list[i].name;
                li.appendChild(span);
                li.appendChild(displayRating(list[i].rating))
                ul.appendChild(li)
            }
            var listingSection = document.querySelector(".listing-section")
            while (listingSection.firstChild) {
                listingSection.removeChild(listingSection.firstChild);
            }
            listingSection.appendChild(ul);
        }
        xhr.send();
    }

    function displayRating(rating) {
        var ratingSection = document.createElement('span');
        ratingSection.classList.add('rating-section');
        var stars = Math.floor(rating);
        var fraction = rating - stars;
        var halfStar = 0;
        if (fraction > 0.8)
            stars = stars + 1;
        else if (fraction > 0.2) {
            halfStar = 1;
        }
        var emptyStars = 5 - halfStar - stars;

        while (stars-- > 0) {
            var star = document.createElement('i')
            star.classList.add('fa', 'fa-star');
            ratingSection.appendChild(star)
        }

        if (halfStar === 1) {
            var star = document.createElement('i')
            star.classList.add('fa', 'fa-star-half-o');
            ratingSection.appendChild(star)
        }

        while (emptyStars-- > 0) {
            var star = document.createElement('i')
            star.classList.add('fa', 'fa-star-o');
            ratingSection.appendChild(star)
        }

        return ratingSection;
    }

    showMovies();
