/////////////////////////////////////////////////////////////////////////// autorize code input
const inputs = document.querySelectorAll('.linked-input')

inputs.forEach((input, index) => {
    input.addEventListener('input', e => {
        if (e.target.value) {
            if (index < inputs.length - 1) {
                inputs[index + 1].focus()
            }
        }

        document.querySelector('#sms-code-input').value = inputs[0].value + inputs[1].value + inputs[2].value + inputs[3].value + inputs[4].value
    })
})


/////////////////////////////////////////////////////////////////////////// resend
const resendBtn = document.querySelector('#resend-btn')
const resendBtnNumber = document.querySelector('#resend-btn span')
const resendBtnFa = document.querySelector('#resend-btn-fa')
const resendBtnNumberFa = document.querySelector('#resend-btn-fa span')

let count = 60

if (resendBtnNumber) resendBtnNumber.innerHTML = `(${count})`
if (resendBtnNumberFa) resendBtnNumberFa.innerHTML = `(${count})`

function resendTimer() {
    const interval = setInterval(() => {
        count--
        if (resendBtnNumber) resendBtnNumber.innerHTML = `(${count})`
        if (resendBtnNumberFa) resendBtnNumberFa.innerHTML = `(${count})`

        if (count === 0) {
            if (resendBtn) resendBtn.removeAttribute('disabled')
            if (resendBtn) resendBtn.style.paddingRight = '1.5rem'
            if (resendBtnNumber) resendBtnNumber.innerHTML = ''

            if (resendBtnFa) resendBtnFa.removeAttribute('disabled')
            if (resendBtnFa) resendBtnFa.style.paddingLeft = '1.5rem'
            if (resendBtnNumberFa) resendBtnNumberFa.innerHTML = ''

            clearInterval(interval)
        }
    }, 1000)
}

resendTimer()