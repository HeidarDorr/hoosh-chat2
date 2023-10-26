////////////////////////////////////////////////////////////////////// Dark / Light theme
function changeTheme() {
    document.body.classList.toggle('dark')
}

document.querySelector('#theme-btn').addEventListener('click', changeTheme)


////////////////////////////////////////////////////////////////////// Copy to clipboard btn
document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.style.display = 'none'
        btn.nextElementSibling.style.display = 'inline'

        setTimeout(() => {
            btn.style.display = 'flex'
            btn.nextElementSibling.style.display = 'none'
        }, 2000)
    })
})

// (in Code Box)
document.querySelectorAll('.copy-code-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.style.display = 'none'
        btn.nextElementSibling.style.display = 'inline'

        setTimeout(() => {
            btn.style.display = 'flex'
            btn.nextElementSibling.style.display = 'none'
        }, 2000)
    })
})


////////////////////////////////////////////////////////////////////// sidebar on mobile
// open
document.querySelector('#open-sidebar-btn').addEventListener('click', () => {
    document.querySelector('#overlay').style.display = 'block'
    document.querySelector('#close-sidebar-btn').style.display = 'block'

    setTimeout(() => {
        document.querySelector('#overlay').style.opacity = '1'
        document.querySelector('#sidebar').style.transform = 'translateX(0)'
        document.querySelector('#close-sidebar-btn').style.opacity = '1'
    }, 0)

    window.onclick = e => {
        if (!document.querySelector('#sidebar').contains(e.target) && !document.querySelector('#open-sidebar-btn').contains(e.target) && window.innerWidth <= 768) {
            closeSidebar()
        }
    }
})

// close
function closeSidebar() {
    document.querySelector('#overlay').style.opacity = '0'
    document.querySelector('#sidebar').style.transform = 'translateX(-100%)'
    document.querySelector('#close-sidebar-btn').style.opacity = '0'

    setTimeout(() => {
        document.querySelector('#overlay').style.display = 'none'
        document.querySelector('#close-sidebar-btn').style.display = 'none'
    }, 300)
}

document.querySelector('#close-sidebar-btn').addEventListener('click', closeSidebar)

window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) document.querySelector('#sidebar').style.transform = 'translateX(0)'
    else document.querySelector('#sidebar').style.transform = 'translateX(-100%)'
})


////////////////////////////////////////////////////////////////////// advertise modal
let timer = 5

export function showModal() {
    const modal = document.getElementById('modal')
    modal.classList.remove('hidden')

    rewardTimer()
}

function rewardTimer() {
    document.querySelector('#reward-timer').innerText = `Reward in ${timer} seconds`
    const interVal = setInterval(() => {
        timer--
        document.querySelector('#reward-timer').innerText = `Reward in ${timer} seconds`

        if (timer === 0) {
            clearInterval(interVal)
            document.querySelector('#reward-timer').style.opacity = '0'
            document.querySelector('#reward-btn').style.color = '#000'
            document.querySelector('#reward-btn').style.cursor = 'pointer'
            document.querySelector('#reward-btn').style.pointerEvents = 'unset'
        }
    }, 1000)
}

export function closeModal() {
    const modal = document.getElementById('modal')
    modal.classList.add('modal-leave')
    setTimeout(() => {
        modal.classList.add('hidden')
        modal.classList.remove('modal-leave')
    }, 150)
}


//////////////////////////////////////////////////////////////////////// preparing raw text for displaying into chat
export function chatContent(text) {
    let finalText

    if (!text.match(/```[^`]*```([\s\S]*?)(?=\s|$)/)) {
        const strongRegex = /`([^`]+)`/g
        const textWithStrong = text.replace(strongRegex, (strongText) => {
            return '<strong>' + strongText + '</strong>'
        })

        const textWithLineBreaks = textWithStrong.replace(/\n/g, '<br>')
        finalText = textWithLineBreaks
    }
    else { // if there is code zone in response
        let parts = []
        let partIndex = 0

        const codeZone = text.match(/```[^`]*```([\s\S]*?)(?=\s|$)/)[0]
        const before = text.split(codeZone)[0]
        const after = text.split(codeZone)[1]
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
                function partsHandler2() {
                    finalText += codeZoneHandler(parts[partIndex])

                    partIndex++
                    if (partIndex < parts.length) partsHandler2(parts[partIndex])
                }

                partsHandler2()
            }
        }
    }

    if (finalText.startsWith("undefined")) {
        finalText = finalText.replace("undefined", "");
    }

    return finalText
}

function codeZoneHandler(text) {
    let finalText
    let regex = /^```/

    if (!regex.test(text)) {
        const strongRegex = /`([^`]+)`/g
        const textWithStrong = text.replace(strongRegex, (strongText) => {
            return '<strong>' + strongText + '</strong>'
        })

        const textWithLineBreaks = textWithStrong.replace(/\n/g, '<br>')
        finalText = textWithLineBreaks

    } else { // code zone 
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
        codeTag.innerHTML = codeZone3

        divTag.firstElementChild.append(buttonTag)
        divTag.firstElementChild.append(spanTag)
        divTag.append(codeTag)
        preTag.append(divTag)

        const div2 = document.createElement('div')
        div2.append(preTag)

        finalText = div2.innerHTML
    }

    return finalText
}