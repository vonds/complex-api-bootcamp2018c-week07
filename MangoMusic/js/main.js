(function MusicDb() {

  this.init = function () {
    this.search();
  };


  this.search = function () {
    document.querySelector('#form').addEventListener("submit", function (e) {
      e.preventDefault();
      const value = document.querySelector('#inputSearch').value;
      form.reset();
      getData(value.split(' ').join("+"));
    });
  };

  this.getData = function (artist) {
    const http = new XMLHttpRequest();
    const url = "https://itunes.apple.com/search?term=" + artist + "&entity=album";
    const method = "GET";
    console.log(artist);
    const container = document.querySelector('#albumListContainer');
    container.innerHTML = '';
    // const search = artist;
    http.open(method, url);
    http.onreadystatechange = function () {

      if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
        showAlbums(JSON.parse(http.response));
        document.querySelector('#inputSearch').style.display = "none";
        document.querySelector('.hide').style.display = "block";
        fetch(`https://theaudiodb.com/api/v1/json/1/search.php?s=${artist}`)
          .then(res => res.json())
          .then(response => {
            document.querySelector('#inputSearch').style.display = "none";
            document.querySelector('.hide').style.display = "block";


            console.log(response)
            document.querySelector('.artistInfo').addEventListener("click", function () {
              const parent = document.querySelector('#paraParent');
              const paragraph = document.createElement('section');
              paragraph.innerHTML = `
                <h2 class="headingBio info">${response.artists[0].strArtist}</h2>
                <img class="artistPic" src="${response.artists[0].strArtistFanart}">
                <a class="info" href="${response.artists[0].strWebsite}">${response.artists[0].strWebsite}</a>
                <p class="info">${response.artists[0].strBiographyEN}</p>


              `
              parent.appendChild(paragraph);
              document.querySelector('.artistInfo').innerHTML = "Reset"



              document.querySelector('.artistInfo').addEventListener("click", function () {
                // document.querySelector('.artistInfo').style.display = "none"
                // document.querySelector('#paraParent').style.display = "none"
                window.location.reload(true);
              })
            })


          })
          .catch(err => {
            console.log(`error ${err}`)
            alert("Sorry, nothing came back")
          })

      } else if (http.readyState === XMLHttpRequest.DONE && http.status !== 200) {
        //
      }

    };
    http.send();

  };

  this.showAlbums = function (obj) {
    const container = document.querySelector('#albumListContainer');
    let template = '';

    if (obj.results.length > 0) {
      document.querySelector('#notMatch').style.display = 'none';

      for (var i = 0; i < obj.results.length; i++) {
        template += `<div class="col-sm-3 albumItem">`;
        template += `<div class="itemThmb" style="background:url(${obj.results[i].artworkUrl100})"></div>`;
        template += `<div class="itemTitle">${obj.results[i].collectionName}</div>`;
        template += `<div class="itemPrice"><span>Price: </span>'${obj.results[i].collectionPrice} 'USD </div>`;
        template += `<a href="${obj.results[i].collectionViewUrl}" target="_blank">Buy now</a>`;
        template += `</div>`;
      }

      container.innerHTML = '';
      container.insertAdjacentHTML('afterbegin', template);
    } else {
      document.querySelectorAll('#notMatch').style.display = 'block';
    }
  };

  this.init();
})();
