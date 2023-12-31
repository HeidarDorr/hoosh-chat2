//////////////////////////////////////////////////////////////////////// input
const input = document.querySelector('#input')

input.addEventListener('keydown', e => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        document.querySelector('#submit-btn').click()
    }
})


//////////////////////////////////////////////////////////////////////// examples box
document.querySelectorAll('#examples-box button').forEach(btn => {
    btn.addEventListener('click', () => {
        input.value = btn.innerHTML.trim().slice(0, -2)
        chatHandler()
    })
})


//////////////////////////////////////////////////////////////////////// new-continue box & regenerate btn
document.querySelector('#continue-btn').addEventListener('click', () => {
    document.querySelector('#new-continue-box').style.bottom = '-100px'
    setTimeout(() => {
        document.querySelector('#input-container').style.bottom = '0px'
        document.querySelector('#regenerate-btn').style.display = 'block'
        document.querySelector('#regenerate-btn').onclick = regenerateBtn
        setTimeout(() => {
            document.querySelector('#regenerate-btn').style.top = '-1.75rem'
        }, 0)
    }, 200)
})

let inputValue

document.querySelector('#regenerate-btn').onclick = regenerateBtn

function regenerateBtn() {
    input.value = inputValue
    chatHandler()

    document.querySelector('#regenerate-btn').onclick = ''
}


//////////////////////////////////////////////////////////////////////// chat process
document.querySelector('#form').addEventListener('submit', e => {
    e.preventDefault()

    if (input.value) chatHandler()
})

export function chatHandler() {
    document.querySelector('#submit-icon').style.display = 'none'
    document.querySelector('#waiting-circles').style.display = 'flex'
    document.querySelector('#submit-btn').setAttribute('disabled', 'true')

    document.querySelector('#chat').insertAdjacentHTML('beforeend', `
    <div
        class=" w-full border-b border-black/10 dark:border-gray-900/50 text-gray-800 dark:text-gray-100 group dark:bg-[var(--dark-bg-color)] ">
        <div
            class=" text-base gap-4 md:gap-6 m-auto md:max-w-2xl lg:max-w-2xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0">
            <div class="w-[30px] flex flex-col relative items-end">
                <div class=" relative h-[30px] w-[30px] p-1 rounded-sm text-white flex items-center justify-center "
                    style="background-color: rgb(16, 163, 127)">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                        fill="currentColor">
                        <title>account-badge</title>
                        <path
                            d="M14 19.5C14 17.5 15.1 15.7 16.7 14.8C15.4 14.3 13.8 14 12 14C7.6 14 4 15.8 4 18V20H14V19.5M19.5 16C17.6 16 16 17.6 16 19.5S17.6 23 19.5 23 23 21.4 23 19.5 21.4 16 19.5 16M16 8C16 10.2 14.2 12 12 12S8 10.2 8 8 9.8 4 12 4 16 5.8 16 8Z" />
                    </svg>
                </div>
            </div>
            <div
                class=" relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)] ">
                <div class="flex flex-grow flex-col gap-3">
                    <div class=" min-h-[20px] flex flex-col items-start gap-4">
                        ${input.value}
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!-- chatgpt comment -->
    <div
        class=" w-full border-b border-black/10 dark:border-gray-900/50 text-gray-800 dark:text-gray-100 group bg-[rgb(247,247,248)] dark:bg-[#444654] ">
        <div
            class=" text-base gap-4 md:gap-6 m-auto md:max-w-2xl lg:max-w-2xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0 ">
            <div class="w-[30px] flex flex-col relative items-end">
                <div class=" relative h-[30px] w-[30px] p-1 rounded-sm text-white flex items-center justify-center "
                    style="background-color: rgb(16, 163, 127)">
                    <svg width="41" height="41" viewBox="0 0 41 41" fill="none"
                        xmlns="http://www.w3.org/2000/svg" stroke-width="1.5"
                        class="h-6 w-6">
                        <path
                            d="M37.5324 16.8707C37.9808 15.5241 38.1363 14.0974 37.9886 12.6859C37.8409 11.2744 37.3934 9.91076 36.676 8.68622C35.6126 6.83404 33.9882 5.3676 32.0373 4.4985C30.0864 3.62941 27.9098 3.40259 25.8215 3.85078C24.8796 2.7893 23.7219 1.94125 22.4257 1.36341C21.1295 0.785575 19.7249 0.491269 18.3058 0.500197C16.1708 0.495044 14.0893 1.16803 12.3614 2.42214C10.6335 3.67624 9.34853 5.44666 8.6917 7.47815C7.30085 7.76286 5.98686 8.3414 4.8377 9.17505C3.68854 10.0087 2.73073 11.0782 2.02839 12.312C0.956464 14.1591 0.498905 16.2988 0.721698 18.4228C0.944492 20.5467 1.83612 22.5449 3.268 24.1293C2.81966 25.4759 2.66413 26.9026 2.81182 28.3141C2.95951 29.7256 3.40701 31.0892 4.12437 32.3138C5.18791 34.1659 6.8123 35.6322 8.76321 36.5013C10.7141 37.3704 12.8907 37.5973 14.9789 37.1492C15.9208 38.2107 17.0786 39.0587 18.3747 39.6366C19.6709 40.2144 21.0755 40.5087 22.4946 40.4998C24.6307 40.5054 26.7133 39.8321 28.4418 38.5772C30.1704 37.3223 31.4556 35.5506 32.1119 33.5179C33.5027 33.2332 34.8167 32.6547 35.9659 31.821C37.115 30.9874 38.0728 29.9178 38.7752 28.684C39.8458 26.8371 40.3023 24.6979 40.0789 22.5748C39.8556 20.4517 38.9639 18.4544 37.5324 16.8707ZM22.4978 37.8849C20.7443 37.8874 19.0459 37.2733 17.6994 36.1501C17.7601 36.117 17.8666 36.0586 17.936 36.0161L25.9004 31.4156C26.1003 31.3019 26.2663 31.137 26.3813 30.9378C26.4964 30.7386 26.5563 30.5124 26.5549 30.2825V19.0542L29.9213 20.998C29.9389 21.0068 29.9541 21.0198 29.9656 21.0359C29.977 21.052 29.9842 21.0707 29.9867 21.0902V30.3889C29.9842 32.375 29.1946 34.2791 27.7909 35.6841C26.3872 37.0892 24.4838 37.8806 22.4978 37.8849ZM6.39227 31.0064C5.51397 29.4888 5.19742 27.7107 5.49804 25.9832C5.55718 26.0187 5.66048 26.0818 5.73461 26.1244L13.699 30.7248C13.8975 30.8408 14.1233 30.902 14.3532 30.902C14.583 30.902 14.8088 30.8408 15.0073 30.7248L24.731 25.1103V28.9979C24.7321 29.0177 24.7283 29.0376 24.7199 29.0556C24.7115 29.0736 24.6988 29.0893 24.6829 29.1012L16.6317 33.7497C14.9096 34.7416 12.8643 35.0097 10.9447 34.4954C9.02506 33.9811 7.38785 32.7263 6.39227 31.0064ZM4.29707 13.6194C5.17156 12.0998 6.55279 10.9364 8.19885 10.3327C8.19885 10.4013 8.19491 10.5228 8.19491 10.6071V19.808C8.19351 20.0378 8.25334 20.2638 8.36823 20.4629C8.48312 20.6619 8.64893 20.8267 8.84863 20.9404L18.5723 26.5542L15.206 28.4979C15.1894 28.5089 15.1703 28.5155 15.1505 28.5173C15.1307 28.5191 15.1107 28.516 15.0924 28.5082L7.04046 23.8557C5.32135 22.8601 4.06716 21.2235 3.55289 19.3046C3.03862 17.3858 3.30624 15.3413 4.29707 13.6194ZM31.955 20.0556L22.2312 14.4411L25.5976 12.4981C25.6142 12.4872 25.6333 12.4805 25.6531 12.4787C25.6729 12.4769 25.6928 12.4801 25.7111 12.4879L33.7631 17.1364C34.9967 17.849 36.0017 18.8982 36.6606 20.1613C37.3194 21.4244 37.6047 22.849 37.4832 24.2684C37.3617 25.6878 36.8382 27.0432 35.9743 28.1759C35.1103 29.3086 33.9415 30.1717 32.6047 30.6641C32.6047 30.5947 32.6047 30.4733 32.6047 30.3889V21.188C32.6066 20.9586 32.5474 20.7328 32.4332 20.5338C32.319 20.3348 32.154 20.1698 31.955 20.0556ZM35.3055 15.0128C35.2464 14.9765 35.1431 14.9142 35.069 14.8717L27.1045 10.2712C26.906 10.1554 26.6803 10.0943 26.4504 10.0943C26.2206 10.0943 25.9948 10.1554 25.7963 10.2712L16.0726 15.8858V11.9982C16.0715 11.9783 16.0753 11.9585 16.0837 11.9405C16.0921 11.9225 16.1048 11.9068 16.1207 11.8949L24.1719 7.25025C25.4053 6.53903 26.8158 6.19376 28.2383 6.25482C29.6608 6.31589 31.0364 6.78077 32.2044 7.59508C33.3723 8.40939 34.2842 9.53945 34.8334 10.8531C35.3826 12.1667 35.5464 13.6095 35.3055 15.0128ZM14.2424 21.9419L10.8752 19.9981C10.8576 19.9893 10.8423 19.9763 10.8309 19.9602C10.8195 19.9441 10.8122 19.9254 10.8098 19.9058V10.6071C10.8107 9.18295 11.2173 7.78848 11.9819 6.58696C12.7466 5.38544 13.8377 4.42659 15.1275 3.82264C16.4173 3.21869 17.8524 2.99464 19.2649 3.1767C20.6775 3.35876 22.0089 3.93941 23.1034 4.85067C23.0427 4.88379 22.937 4.94215 22.8668 4.98473L14.9024 9.58517C14.7025 9.69878 14.5366 9.86356 14.4215 10.0626C14.3065 10.2616 14.2466 10.4877 14.2479 10.7175L14.2424 21.9419ZM16.071 17.9991L20.4018 15.4978L24.7325 17.9975V22.9985L20.4018 25.4983L16.071 22.9985V17.9991Z"
                            fill="currentColor">
                        </path>
                    </svg>
                </div>
            </div>
            <div
                class=" relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
                <div class="flex flex-grow flex-col gap-3">
                    <div class=" min-h-[20px] flex flex-col items-start gap-4">
                        <div class="gpt-comment w-full break-words">
                            <i class="text-loading-circle initial-text-loading-circle inline-block w-3 h-3 rounded-full bg-gray-500 dark:bg-gray-100 transition duration-300"></i>

                        </div>
                    </div>
                </div>
                <div class="flex justify-between pb-7">
                    <div
                        class=" text-gray-400 flex mt-2 gap-1 absolute right-0 bottom-0">
                        <button title="Copy code"
                            class="copy-btn hidden ml-auto gap-2 items-center rounded-md p-1 text-xs dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400 hover:bg-gray-200 hover:text-gray-700">
                            <svg stroke="currentColor" fill="none" stroke-width="2"
                                viewBox="0 0 24 24" stroke-linecap="round"
                                stroke-linejoin="round" class="icon-sm" height="1rem"
                                width="1rem" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2">
                                </path>
                                <rect x="8" y="2" width="8" height="4" rx="1" ry="1">
                                </rect>
                            </svg>
                        </button>
                        <span style="display: none;"
                            class="absolute right-[.6rem] bottom-[1.55rem]">
                            <i
                                class="absolute left-[-10px] w-[6px] h-[13px] rotate-[225deg] translate-x-[5px] -translate-y-[-4px] border-l border-t border-l-gray-600 border-t-gray-600 dark:border-l-gray-100 dark:border-t-gray-100"></i>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `)

    document.querySelector('#guide-box').style.display = 'none'
    inputValue = input.value
    input.value = ''

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// این قسمت باید داینامیک شود
    // setTimeout(() => {
    //     chatgptResponse = "Here's a simple way to generate a random string using JavaScript:\n\n```javascript\nfunction generateRandomString(length) {\n let result = '';\n const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';\n \n for (let i = 0; i < length; i++) {\n result += characters.charAt(Math.floor(Math.random() * characters.length));\n }\n \n return result;\n}\n\n// Example usage\nconst randomString = generateRandomString(10);\nconsole.log(randomString);\n```\n\nIn the code above, we created a function `generateRandomString` that takes a `length` parameter specifying the desired length of the random string.\n\nWe defined a string of characters that will be used to generate the random string. In this example, we used a combination of uppercase and lowercase letters along with numbers.\n\nWe then looped `length` number of times, each time appending a randomly selected character from the `characters` string to the `result` string.\n\nFinally, we returned the generated random string. The example usage demonstrates:\n\n```javascript\nfunction generateRandomString(length) {\n let result = '';}\n```\n\n10 and printing it to generating a random string of length the console."
    //     // chatgptResponse = "Here's a simple way to generate a random string using JavaScript:\n\njavascript\nfunction generateRandomString(length) {\n let result = '';\n const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';\n \n for (let i = 0; i < length; i++) {\n result += characters.charAt(Math.floor(Math.random() * characters.length));\n }\n \n return result;\n}\n\n// Example usage\nconst randomString = generateRandomString(10);\nconsole.log(randomString);\n\nIn the code above, we created a function `generateRandomString` that takes a `length` parameter specifying the desired length of the random string.\n\nWe defined a string of characters that will be used to generate the random string. In this example, we used a combination of uppercase and lowercase letters along with numbers.\n\nWe then looped `length` number of times, each time appending a randomly selected character from the `characters` string to the `result` string.\n\nFinally, we returned the generated random string. The example usage demonstrates generating a random string of length 10 and printing it to the console."

    //     gptComment()
    // }, 2000) // زمان انتظار دریافت پاسخ از ای پی آی
}
let chatgptResponse
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////// display chatgpt comment
let words
const parts = []

export function gptComment(chatgptResponse) {
    if (!chatgptResponse.match(/```[^`]*```([\s\S]*?)(?=\s|$)/)) {
        parts.push(chatgptResponse)
        animationHandler()
    }
    else { // if there is code zone in response
        const codeZone = chatgptResponse.match(/```[^`]*```([\s\S]*?)(?=\s|$)/)[0]
        const before = chatgptResponse.split(codeZone)[0]
        const after = chatgptResponse.split(codeZone)[1]
        parts.push(before, codeZone, after)

        partsHandler(after)

        function partsHandler(lastPart) {
            if (lastPart.match(/```[^`]*```([\s\S]*?)(?=\s|$)/)) {
                parts.pop()

                const codeZone = lastPart.match(/```[^`]*```([\s\S]*?)(?=\s|$)/)[0]
                const before = lastPart.split(codeZone)[0]
                const after = lastPart.split(codeZone)[1]
                parts.push(before, codeZone, after)

                partsHandler(after)
            } else {
                animationHandler()
            }
        }
    }
}


/////////////////////////////// animation handler
let partIndex = 0

function animationHandler() {
    document.querySelector('#input-container').style.bottom = '-100px'
    document.querySelector('#regenerate-btn').style.top = '100px'
    document.querySelectorAll('.initial-text-loading-circle')[document.querySelectorAll('.initial-text-loading-circle').length - 1].style.display = 'none'

    if (partIndex === parts.length) {
        document.querySelectorAll('.copy-btn')[document.querySelectorAll('.copy-btn').length - 1].style.display = 'flex'
        document.querySelector('#new-continue-box').style.bottom = '0'

        document.querySelector('#submit-icon').style.display = 'block'
        document.querySelector('#waiting-circles').style.display = 'none'
        document.querySelector('#submit-btn').removeAttribute('disabled')

        return
    }

    let regex = /^```/

    if (!regex.test(parts[partIndex])) {
        pTagMaker(parts[partIndex])
    } else {
        codeZoneHandler(parts[partIndex])
    }

    partIndex++
}


///////////////////////////////////////
function pTagMaker(text) {
    const pTag = document.createElement('p')
    const waitingCircle = document.createElement('i')

    pTag.className = 'inline'
    waitingCircle.className = 'text-loading-circle inline-block w-3 h-3 rounded-full bg-gray-500 dark:bg-gray-100 transition duration-300'

    document.querySelectorAll('.gpt-comment')[document.querySelectorAll('.gpt-comment').length - 1].insertAdjacentElement('beforeend', pTag)
    document.querySelectorAll('.gpt-comment')[document.querySelectorAll('.gpt-comment').length - 1].insertAdjacentElement('beforeend', waitingCircle)

    const strongRegex = /`([^`]+)`/g
    const textWithStrong = text.replace(strongRegex, (strongText) => {
        return '<strong>' + strongText + '</strong>'
    })

    const textWithLineBreaks = textWithStrong.replace(/\n/g, '<br>')

    words = textWithLineBreaks.split(' ')

    typeAnimation(pTag, waitingCircle, words)
}


////////////////////////////////////////
let modifiedText

function codeZoneHandler(text) {
    const codeZone = text
    const codeZone2 = codeZone.split('\n')
    const codeZoneLanguage = codeZone2[0].split('```')[1]
    codeZone2.shift()
    codeZone2.pop()
    const codeZone3 = codeZone2.join('\n')

    const preTag = document.createElement('pre')

    const divTag = document.createElement('div')
    divTag.className = 'bg-black rounded-md flex flex-col overflow-hidden'
    divTag.innerHTML = `
    <div class="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans justify-between rounded-t-md">
        <span>${codeZoneLanguage}</span>
    </div>
    `

    const buttonTag = document.createElement('button')
    buttonTag.className = 'copy-code-btn flex ml-auto gap-2 items-center'
    buttonTag.innerHTML = `
    <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="icon-sm" height="1rem" width="1rem" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
    </svg>
    <span>Copy code</span>
    `
    buttonTag.addEventListener('click', () => {
        navigator.clipboard.writeText(codeZone3)
    })

    const spanTag = document.createElement('span')
    spanTag.style.display = 'none'
    spanTag.className = 'copied relative'
    spanTag.innerHTML = 'Copied!'

    const codeTag = document.createElement('code')
    codeTag.className = 'hljs !px-3'

    const pTag = document.createElement('p')
    pTag.className = 'inline'

    const waitingCircle = document.createElement('i')
    waitingCircle.className = 'text-loading-circle inline-block w-3 h-3 ml-1 rounded-full bg-gray-500 dark:bg-gray-100 transition duration-300'

    codeTag.append(pTag)
    codeTag.append(waitingCircle)
    divTag.firstElementChild.append(buttonTag)
    divTag.firstElementChild.append(spanTag)
    divTag.append(codeTag)
    preTag.append(divTag)

    const words = codeZone3.split(' ')

    document.querySelectorAll('.gpt-comment')[document.querySelectorAll('.gpt-comment').length - 1].insertAdjacentElement('beforeend', preTag)

    typeAnimation(pTag, waitingCircle, words)
}


/////////////////////////////// type animation
let currentIndex = 0

function typeAnimation(element, waitingCircle, words) {
    copyBtnsHandler()

    displayText()

    function displayText() {
        if (currentIndex < words.length) {
            element.innerHTML += words[currentIndex] + ' '

            currentIndex++

            setTimeout(displayText, Math.random() * 100)
        } else {
            // waitingCircle.style.transform = 'scale(0)'
            // setTimeout(() => {
            waitingCircle.style.display = 'none'
            // }, 300)

            currentIndex = 0

            hljs.highlightAll()

            animationHandler()
        }
    }
}

function copyBtnsHandler() {
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.onclick = () => {
            navigator.clipboard.writeText(chatgptResponse)

            btn.style.display = 'none'
            btn.nextElementSibling.style.display = 'inline'

            setTimeout(() => {
                btn.style.display = 'flex'
                btn.nextElementSibling.style.display = 'none'
            }, 2000)
        }
    })
    document.querySelectorAll('.copy-code-btn').forEach(btn => {
        btn.onclick = () => {
            btn.style.display = 'none'
            btn.nextElementSibling.style.display = 'inline'

            setTimeout(() => {
                btn.style.display = 'flex'
                btn.nextElementSibling.style.display = 'none'
            }, 2000)
        }
    })
}