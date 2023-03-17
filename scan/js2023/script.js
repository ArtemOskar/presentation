document.addEventListener('click', clickAction)

let subMenuTravelList = document.querySelector('.travel-menu-list')
let subMenuDesignList = document.querySelector('.design-menu-list')

function clickAction(event) {
   const targetClick = event.target

   if (targetClick.closest('.travel-menu-item') && body.classList.contains('touch')) {
      body.classList.add('lock')
      subMenuTravelList.classList.add('visible')
   } else {
      subMenuTravelList.classList.remove('visible')
   }

   if (targetClick.closest('.design-menu-item') && body.classList.contains('touch')) {
      body.classList.add('lock')
      subMenuDesignList.classList.add('visible')
   } else {
      subMenuDesignList.classList.remove('visible')
   }

   if (targetClick.closest('.travel-menu-list__btn-close') && body.classList.contains('touch')) {
      body.classList.remove('lock')
      subMenuTravelList.classList.remove('visible')
   } else if (targetClick.closest('.design-menu-list__btn-close') && body.classList.contains('touch')) {
      body.classList.remove('lock')
      subMenuDesignList.classList.remove('visible')
   }

}


// sub-menu
let isMobile = {
	Android: function() {return navigator.userAgent.match(/Android/i);},
	BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},
	iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},
	Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},
	Windows: function() {return navigator.userAgent.match(/IEMobile/i);},
	any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}
}
let body = document.querySelector('body')
if (isMobile.any())
   body.classList.add('touch')
else 
   body.classList.add('mouse')


// header-animation
let lastScroll = 0
const defaultOffset = 110
const header = document.querySelector('.header-r')
const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop
const containHide = () => header.classList.contains('hide')
window.addEventListener('scroll', () => {

   if (scrollPosition() > lastScroll && !containHide() && scrollPosition() > defaultOffset) {
      header.classList.add('hide')
      header.style.boxShadow = 'none'
   }
   else if (scrollPosition() < lastScroll && containHide()) {
      header.classList.remove('hide')
      header.style.boxShadow = '1px 2px 7px rgba(0, 0, 0, 0.2)'
   } else if (scrollPosition() < 10) {
      header.style.boxShadow = 'none'
   }
   lastScroll = scrollPosition()
})



// validation form and submit email
const subscribeForm = document.getElementById('subscribeForm')
subscribeForm.addEventListener('submit', formSend)

async function formSend(e) {
   e.preventDefault()
   let error = formValidate(subscribeForm)


   if (error === 0) {
      
      // The form has been validated.
      // This should be the send code.

   }

}

function formValidate(subscribeForm) {
   let error = 0
   let formRequired = document.querySelectorAll('.required')

   for (let index = 0; index < formRequired.length; index++) {
      const input = formRequired[index]
      formRemoveError(input)

      if (input.classList.contains('form-subscribe__input-email')) {
         if (emailTest(input)) {
            formAddError(input)
            error++
         }
      } else if (input.classList.contains('form-subscribe__input-check') && input.checked === false) {
         formAddError(input)
         error++
      } else {
         if (input.value === '') {
            formAddError(input)
            error++
         }
      }
   }

   return error
}
function formAddError(input) {
   input.parentElement.classList.add('error')
   input.classList.add('error')
}
function formRemoveError(input) {
   input.parentElement.classList.remove('error')
   input.classList.remove('error')
}
function emailTest(input) {
   return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value)
}

