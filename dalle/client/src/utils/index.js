// this is a file where you can create function which would be reused

import { surpriseMePrompts } from '../constants'
import FIleSaver from 'file-saver'
import FileSaver from 'file-saver'
export function getRandomPrompt(prompt) {
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length)
    const retrived = surpriseMePrompts[randomIndex]
    if (retrived === prompt) {
        return getRandomPrompt(prompt)
    }
    return retrived
}

export async function downloadImage(_id, photo) {
    FileSaver.saveAs(photo, `download-${_id}.jpg`)
}