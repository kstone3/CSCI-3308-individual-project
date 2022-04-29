function search(){
    var title = document.getElementById("formTitle").value;
    let parent = document.getElementById("cards");
    var url =`https://api.tvmaze.com/search/shows?q=${title}`;
    $.ajax({url:url, dataType:"json"}).then(data => {
            let title = document.createElement('h4');
            title.id = 'title';
            if(data[0].show.name == null || data[0].show.name == 'undefined'){
                title.innerText = '-';
            }
            else{
                title.innerText = data[0].show.name;
            }
            title.className = 'card-title';

            let img = document.createElement('img');
            if(data[0].show.image.medium == null || data[0].show.image.medium == 'undefined'){
                img.src = '-';
            }
            else{
                img.src = data[0].show.image.medium;
            }
            img.id = 'img';

            let runtime = document.createElement('p');
            if(data[0].show.runtime === null || data[0].show.runtime === 'undefined'){
                runtime.innerText = 'Runtime: - minutes';
            }
            else{
                runtime.innerText = 'Runtime: ' + data[0].show.runtime + ' minutes';
            }
            runtime.id = 'runtime';

            let link = document.createElement('a');
            if(data[0].show.url == null || data[0].show.url == 'undefined'){
                link.innerText = "Link unavailable";
                link.href = "";
            }
            else{
                link.innerText = "Link: " + data[0].show.url;
                link.href = data[0].show.url;
            }
            link.id = 'link';

            let language = document.createElement('p');
            if(data[0].show.language == null || data[0].show.language == 'undefined'){
                language.innerText = "Language: -";
            }
            else{
                language.innerText = "Language: " + data[0].show.language;
            }
            language.id = 'language';

            parent.appendChild(title);
            parent.appendChild(img);
            parent.appendChild(runtime);
            parent.appendChild(link);
            parent.appendChild(language);
            parent.className = 'card-body d-flex flex-column align-items-center shadow border';
    })
}

function clearPage(){
    let parent = document.getElementById("cards");
    while(parent.firstChild){
      parent.removeChild(parent.firstChild);
    }
}

function send(){
    var my_data={
        title:document.getElementById('title').innerText,
        img:document.getElementById('img').src,
        language: document.getElementById('language').innerText,
        runtime: document.getElementById('runtime').innerText,
        link: document.getElementById('link').href
    };
    var url = "" + window.location.protocol + "//" + window.location.host + "/send";
    $.ajax({
        type: "POST",
        url: url,
        data: my_data,
        success: function() {
            console.log("here");
            window.alert('Success, the data has been added to the database');
        },
        error: function(jqXHR, textStatus, err) {
            alert('text status '+textStatus+', err '+err);
        }
    });
}