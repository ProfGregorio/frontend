		<script type="text/javascript">
			function trocarImg(){
				let slider = document.getElementById("navegacao-slider");
				let slideshow = document.getElementById("slideshow");
				console.log("slider",slider);
				//document.getElementById('navegacao-slider').children.length
				slideshow.children.classList.add("esconde");

				for (var i =0; i<=slideshow.children.length; i++) {
						if(slideshow.children[i].classList.contains("esconde")){
								//alert("TESTE",[i]);
								slideshow.children[i].className = 'exibe';
								slideshow.children[i].classList.add("exibe");
								slideshow.children[i].classList.add("exibe");
						}
				}
				
				console.log("TESTE",slider.classList.contains("foo"));
				//if(element.hasClass('class-name');)

				//$(slider." a").removeClass("esconde");

			}
		</script>