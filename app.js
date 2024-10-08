const notes = [
  {
    title: 'Заметка #1',
    completed: true,
  },
  {
    title: 'Заметка #2',
    completed: false,
  },
  {
    title: 'Заметка #3',
    completed: false,
  },
]

let currentIndex
let currentArray = notes

const notesList = document.querySelector('.notes-list')
const filterLabel = document.querySelector('.filter-label')
const filterList = document.querySelector('.filter-list')
const inputSearch = document.querySelector('.search-input')

function filterNotes() {
  // Отработка селекта
  filterLabel.addEventListener('click', () => {
    filterList.classList.toggle('filter-list--active')
  })

  filterList.addEventListener('click', (event) => {
    if (event.target.dataset) {
      filterLabel.dataset.type = event.target.dataset.type

      switch (filterLabel.dataset.type) {
        case 'all':
          filterLabel.firstElementChild.textContent = 'Все'
          render(notes)
          noNotes('У вас нет заметок')
          currentArray = notes
          break
        case 'complete':
          filterLabel.firstElementChild.textContent = 'Завершенные'
          const completedNotes = notes.filter((note) => note.completed === true)
          render(completedNotes)
          noNotes('Нет завершенных дел :`(')
          currentArray = completedNotes
          break
        case 'incomplete':
          filterLabel.firstElementChild.textContent = 'Незавершенные'
          const incompletedNotes = notes.filter((note) => note.completed === false)
          render(incompletedNotes)
          noNotes('Все дела сделаны ; )')
          currentArray = incompletedNotes
          break
      }
      filterList.classList.remove('filter-list--active')
    }
  })
}
filterNotes()

function searchNote() {
  inputSearch.addEventListener('input', (event) => {
    const value = event.target.value.toLowerCase()
    const findedNotes = currentArray.filter((note) => note.title.toLowerCase().includes(value))
    render(findedNotes)
    noNotes('Такой заметки нет!')
  })
}
searchNote()

function interactionWithNote() {
  notesList.addEventListener('click', (event) => {
    const target = event.target
    // Отработка checkbox
    if (target.classList.contains('checkbox')) {
      target.classList.toggle('checkbox--active')
      const index = +target.dataset.value
      notes[index].completed = !notes[index].completed
      render(notes)
    }
    // Удаление заметки
    if (target.classList.contains('delete-btn')) {
      const index = +target.dataset.value
      notes.splice(index, 1)
      render(notes)
    }
    noNotes('У вас нет заметок')
    // Редактирование заметки
    if (target.classList.contains('edit-btn')) {
      modalEdit.showModal()
      currentIndex = +target.dataset.value
    }
  })
}
interactionWithNote()

function noNotes(message) {
  if (notesList.innerHTML === '') {
    notesList.innerHTML = `
      <li class="empty-item">
        <img src="icons/empty.svg" alt="" aria-hidden="true">
        <span class="empty-text">${message}</span>
      </li>
    `
  }
}

function render(notesArray) {
  notesList.innerHTML = ''
  notesArray.forEach((note, i) => {
    notesList.insertAdjacentHTML('beforeend', toHTML(note, i))
  })
}
render(notes)

function toHTML(note, index) {
  return `
    <li>
      <div class="checkbox ${note.completed ? 'checkbox--active' : ''}" data-value="${index}"></div>
      <div class="note-title ${note.completed ? 'note-title--complete' : ''}">${note.title}</div>
      <button class="edit-btn" data-value="${index}" aria-label="редактировать">
        <svg width="21" height="20" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.67272 3.49106L1 10.1637V13.5H4.33636L11.0091 6.82736M7.67272 3.49106L10.0654 1.09837L10.0669 1.09695C10.3962 0.767585 10.5612 0.602613 10.7514 0.540824C10.9189 0.486392 11.0993 0.486392 11.2669 0.540824C11.4569 0.602571 11.6217 0.767352 11.9506 1.09625L13.4018 2.54738C13.7321 2.87769 13.8973 3.04292 13.9592 3.23337C14.0136 3.40088 14.0136 3.58133 13.9592 3.74885C13.8974 3.93916 13.7324 4.10414 13.4025 4.43398L13.4018 4.43468L11.0091 6.82736M7.67272 3.49106L11.0091 6.82736" stroke="#CDCDCD" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
      <button class="delete-btn" data-value="${index}" aria-label="удалить">
        <svg width="26" height="26" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.87426 7.61505C3.80724 6.74386 4.49607 6 5.36983 6H12.6302C13.504 6 14.1928 6.74385 14.1258 7.61505L13.6065 14.365C13.5464 15.1465 12.8948 15.75 12.1109 15.75H5.88907C5.10526 15.75 4.4536 15.1465 4.39348 14.365L3.87426 7.61505Z" stroke="#CDCDCD" />
          <path d="M14.625 3.75H3.375" stroke="#CDCDCD" stroke-linecap="round" />
          <path d="M7.5 2.25C7.5 1.83579 7.83577 1.5 8.25 1.5H9.75C10.1642 1.5 10.5 1.83579 10.5 2.25V3.75H7.5V2.25Z" stroke="#CDCDCD" />
          <path d="M10.5 9V12.75" stroke="#CDCDCD" stroke-linecap="round" />
          <path d="M7.5 9V12.75" stroke="#CDCDCD" stroke-linecap="round" />
        </svg>
      </button>
    </li>
  `
}

const modalAdd = document.querySelector('#modal-add')
const addBtn = document.querySelector('.add-btn')
const closeBtn = document.querySelector('#close-btn')
const applyBtn = document.querySelector('#apply-btn')
const inputAdd = document.querySelector('#input-add')

function showModalAdd() {
  addBtn.onclick = () => modalAdd.showModal()
  closeBtn.onclick = () => {
    modalAdd.close()
    inputAdd.value = ''
  }
}
showModalAdd()

function addNewNote() {
  applyBtn.addEventListener('click', () => {
    if (inputAdd.value === '') {
      return
    } else {
      const newNote = {
        title: inputAdd.value,
        completed: false,
      }
      notes.unshift(newNote)
      render(notes)
      inputAdd.value = ''
      modalAdd.close()
    }
  })
}
addNewNote()

const modalEdit = document.querySelector('#modal-edit')
const closeBtnEdit = document.querySelector('#close-btn-edit')
const applyBtnEdit = document.querySelector('#apply-btn-edit')
const inputEdit = document.querySelector('#input-edit')

function showModalEdit() {
  closeBtnEdit.onclick = () => {
    modalEdit.close()
    inputEdit.value = ''
  }
}
showModalEdit()

function editNote() {
  applyBtnEdit.addEventListener('click', () => {
    if (inputEdit.value === '') {
      return
    } else {
      notes[currentIndex].title = inputEdit.value
      render(notes)
      inputEdit.value = ''
      modalEdit.close()
    }
  })
}
editNote()

function changeTheme() {
  const themeBtn = document.querySelector('.theme')
  const body = document.querySelector('body')

  themeBtn.onclick = () => body.classList.toggle('theme-light')
}
changeTheme()
