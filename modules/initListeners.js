import { postComment } from './api.js'
import { comments, updateComments } from './comments.js'
import { sanitizeHtml } from './sanitizeHtml.js'

export const initLikeListeners = (renderComments) => {
    const likeButtons = document.querySelectorAll('.like-button')

    for (const likeButton of likeButtons) {
        likeButton.addEventListener('click', (event) => {
            event.stopPropagation()

            const index = likeButton.dataset.index
            const comment = comments[index]

            comment.likes = comment.isliked
                ? comment.likes - 1
                : comment.likes + 1

            comment.isliked = !comment.isliked

            renderComments()
        })
    }
}

export const initReplyListeners = () => {
    const commentsElements = document.querySelectorAll('.comment')
    const text = document.getElementById('text-input')

    for (const commentElement of commentsElements) {
        commentElement.addEventListener('click', () => {
            const currentComment = comments[commentElement.dataset.index]
            text.value = `${currentComment.name}: ${currentComment.text}`
        })
    }
}

export const initAddCommentListener = (renderComments) => {
    const name = document.getElementById('name-input')
    const text = document.getElementById('text-input')
    const addButton = document.querySelector('.add-form-button')

    addButton.addEventListener('click', () => {
        if (!name.value || !text.value) {
            console.error('Заполните форму')
            return
        }

        document.querySelector('.form-loading').style.display = 'block'
        document.querySelector('.add-form').style.display = 'none'

        postComment(sanitizeHtml(text.value), sanitizeHtml(name.value)).then
        ((data) => {
        document.querySelector('.form-loading').style.display = 'none'
        document.querySelector('.add-form').style.display = 'flex'

            updateComments(data)
           renderComments() 
        name.value = ''
        text.value = ''
        }).catch((error) => {
        document.querySelector('.form-loading').style.display = 'none'
        document.querySelector('.add-form').style.display = 'flex'

        if (error.massage === "Неверный запрос")Х
        alert('Имя и комментарий должны содержать более 3х символов')
        })
    })
}
