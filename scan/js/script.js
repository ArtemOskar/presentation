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