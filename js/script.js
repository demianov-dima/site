$(function() {
	$('#customers_carousel').slick(
	{
        slide: 'li',
        slidesToShow: 4,	
		slidesToScroll: 4,
    	autoplay: true,
        autoplaySpeed: 5000,
		arrows: false,
	});
	
  $(".sent_button").click(function()
	{
      var Form = $(this).parent().parent();

/*             console.log('#'+Form.attr('id'));
      console.log(Form.find('.dd-selected-value').val()); */
    var Action = encodeURI(Form.find('.dd-selected-value').val());
    
    var formData = 'action=' + Action + '&' + Form.serialize();
    
    console.log(formData);
    $.ajax(
		{
			type: "POST",
			url: Form.attr('action'),
			data: formData,
				success: function(msg)
        {
					   $("#leave_order").modal('hide');   
             $('#thx_modal').find('.modal-body').html(msg);
					   $('#thx_modal').modal('show');
				},
				error: function()
				{
					alert("Sorry, we unable to send request. Please, try again later.");
				}
		}); 
		return false;
  }); 
  
/*   $('#side_order_form').submit(function()
  {
      //при отправке формы собираем все данные из полей и ИД страницы
      var action = jQuery("input#inputAction").val();
      var name = jQuery("input#inputName").val();
      var tel = jQuery("input#inputPhone").val();
      //складываем все данные в одну строку (наш URL для AJAX-запроса)
      var dataString = 'action='+ action + '&name=' + name + '&tel=' + tel;
      
      $.ajax(
      {
          type: "POST",
          url: "[[~22]]", //здесь указываем ИД ресурса, куда будет оправлен AJAX запрос
          data: dataString,
          success: function() //в случае успеха - выводим модальное окошко thx_modal
          { 
               $("#leave_order").modal('hide');    
               $('#thx_modal').modal('show');
          },
          error: function()
          {
               alert('Sorry, we unable to send your request');
          }
      });
    return false;
  }); */

	
	carouselNormalization();
	
	function carouselNormalization() 
	{
		var items = $('#carousel2 .carousel-inner .item'), //grab all slides
			heights = [], //create empty array to store height values
			tallest; //create variable to make note of the tallest slide

		if (items.length) 
		{
			function normalizeHeights() 
			{
				items.each(function() 
				{ //add heights to array
					heights.push($(this).height()); 
				});
				tallest = Math.max.apply(null, heights); //cache largest value
				items.each(function() 
				{
					$(this).css('min-height',tallest + 'px');
				});
			};
			normalizeHeights();

			$(window).on('resize orientationchange', function () 
			{
				tallest = 0, heights.length = 0; //reset vars
				items.each(function() 
				{
					$(this).css('min-height','0'); //reset min-height
				}); 
				normalizeHeights(); //run it again 
			});
		}	
	}
  
  $('#inputAction').ddslick(
  {
    width: 210,
    background: '#f4f4f4',

  });
  $('#inputActionModal').ddslick(
  {
    width: 249,
    background: '#f4f4f4',

  });
  
  
  $(".fancybox").fancybox(
  {
    fitToView   : false,
    autoSize    : true,
    maxWidth    : 640,
    maxHeight   : 480,
		openEffect  : 'none',
		closeEffect : 'none',
	});
    
  $('.accordion-body:has(.active)').addClass('in'); 

  
});