const notesList = document.querySelector('.notes-list')

function customSelect() {
  const filterLabel = document.querySelector('.filter-label')
  const filterList = document.querySelector('.filter-list')

  filterLabel.addEventListener('click', () => {
    filterList.classList.toggle('filter-list--active')
  })

  filterList.addEventListener('click', (event) => {
    if (event.target.dataset) {
      filterLabel.dataset.value = event.target.dataset.value

      switch (filterLabel.dataset.value) {
        case 'all':
          filterLabel.firstElementChild.textContent = 'Все'
          break
        case 'complete':
          filterLabel.firstElementChild.textContent = 'Завершенные'
          break
        case 'incomplete':
          filterLabel.firstElementChild.textContent = 'Незавершенные'
          break
        default:
          filterLabel.firstElementChild.textContent = 'Все'
      }
      filterList.classList.remove('filter-list--active')
    }
  })
}

customSelect()

function customCheckbox() {
  notesList.addEventListener('click', (event) => {
    const target = event.target
    if (target.classList.contains('checkbox')) {
      target.classList.toggle('checkbox--active')
      const index = +target.dataset.value
      notes[index].completed = !notes[index].completed
    }
    render(notes)
  })
}

customCheckbox()

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
  {
    title: 'Заметка #4',
    completed: false,
  },
  {
    title: 'Заметка #5',
    completed: false,
  },
  {
    title: 'Заметка #6',
    completed: false,
  },
  {
    title: 'Заметка #7',
    completed: false,
  },
  {
    title: 'Заметка #8',
    completed: false,
  },
]
function render() {
  notesList.innerHTML = ''
  notes.forEach((note, i) => {
    notesList.insertAdjacentHTML('beforeend', toHTML(note, i))
  })
}

render()

function toHTML(note, i) {
  return `
    <li>
      <div class="checkbox ${note.completed ? 'checkbox--active' : ''}" data-value="${i}"></div>
      <div class="note-title ${note.completed ? 'note-title--complete' : ''}" data-type="complete">${note.title}</div>
      <button class="edit-btn">
        <img src="icons/edit.svg" width="21px" height="21px" alt="редактировать">
      </button>
      <button class="delete-btn">
        <img src="icons/delete.svg" width="25px" height="25px" alt="удалить">
      </button>
    </li>
  `
}

function modalAdd() {
  const dialogModal = document.querySelector('#dialog-modal')
  const addBtn = document.querySelector('.add-btn')
  const closeBtn = document.querySelector('#close-btn')

  addBtn.onclick = () => dialogModal.showModal()
  closeBtn.onclick = () => dialogModal.close()
}

modalAdd()
