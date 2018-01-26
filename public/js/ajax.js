$("#form").submit(function(e){
    var urlInput = document.getElementById('input').value;
    $.post('/shorten',
    {
        long: urlInput
    },
    function(data,status){
        var url = document.getElementById("url");
		url.innerHTML = data;
    });
    e.preventDefault();
});