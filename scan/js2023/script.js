document.addEventListener('click', clickAction)

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
   
let subMenuBtnClose = document.querySelector('.sub-menu-btn-close')

function clickAction(event) {
   const targetClick = event.target

   
   if (targetClick.closest('.link-sub-menu') && body.classList.contains('touch') || targetClick.closest('.sub-menu-btn-close')) {
      subMenuBtnClose.classList.remove('visible')
      document.querySelectorAll('.link-sub-menu').forEach(e => {
         if (e.closest('.visible') && body.classList.contains('touch')) {
            e.classList.remove('visible')
         } 
      })

      document.querySelectorAll('.sub-menu').forEach(e => {
         if (e.closest('.visible') && body.classList.contains('touch')) {
            e.classList.remove('visible')
         } 
      })
   }
   
   if (targetClick.closest('.link-sub-menu') && body.classList.contains('touch')) {
      targetClick.parentElement.classList.add('visible')
      subMenuBtnClose.classList.add('visible')

      document.querySelectorAll('.sub-menu').forEach(e => {
         if (e.parentElement.closest('.visible') && body.classList.contains('touch')) {
            e.classList.add('visible')
         } 
      })
   } 
}


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
      subMenuDesignList.classList.remove('visible')
      subMenuDesignBtn.classList.remove('visible')
      subMenuTravelList.classList.remove('visible')
      subMenuTravelBtn.classList.remove('visible')
   } else if (scrollPosition() < lastScroll && containHide()) {
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

