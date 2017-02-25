$ ->
  $("#slider").slider
    max:12,
    min: 1,
    value: 1,
    step: 1,
    change: ( event, ui ) ->
      selected_month = $(this).slider('value')
      $('#slidervalue').html selected_month + '月'
      $.ajax
        async:     true
        type:      "GET"
        url:       "/get_data"
        data: "month=" + selected_month
        success: (data, status, xhr) ->
          console.log 'success'
        failed: (xhr,  status, error) ->
          console.log 'failed'
