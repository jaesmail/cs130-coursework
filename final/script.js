$.ajax({
    url: 'https://readwise.io/api/v2/books/',
    type: 'GET',
    contentType: 'application/json',
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', 'Token VkaKFxRJKtZaAsJur8qfw7c72pOiAJKXUkQ4SAt80kqIgKbsgo');
    },
    data: {"page_size": 500, "category": "articles"},
    success: function (result) {
      console.log(result.count)
    },
    error: function (error) {
      console.log(error)
    },
  });